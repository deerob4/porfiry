defmodule Porfiry.QuizController do
  use Porfiry.Web, :controller

  alias Porfiry.{Quiz, Question, Answer, DefaultQuiz}
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
    quiz =
      %Quiz{}
      |> Quiz.changeset(DefaultQuiz.settings)
      |> Repo.insert!

    question =
      %Question{}
      |> Question.changeset(%{DefaultQuiz.question | quiz_id: quiz.id})
      |> Repo.insert!

    answer =
      DefaultQuiz.answers
      |> Enum.map(fn answer ->
           %Answer{}
           |> Answer.changeset(%{answer | question_id: question.id})
           |> Repo.insert!
         end)
      |> Enum.map(&(&1.id))
      |> List.first

    Question.changeset(question, %{correct_answer: answer}) |> Repo.update!

    quiz = Repo.get(Quiz, quiz.id) |> Repo.preload(questions: :answers)

    conn
    |> put_status(:created)
    |> put_resp_header("location", quiz_path(conn, :show, quiz))
    |> json(%{id: quiz.id})
  end

  def show(conn, %{"id" => id}) do
    quiz = Repo.get!(Quiz, id) |> Repo.preload(questions: :answers)

    render(conn, "show.json", quiz: quiz)
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
