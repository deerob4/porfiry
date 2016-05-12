defmodule Porfiry.Repo.Migrations.AddQuizIdToQuestions do
  use Ecto.Migration

  def change do
    alter table(:questions) do
      add :quiz_id, references(:quizzes, on_delete: :delete_all)
    end
    create index(:questions, [:quiz_id])

  end
end
