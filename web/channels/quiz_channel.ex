defmodule Porfiry.QuizChannel do
  use Porfiry.Web, :channel

  def join("quizzes:lobby", _payload, socket) do
    {:ok, socket}
  end
  def join("quizzes:" <> quiz_id, payload, socket) do
    {:ok, socket}
  end

  def handle_in("begin_countdown", params, socket) do
    IO.inspect socket
    broadcast(socket, "begin_countdown", %{})
    {:noreply, socket}
  end

  def handle_info("begin_quiz", socket) do
    IO.inspect socket
    {:noreply, socket}
  end
end
