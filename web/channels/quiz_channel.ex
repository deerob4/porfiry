defmodule Porfiry.QuizChannel do
  use Porfiry.Web, :channel

  alias Porfiry.{QuizServer, QuizRegistry}

  def join("quizzes:lobby", _payload, socket) do
    {:ok, socket}
  end
  def join("quizzes:" <> quiz_id, payload, socket) do
    quiz =
      quiz_id
      |> String.to_integer
      |> QuizRegistry.get_quiz
      |> QuizServer.get_state
      |> Map.get(:quiz_data)

    {:ok, quiz, socket}
  end

  def handle_in("check_status", _payload, socket) do
    quizzes = QuizRegistry.get_counting_down

    unless Enum.empty?(quizzes) do
      quiz = quizzes |> List.first |> Map.take([:id, :start_date])
      push(socket, "begin_countdown", quiz)
    end

    {:noreply, socket}
  end
end
