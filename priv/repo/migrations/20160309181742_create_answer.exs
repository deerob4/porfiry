defmodule Porfiry.Repo.Migrations.CreateAnswer do
  use Ecto.Migration

  def change do
    create table(:answers) do
      add :body, :string
      add :correct, :boolean, default: false
      add :question_id, references(:questions, on_delete: :delete_all)

      timestamps
    end
    create index(:answers, [:question_id])

  end
end
