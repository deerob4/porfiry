defmodule Porfiry.Repo.Migrations.RemoveCorrectAnswerIndex do
  use Ecto.Migration

  def change do
    drop index(:questions, [:correct_answer])
  end
end
