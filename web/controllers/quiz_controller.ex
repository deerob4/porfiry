defmodule Porfiry.QuizController do
  use Porfiry.Web, :controller

  alias Porfiry.{Quiz, Question}
  import Porfiry.QuizRegistry, only: [schedule_quiz: 1, unschedule_quiz: 1]

  def index(conn, %{"basic" => "true"}) do
    quizzes = from(q in Quiz,
                   select: %{id: q.id,
                             title: q.title,
                             start_date: q.start_date,
                             is_scheduled: q.is_scheduled},
                   order_by: [desc: q.updated_at]) |> Repo.all

    render(conn, "basic_index.json", quizzes: quizzes)
  end
  def index(conn, _params) do
    quizzes = from(q in Quiz, preload: [questions: :answers]) |> Repo.all
    render(conn, "index.json", quizzes: quizzes)
  end

  def create(conn, _params) do
    default_quiz = Porfiry.DefaultQuiz.get

    settings = Repo.insert!(Quiz.changeset(%Quiz{},
                            default_quiz.settings))

    question = Map.put(default_quiz.question, :quiz_id, settings.id)

    question_id =
      %Question{}
      |> Question.changeset(question)
      |> Repo.insert!

    Enum.each(default_quiz.answers, fn answer ->
      Porfiry.AnswerController.create(%{
        "answer" => Map.put(answer, :question_id, question_id.id)
      })
    end)

    quiz = Repo.preload(Repo.get_by(Quiz, id: settings.id), questions: :answers)

    conn
    |> put_status(:created)
    |> put_resp_header("location", quiz_path(conn, :show, quiz))
    |> json(%{id: quiz.id})
  end

  def show(conn, %{"id" => id}) do
    quiz = Repo.preload Repo.get!(Quiz, id), questions: :answers
    render(conn, "show.json", quiz: quiz)
  end

  def update(conn, %{"id" => id, "schedule" => schedule_params}) do
    id = String.to_integer(id)
    quiz = Repo.get!(Quiz, id)
    scheduled? = schedule_params["is_scheduled"]
    changeset = Quiz.changeset(quiz, schedule_params)

    case Repo.update(changeset) do
      {:ok, quiz} ->
        if scheduled?, do: schedule_quiz(id), else: unschedule_quiz(id)
        render(conn, "show.json", quiz: quiz)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Porfiry.ChangesetView, "error.json", changeset: changeset)
    end
  end
  def update(conn, %{"id" => id, "quiz" => quiz_params}) do
    quiz = Repo.get!(Quiz, id)
    changeset = Quiz.changeset(quiz, quiz_params)

    case Repo.update(changeset) do
      {:ok, quiz} ->
        render(conn, "show.json", quiz: quiz)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Porfiry.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    quiz = Repo.get!(Quiz, id)

    # Remove from the quiz registry.
    if quiz.is_scheduled do
      unschedule_quiz(String.to_integer(id))
    end

    Repo.delete!(quiz)

    send_resp(conn, :no_content, "")
  end
end
