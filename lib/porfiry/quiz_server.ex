defmodule Porfiry.QuizServer do
  use GenServer

  import Ecto.Query, only: [from: 2]
  import Porfiry.Endpoint, only: [broadcast!: 3]
  import Process, only: [send_after: 3]
  import Timex.DateTime, only: [now: 0]

  alias Porfiry.{Repo, Quiz, QuizServer, QuizRegistry, QuizView, Countdown}

  require Logger

  defstruct id: nil, start_date: nil, quiz_data: nil, in_progress?: false, counting_down?: false

  # Client

  def start_link(quiz_id) do
    GenServer.start_link(__MODULE__, %QuizServer{id: quiz_id})
  end

  @doc "Returns the state of the quiz running at `pid`."
  def get_state(pid) do
    GenServer.call(pid, :get_state)
  end

  @doc "Stops the quiz running at `pid`."
  def stop(pid) do
    GenServer.stop(pid)
  end

  # Server

  def init(quiz) do
    start_date = from(q in Quiz,
                      where: q.id == ^quiz.id,
                      select: q.start_date) |> Repo.one

    # ms until the quiz starts.
    until_quiz = Timex.diff(now, start_date) |> :timer.seconds
    countdown_started? = Enum.member?(0..1200000, until_quiz)

    if countdown_started? do
      send(self, :begin_countdown)
    else
      # Start the countdown 20 minutes before the quiz.
      until_countdown = until_quiz - 1200000
      send_after(self, :begin_countdown, until_countdown)
    end

    send_after(self, :begin_quiz, until_quiz)

    {:ok, quiz}
  end

  def handle_call(:get_state, _from, quiz) do
    {:reply, quiz, quiz}
  end

  def handle_info(:begin_countdown, quiz) do
    Logger.info("Countdown begun for Quiz #{quiz.id}")

    quiz_data = Repo.get(Quiz, quiz.id) |> Repo.preload(questions: :answers)
    quiz_view = QuizView.render("quiz.json", %{quiz: quiz_data})

    start_date = quiz_data.start_date

    broadcast!("quizzes:lobby", "begin_countdown", %{id: quiz.id,
                                                     start_date: start_date})
    send(self, :update_countdown)

    {:noreply, %{quiz | counting_down?: true,
                        quiz_data: quiz_view,
                        start_date: start_date}}
  end

  def handle_info(:update_countdown, quiz) do
    time_left = Countdown.until_time(quiz.start_date)

    case time_left do
      %{minutes: -1, seconds: -1} ->
        false

      %{minutes: _, seconds: _} ->
        broadcast!("quizzes:#{quiz.id}", "update_countdown", %{time_left: time_left})
        send_after(self, :update_countdown, 1000)
    end

    {:noreply, quiz}
  end

  def handle_info(:begin_quiz, quiz) do
    Logger.info("Quiz #{quiz.id} has begun")

    broadcast!("quizzes:#{quiz.id}", "begin_quiz", %{})
    # send_after(self, :end_quiz, 3000)

    # Prevent new users joining the quiz.
    broadcast!("quizzes:lobby", "end_quiz", %{})

    {:noreply, %{quiz | in_progress?: true,
                        counting_down?: false}}
  end

  def handle_info(:end_quiz, quiz) do
    Logger.info("Quiz #{quiz.id} has ended")

    Quiz
    |> Repo.get!(quiz.id)
    |> Quiz.changeset(%{is_scheduled: false})
    |> Repo.update!

    # Inform the registry and client that the quiz has ended.
    send(QuizRegistry, {:end_quiz, quiz.id})
    broadcast!("quizzes:#{quiz.id}", "end_quiz", %{})

    {:stop, :normal, %{quiz | in_progress?: false}}
  end
end
