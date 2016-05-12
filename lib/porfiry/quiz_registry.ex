defmodule Porfiry.QuizRegistry do
  use GenServer

  import Ecto.Query, only: [from: 2]
  alias Porfiry.{Repo, Quiz, QuizRegistry, QuizServer}

  defstruct pid: nil

  # Client

  def start_link do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  @doc "Returns all saved quizzes."
  def show_quizzes do
    GenServer.call(__MODULE__, :show_quizzes)
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
      from(q in Quiz,
           where: q.is_scheduled,
           select: %{id: q.id})
      |> Repo.all
      |> Enum.map(fn quiz ->
        {:ok, pid} = QuizServer.start_link(quiz.id)
        {quiz.id, %QuizRegistry{pid: pid}}
      end)
      |> Map.new

    {:ok, schedules}
  end

  def handle_call(:show_quizzes, _from, quizzes) do
    {:reply, quizzes, quizzes}
  end

  def handle_call({:get_quiz, quiz_id}, _from, quizzes) do
    {:reply, quizzes[quiz_id].pid, quizzes}
  end

  def handle_cast({:schedule_quiz, quiz_id}, quizzes) do
    {:ok, pid} = QuizServer.start_link(quiz_id)
    {:noreply, Map.put(quizzes, quiz_id, %QuizRegistry{pid: pid})}
  end

  def handle_cast({:unschedule_quiz, quiz_id}, quizzes) do
    QuizServer.stop(quizzes[quiz_id].pid)
    {:noreply, Map.delete(quizzes, quiz_id)}
  end

  def handle_info({:end_quiz, quiz_id}, quizzes) do
    {:noreply, Map.delete(quizzes, quiz_id)}
  end
end
