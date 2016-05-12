defmodule Porfiry.QuizServer do
  use GenServer

  import Ecto.Query, only: [from: 2]
  import Timex.DateTime, only: [now: 0]
  import Process, only: [send_after: 3]
  import Porfiry.Endpoint, only: [broadcast!: 3]
  import Timex, only: [shift: 2, diff: 2, before?: 2]

  alias Porfiry.{Repo, Quiz, QuizServer, QuizRegistry}

  defstruct id: nil, in_progress?: false, counting_down?: false

  # Client

  def start_link(quiz_id) do
    GenServer.start_link(__MODULE__, %QuizServer{id: quiz_id})
  end

  @doc "Returns the state of the quiz running at `pid`."
  def get_quiz_state(pid) do
    GenServer.call(pid, :get_quiz_state)
  end

  @doc "Stops the quiz running at `pid`."
  def stop(pid) do
    GenServer.stop(pid)
  end

  # Server

  def init(quiz) do
    send(self, :start_schedules)
    {:ok, quiz}
  end

  def handle_call(:get_quiz_state, _from, quiz) do
    {:reply, quiz, quiz}
  end

  def handle_info(:start_schedules, quiz) do
    start_date = from(q in Quiz,
                      where: q.id == ^quiz.id,
                      select: q.start_date) |> Repo.one

    # If the quiz has already ended, shutdown the process.
    if before?(start_date, now), do: send(self, :end_quiz)

    begin_quiz = diff(now, start_date) |> :timer.seconds
    IO.puts begin_quiz
    if begin_quiz > 0 and begin_quiz <= :timer.minutes(20) do
      send(self, :begin_countdown)
    else
      begin_countdown = begin_quiz - :timer.minutes(20)
      send_after(self, :begin_countdown, begin_countdown)
    end

    send_after(self, :begin_quiz, begin_quiz)

    {:noreply, quiz}
  end

  def handle_info(:begin_countdown, quiz) do
    IO.puts :counting_down
    broadcast! "quizzes:lobby", "begin_countdown", %{quiz_id: quiz.id}
    {:noreply, %{quiz | counting_down?: true}}
  end

  def handle_info(:begin_quiz, quiz) do
    IO.puts :quiz_begun
    # broadcast! "quizzes:" <> quiz.id, "begin_quiz", %{quiz_id: quiz.id}
    {:noreply, %{quiz | in_progress?: true,
                        counting_down?: false}}
  end

  def handle_info(:end_quiz, quiz) do
    Quiz
    |> Repo.get!(quiz.id)
    |> Quiz.changeset(%{is_scheduled: false,
                        start_date: shift(now, weeks: 1)})
    |> Repo.update!

    # Inform the registry that the quiz has ended,
    # removing it from the map.
    send(QuizRegistry, {:end_quiz, quiz.id})

    {:stop, :normal, %{quiz | in_progress?: false}}
  end
end
