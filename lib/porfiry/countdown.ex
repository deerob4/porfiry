defmodule Porfiry.Countdown do
  def until_time(endtime) do
    t = ms_from_epoch(endtime) - ms_from_epoch(Timex.DateTime.now)
    seconds = find_difference(t / 1000)
    minutes = find_difference(t / 1000 / 60)

    %{minutes: minutes, seconds: seconds}
  end

  @spec find_difference(number) :: number
  defp find_difference(n) do
    n
    |> Float.floor
    |> round
    |> rem(60)
  end

  defp ms_from_epoch(datetime) do
    datetime
    |> Timex.to_unix
    |> :timer.seconds
  end
end
