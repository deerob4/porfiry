defmodule Porfiry.Question do
  use Porfiry.Web, :model

  schema "questions" do
    field :body, :string
    field :correct_answer, :integer

    belongs_to :quiz, Porfiry.Quiz
    has_many :answers, Porfiry.Answer

    timestamps
  end

  @required_fields ~w(body quiz_id)
  @optional_fields ~w(correct_answer)

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end

  def show_question(question) do
    %{id: question.id,
      body: question.body,
      correctAnswer: question.correct_answer,
      answers: show_answers(question.answers)}
  end

  def show_answers(answers) when is_list(answers) do
    answers
    |> Enum.map(&(Porfiry.Answer.show_answer &1))
    |> Enum.sort(&(&1.id < &2.id))
  end
  def show_answers(_answers), do: []
end
