defmodule Porfiry.Repo.Migrations.ChangeQuizStartDateTypeToCalendarDatetime do
  use Ecto.Migration

  def change do
    alter table(:quizzes) do
      remove :start_date
      add :start_date, :calendar_datetime
    end
  end
end
