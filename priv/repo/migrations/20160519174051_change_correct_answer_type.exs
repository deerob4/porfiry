defmodule Porfiry.Repo.Migrations.ChangeCorrectAnswerType do
  use Ecto.Migration

  def change do
    alter table(:questions) do
      modify :correct_answer, :integer
    end
  end
end
