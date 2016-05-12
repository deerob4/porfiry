defmodule Porfiry.Repo.Migrations.CreateCategory do
  use Ecto.Migration

  def change do
    create table(:categories) do
      add :title, :string
      add :quiz_id, references(:quizzes, on_delete: :nothing)

      timestamps
    end
    create index(:categories, [:quiz_id])

  end
end
