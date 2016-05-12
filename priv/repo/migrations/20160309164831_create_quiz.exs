defmodule Porfiry.Repo.Migrations.CreateQuiz do
  use Ecto.Migration

  def change do
    create table(:quizzes) do
      add :title, :string
      add :start_time, :datetime
      add :end_time, :datetime
      add :question_length, :integer
      add :break_length, :integer

      timestamps
    end
  end
end
