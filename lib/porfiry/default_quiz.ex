defmodule Porfiry.DefaultQuiz do
  def get do
    %{settings: %{
        title: "Priory School Quiz",
        start_date: Timex.DateTime.now,
        question_length: 10,
        break_length: 120,
        special_events: true,
        is_scheduled: false
      },
      question: %{body: "I'm the question title - tap to edit me!"},
      answers: [
        %{body: "We four blocks are the possible answers", correct: false},
        %{body: "You can also edit us by tapping on our text", correct: false},
        %{body: "One of us can be marked as the correct answer - that's me right now!", correct: true},
        %{body: "Tapping a checkmark will change the correct answer!", correct: false}
      ]
    }
  end
end
