defmodule Porfiry.Repo.Migrations.CreateQuestion do
  use Ecto.Migration

  def change do
    create table(:questions) do
      add :body, :string
      add :category_id, references(:categories, on_delete: :nothing)

      timestamps
    end
    create index(:questions, [:category_id])

  end
end
