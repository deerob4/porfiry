defmodule Porfiry.QuizRegistry do
  @moduledoc """
  Stores a list of quizzes that are currently scheduled, and contains methods
  to operate on them.
  """

  use GenServer
  import Ecto.Query, only: [from: 2]
  alias Porfiry.{Repo, Quiz, QuizRegistry, QuizServer}

  defstruct id: nil, pid: nil

  # Client

  @doc "Starts the registry process."
  def start_link do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  @doc "Returns all saved quizzes."
  def get_all do
    GenServer.call(__MODULE__, :get_all)
  end

  @doc "Returns all quizzes that are counting down."
  def get_counting_down do
    GenServer.call(__MODULE__, :get_counting_down)
  end

  @doc "Returns all quizzes that are in progress."
  def get_in_progress do
    GenServer.call(__MODULE__, :get_in_progress)
  end

  @doc "Returns a specific quiz by `quiz_id`."
  def get_quiz(quiz_id) do
    GenServer.call(__MODULE__, {:get_quiz, quiz_id})
  end

  @doc "Sets the `scheduled?` key of a quiz to `true`."
  def schedule_quiz(quiz_id) do
    GenServer.cast(__MODULE__, {:schedule_quiz, quiz_id})
  end

  @doc "Sets the `scheduled?` key of a quiz to `false`."
  def unschedule_quiz(quiz_id) do
    GenServer.cast(__MODULE__, {:unschedule_quiz, quiz_id})
  end

  # Server

  @doc "Retrieves all quizzes and sets the keys."
  def init(_) do
    schedules =
      #
      from(q in Quiz, where: q.is_scheduled, select: %{id: q.id})
      |> Repo.all
      |> Enum.map(fn quiz ->
        {:ok, pid} = QuizServer.start_link(quiz.id)
        %QuizRegistry{id: quiz.id, pid: pid}
      end)

    {:ok, schedules}
  end

  def handle_call(:get_all, _from, quizzes) do
    {:reply, quizzes, quizzes}
  end

  def handle_call({:get_quiz, quiz_id}, _from, quizzes) do
    {:reply, get_pid(quizzes, quiz_id), quizzes}
  end

  def handle_call(:get_counting_down, _from, quizzes) do
    counting_down =
      quizzes
      |> Enum.map(&QuizServer.get_state(&1.pid))
      |> Enum.filter(&(&1.counting_down?))

    {:reply, counting_down, quizzes}
  end

  def handle_call(:get_in_progress, _from, quizzes) do
    in_progress =
      quizzes
      |> Enum.map(&QuizServer.get_state(&1.pid))
      |> Enum.filter(&(&1.in_progress?))

    {:reply, in_progress, quizzes}
  end

  def handle_cast({:schedule_quiz, quiz_id}, quizzes) do
    {:ok, pid} = QuizServer.start_link(quiz_id)

    {:noreply, quizzes ++ [%QuizRegistry{id: quiz_id, pid: pid}]}
  end

  def handle_cast({:unschedule_quiz, quiz_id}, quizzes) do
    quizzes |> get_pid(quiz_id) |> QuizServer.stop

    {:noreply, Enum.filter(quizzes, &(&1.id !== quiz_id))}
  end

  def handle_info({:end_quiz, quiz_id}, quizzes) do
    {:noreply, Enum.filter(quizzes, &(&1.id !== quiz_id))}
  end

  defp get_pid(quizzes, quiz_id) do
    quizzes
    |> Enum.find(&(&1.id == quiz_id))
    |> Map.get(:pid)
  end
end
