defmodule Porfiry.EditorChannel do
  use Porfiry.Web, :channel

  alias Porfiry.{Quiz, Question, QuestionView, Answer}
  import Porfiry.QuizRegistry, only: [schedule_quiz: 1, unschedule_quiz: 1]

  def join("editors:" <> quiz_id, _payload, socket) do
    {:ok, assign(socket, :quiz_id, quiz_id)}
  end

  def handle_in("questions:create", %{"question" => %{"body" => body}}, socket) do
    question_params = %{quiz_id: socket.assigns.quiz_id, body: body}

    question = %Question{}
               |> Question.changeset(question_params)
               |> Repo.insert!

    answer = Enum.map(1..4, fn x ->
               %Answer{}
               |> Answer.changeset(%{body: "Answer #{x}", question_id: question.id})
               |> Repo.insert!
             end)
             |> Enum.map(&(&1.id))
             |> List.first

    changeset = Question.changeset(question, %{correct_answer: answer})

    case Repo.update(changeset) do
      {:ok, question} ->
        question = Repo.preload(question, :answers)
        view = QuestionView.render("show.json", %{question: question})
        {:reply, {:ok, view}, socket}

      {:error, _changeset} ->
        {:reply, {:error, %{message: "Error creating question"}}, socket}
    end
  end

  def handle_in("questions:edit", %{"id" => id, "question" => question_params}, socket) do
    changeset = Question
                |> Repo.get!(id)
                |> Question.changeset(question_params)

    case Repo.update(changeset) do
      {:ok, _question} ->
        {:reply, :ok, socket}

      {:error, _changeset} ->
        {:reply, {:error, %{message: "Error editing question"}}, socket}
    end
  end

  def handle_in("questions:delete", %{"id" => id}, socket) do
    question = Repo.get!(Question, id)

    case Repo.delete(question) do
      {:ok, _question} ->
        {:reply, :ok, socket}

      {:error, _changeset} ->
        {:reply, {:error, %{message: "Error deleting question"}}, socket}
    end
  end

  def handle_in("answers:edit", %{"id" => id, "answer" =>  answer_params}, socket) do
    changeset = Answer
                |> Repo.get!(id)
                |> Answer.changeset(answer_params)

    case Repo.update(changeset) do
      {:ok, _answer} ->
        {:reply, :ok, socket}

      {:error, _changeset} ->
        {:reply, {:error, %{message: "Error editing answer"}}, socket}
    end
  end

  def handle_in("quizzes:schedule", %{"id" => id, "quiz" => quiz_params}, socket) do
    changeset = Quiz
                |> Repo.get!(id)
                |> Quiz.changeset(quiz_params)

    scheduled? = quiz_params["is_scheduled"]

    case Repo.update(changeset) do
      {:ok, _quiz} ->
        if scheduled?, do: schedule_quiz(id), else: unschedule_quiz(id)
        {:reply, :ok, socket}

      {:error, changeset} ->
        {:reply, {:error, %{message: "Error scheduling quiz"}}, socket}
    end
  end

  def handle_in("quizzes:edit", %{"id" => id, "quiz" => quiz_params}, socket) do
    changeset = Quiz
                |> Repo.get!(id)
                |> Quiz.changeset(quiz_params)

    case Repo.update(changeset) do
      {:ok, _quiz} ->
        {:reply, :ok, socket}

      {:error, changeset} ->
        IO.inspect changeset
        {:reply, {:error, %{message: "Error saving settings"}}, socket}
    end
  end
end
