defmodule Porfiry.Quiz do
  use Porfiry.Web, :model

  schema "quizzes" do
    field :title, :string
    field :start_date, Timex.Ecto.DateTime
    field :question_length, :integer
    field :break_length, :integer
    field :special_events, :boolean
    field :is_scheduled, :boolean

    has_many :questions, Porfiry.Question, on_delete: :delete_all

    timestamps
  end

  @required_fields ~w(title start_date question_length break_length special_events is_scheduled)
  @optional_fields ~w()

  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_inclusion(:question_length, 5..120, message: "Questions may last between 5 seconds and 2 minutes")
    |> validate_inclusion(:break_length, 60..600, message: "Breaks may last between 60 seconds and 10 minutes")
    |> quiz_not_in_past
  end

  defp quiz_not_in_past(changeset) do
    now = Timex.DateTime.now
    start_date = get_field(changeset, :start_date)

    if Timex.before?(start_date, now) do
      add_error(changeset, :start_date, "Start date is in the past")
    else
      changeset
    end
  end
end
