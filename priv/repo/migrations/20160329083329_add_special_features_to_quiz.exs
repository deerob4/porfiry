defmodule Porfiry.Repo.Migrations.AddSpecialFeaturesToQuiz do
  use Ecto.Migration

  def change do
    alter table(:quizzes) do
      add :special_features, :bool
    end
  end
end
