ExUnit.start

Mix.Task.run "ecto.create", ~w(-r Porfiry.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r Porfiry.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(Porfiry.Repo)

