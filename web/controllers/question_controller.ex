defmodule Porfiry.QuestionController do
  use Porfiry.Web, :controller

  alias Porfiry.Question

  plug :scrub_params, "question" when action in [:create, :update]

  def create(conn, %{"question" => question_params}) do
    {:ok, question} =
      %Question{}
      |> Question.changeset(question_params)
      |> Repo.insert

    Enum.each(1..4, fn x ->
      Porfiry.AnswerController.create(%{"answer" => %{
        body: "Answer #{x}",
        correct: x == 1,
        question_id: question.id
      }})
    end)

    question = Repo.preload(question, :answers)

    conn
    |> put_status(:created)
    |> put_resp_header("location", question_path(conn, :show, question))
    |> render("show.json", question: question)
  end

  def update(conn, %{"id" => id, "question" => question_params}) do
    question = Repo.get!(Question, id)
    changeset = Question.changeset(question, question_params)

    case Repo.update(changeset) do
      {:ok, question} ->
        render(conn, "show.json", question: question)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Porfiry.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    question = Repo.get!(Question, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(question)

    send_resp(conn, :no_content, "")
  end
end
