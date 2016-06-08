defmodule Porfiry.Router do
  use Porfiry.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Porfiry do
    pipe_through :browser

    get "/", PageController, :index
    get "/create", PageController, :index
    get "/play", PageController, :index
  end

  scope "/api", Porfiry do
    pipe_through :api

    resources "/quizzes", QuizController, except: [:new, :edit]
  end
end
