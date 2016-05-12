defmodule Porfiry.Repo.Migrations.AddScheduledFieldToQuiz do
  use Ecto.Migration

  def change do
    alter table(:quizzes) do
      add :is_scheduled, :bool
    end
  end
end
