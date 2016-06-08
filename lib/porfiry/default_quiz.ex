defmodule Porfiry.DefaultQuiz do
  def settings do
    %{title: "Priory School Quiz",
      start_date: Timex.DateTime.now |> Timex.shift(days: 1),
      question_length: 10,
      break_length: 120,
      special_events: true,
      is_scheduled: false}
  end

  def question do
    %{quiz_id: nil,
      body: "I'm the question title - tap to edit me!"}
  end

  def answers do
    [%{question_id: nil,
       body: "We four blocks are the possible answers"},
     %{question_id: nil,
       body: "You can also edit us by tapping on our text"},
     %{question_id: nil,
       body: "One of us can be marked as the correct answer - that's me right now!"},
     %{question_id: nil,
       body: "Tapping a checkmark will change the correct answer!"}]
  end
end
