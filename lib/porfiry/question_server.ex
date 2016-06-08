defmodule Porfiry.QuestionServer do
  use GenServer

  import Porfiry.Endpoint, only: [broadcast!: 3]

  def init(question_params) do
    send(self, :begin_countdown)
    {:ok, question_params}
  end

  def handle_info(:begin_countdown, question) do
    # broadcast! "quizzes:#{question.quiz_id}"
  end
end
