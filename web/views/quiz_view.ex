defmodule Porfiry.QuizView do
  use Porfiry.Web, :view

  def render("index.json", %{quizzes: quizzes}) do
    %{quizzes: render_many(quizzes, Porfiry.QuizView, "quiz.json")}
  end

  def render("basic_index.json", %{quizzes: quizzes}) do
    %{quizzes: render_many(quizzes, Porfiry.QuizView, "basic_quiz.json")}
  end

  def render("show.json", %{quiz: quiz}) do
    %{quiz: render_one(quiz, Porfiry.QuizView, "quiz.json")}
  end

  def render("basic_quiz.json", %{quiz: quiz}) do
    %{id: quiz.id,
      title: quiz.title,
      startDate: quiz.start_date,
      isScheduled: quiz.is_scheduled}
  end

  def render("quiz.json", %{quiz: quiz}) do
    %{id: quiz.id,
      settings: %{
        title: quiz.title,
        startDate: quiz.start_date,
        isScheduled: quiz.is_scheduled,
        questionLength: quiz.question_length,
        breakLength: quiz.break_length,
        specialEvents: quiz.special_events,
      },
      questions: show_questions(quiz.questions)}
  end

  defp show_questions(questions) when is_list(questions) do
    questions
    |> Enum.map(&(Porfiry.Question.show_question(&1)))
    |> Enum.sort(&(&1.id < &2.id))
  end
  defp show_questions(_questions), do: []
end
