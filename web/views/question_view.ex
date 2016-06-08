defmodule Porfiry.QuestionView do
  use Porfiry.Web, :view

  def render("index.json", %{questions: questions}) do
    %{questions: render_many(questions, Porfiry.QuestionView, "question.json")}
  end

  def render("show.json", %{question: question}) do
    %{question: render_one(question, Porfiry.QuestionView, "question.json")}
  end

  def render("question.json", %{question: question}) do
    %{id: question.id,
      quiz_id: question.quiz_id,
      body: question.body,
      correct_answer: question.correct_answer,
      answers: Porfiry.Question.show_answers(question.answers)}
  end
end
