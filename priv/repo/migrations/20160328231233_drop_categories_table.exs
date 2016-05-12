defmodule Porfiry.Repo.Migrations.DropCategoriesTable do
  use Ecto.Migration

  def change do
    drop table :categories
  end
end
