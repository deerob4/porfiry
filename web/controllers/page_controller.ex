defmodule Porfiry.PageController do
  use Porfiry.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
