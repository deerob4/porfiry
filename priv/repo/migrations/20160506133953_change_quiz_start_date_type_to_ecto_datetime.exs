defmodule Porfiry.Repo.Migrations.ChangeQuizStartDateTypeToEctoDatetime do
  use Ecto.Migration

  def change do
    alter table(:quizzes) do
      remove :start_date
      add :start_date, :datetime
    end
  end
end
