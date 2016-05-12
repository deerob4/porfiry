defmodule Porfiry.AnswerController do
  use Porfiry.Web, :controller

  alias Porfiry.Answer

  plug :scrub_params, "answer" when action in [:create, :update]

  def create(%{"answer" => answer_params}) do
    changeset = Answer.changeset(%Answer{}, answer_params)

    {:ok, answer} = Repo.insert(changeset)
  end

  def update(conn, params = %{"id" => id, "answer" => %{"body" => _body}}) do
    answer_params = params["answer"]
    answer = Repo.get!(Answer, id)
    changeset = Answer.changeset(answer, answer_params)

    case Repo.update(changeset) do
      {:ok, answer} ->
        render(conn, "show.json", answer: answer)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Porfiry.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def update(conn, params = %{"id" => id, "answer" => %{"correct" => true}}) do
    answer_params = params["answer"]

    # The answer that we're setting to true.
    true_answer = Repo.get!(Answer, id)
    true_changeset = Answer.changeset(true_answer, answer_params)

    # The answer that's currently set to true.
    false_answer = Repo.get_by(Answer, question_id: true_answer.question_id, correct: true)
    false_changeset = Answer.changeset(false_answer, %{"correct" => false})

    with {:ok, true_answer} <- Repo.update(true_changeset),
         {:ok, false_answer} <- Repo.update(false_changeset),
         do: render(conn, "show.json", answer: true_answer)
  end

  def delete(conn, %{"id" => id}) do
    answer = Repo.get!(Answer, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(answer)

    send_resp(conn, :no_content, "")
  end
end
