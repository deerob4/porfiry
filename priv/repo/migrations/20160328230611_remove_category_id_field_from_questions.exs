defmodule Porfiry.Repo.Migrations.RemoveCategoryIdFieldFromQuestions do
  use Ecto.Migration

  def change do
    alter table(:questions) do
      remove :category_id
    end
  end
end
