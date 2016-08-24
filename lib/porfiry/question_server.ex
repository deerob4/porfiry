defmodule Porfiry.QuestionServer do
  use GenServer
  import Process, only: [send_after: 3]
  import Porfiry.Endpoint, only: [broadcast!: 3]

  def start_link(question) do
    GenServer.start_link(__MODULE__, question)
  end

  def init(question) do
    send(self, {:handle_countdown, 10000})
    {:ok, question}
  end

  def handle_info({:handle_countdown, 0}, question) do
    {:stop, :normal, question}
  end
  def handle_info({:handle_countdown, time_left}, question) do
    address = "quizzes:#{question.quiz_id}"
    packet = %{time_left: time_left}
    IO.inspect packet
    broadcast!(address, "update_question_timer", packet)
    send_after(self, {:handle_countdown, time_left - 1000}, 1000)

    {:noreply, question}
  end
end
