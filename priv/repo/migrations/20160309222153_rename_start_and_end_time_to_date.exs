defmodule Porfiry.Repo.Migrations.RenameStartAndEndTimeToDate do
  use Ecto.Migration

  def change do
    rename table(:quizzes), :start_time, to: :start_date
    rename table(:quizzes), :end_time,   to: :end_date
  end
end
