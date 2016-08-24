use Mix.Config

config :porfiry, Porfiry.Endpoint,
  http: [port: 5000],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: [
    {Path.expand("webpack.dev.js"),
    [cd: Path.expand("../", __DIR__)]}
  ]
  # watchers: [node: ["node_modules/webpack/bin/webpack.js", "--watch", "--color",
  #            cd: Path.expand("../", __DIR__)]]

# Watch static and templates for browser reloading.
config :porfiry, Porfiry.Endpoint,
  live_reload: [
    patterns: [
      # ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
      ~r{priv/gettext/.*(po)$},
      ~r{web/views/.*(ex)$},
      ~r{web/templates/.*(eex)$}
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development.
# Do not configure such in production as keeping
# and calculating stacktraces is usually expensive.
config :phoenix, :stacktrace_depth, 20

# Configure your database
config :porfiry, Porfiry.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "dee",
  password: "70153590",
  database: "porfiry_dev",
  hostname: "localhost",
  pool_size: 10
