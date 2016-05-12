alias Porfiry.Models.{AnswerPacket, HousePoints}

defmodule Porfiry.Models.HousePoints do
  defstruct acton: 0, baxter: 0, clive: 0, darwin: 0, houseman: 0, webb: 0

  def calculate(scores = %HousePoints{} \\ %HousePoints{}, packet = %AnswerPacket{}) do
    current_score = Map.get(scores, packet.form.house)
    increase_score_by = AnswerPacket.increase_score_by?(packet)

    Map.put(scores, packet.form.house, current_score + increase_score_by)
  end
end