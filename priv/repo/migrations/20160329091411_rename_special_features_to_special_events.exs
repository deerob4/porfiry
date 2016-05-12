defmodule Porfiry.Repo.Migrations.RenameSpecialFeaturesToSpecialEvents do
  use Ecto.Migration

  def change do
    rename table(:quizzes), :special_features, to: :special_events
  end
end
