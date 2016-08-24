defmodule Porfiry.AnswerPacket do
  alias Porfiry.AnswerPacket

  defstruct correct?: false, peeked?: false

  def increase_score_by?(%AnswerPacket{correct?: correct, peeked?: peeked})
  when correct and not peeked, do: 1

  def increase_score_by?(%AnswerPacket{correct?: correct, peeked?: peeked})
  when correct and peeked, do: 0.5

  def increase_score_by?(%AnswerPacket{correct?: correct})
  when not correct, do: 0
end
