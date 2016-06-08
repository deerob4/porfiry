defmodule Porfiry.AnswerPacket do
  def increase_score_by?(%{correct?: correct, peeked?: peeked})
  when correct and not peeked, do: 1

  def increase_score_by?(%{correct?: correct, peeked?: peeked})
  when correct and peeked, do: 0.5

  def increase_score_by?(%{correct?: correct})
  when not correct, do: 0
end
