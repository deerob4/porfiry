defmodule Porfiry.Answer do
  use Porfiry.Web, :model

  schema "answers" do
    field :body, :string
    field :correct, :boolean, default: false

    belongs_to :question, Porfiry.Question

    timestamps
  end

  @required_fields ~w(body correct question_id)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end

  def show_answer(answer) do
    %{id: answer.id,
      questionId: answer.question_id,
      body: answer.body,
      correct: answer.correct}
  end
end
