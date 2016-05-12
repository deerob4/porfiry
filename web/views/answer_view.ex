defmodule Porfiry.AnswerView do
  use Porfiry.Web, :view

  def render("index.json", %{answers: answers}) do
    %{data: render_many(answers, Porfiry.AnswerView, "answer.json")}
  end

  def render("show.json", %{answer: answer}) do
    %{data: render_one(answer, Porfiry.AnswerView, "answer.json")}
  end

  def render("answer.json", %{answer: answer}) do
    %{id: answer.id,
      body: answer.body,
      correct: answer.correct}
  end
end
