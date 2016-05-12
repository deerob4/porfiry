defmodule Porfiry.Repo.Migrations.RemoveEndDateFieldFromQuizzes do
  use Ecto.Migration

  def change do
    alter table(:quizzes) do
      remove :end_date
    end
  end
end
