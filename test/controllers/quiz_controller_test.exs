defmodule Porfiry.QuizControllerTest do
  use Porfiry.ConnCase

  alias Porfiry.Quiz
  @valid_attrs %{break_length: 42, end_date: "2010-04-17 14:00:00", question_length: 42, start_date: "2010-04-17 14:00:00", title: "some content"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, quiz_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    quiz = Repo.insert! %Quiz{}
    conn = get conn, quiz_path(conn, :show, quiz)
    assert json_response(conn, 200)["data"] == %{"id" => quiz.id,
      "title" => quiz.title,
      "start_date" => quiz.start_date,
      "end_date" => quiz.end_date,
      "question_length" => quiz.question_length,
      "break_length" => quiz.break_length}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, quiz_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, quiz_path(conn, :create), quiz: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Quiz, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, quiz_path(conn, :create), quiz: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    quiz = Repo.insert! %Quiz{}
    conn = put conn, quiz_path(conn, :update, quiz), quiz: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Quiz, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    quiz = Repo.insert! %Quiz{}
    conn = put conn, quiz_path(conn, :update, quiz), quiz: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    quiz = Repo.insert! %Quiz{}
    conn = delete conn, quiz_path(conn, :delete, quiz)
    assert response(conn, 204)
    refute Repo.get(Quiz, quiz.id)
  end
end
