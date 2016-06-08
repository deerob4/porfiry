defmodule Porfiry.Repo.Migrations.MoveCorrectFieldToQuestions do
  use Ecto.Migration

  def change do
    alter table(:answers) do
      remove :correct
    end

    alter table(:questions) do
      add :correct_answer, references(:answers)
    end

    create index(:questions, [:correct_answer])
  end
end
