defmodule Porfiry.AnswerControllerTest do
  use Porfiry.ConnCase

  alias Porfiry.Answer
  @valid_attrs %{body: "some content", correct: true}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, answer_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    answer = Repo.insert! %Answer{}
    conn = get conn, answer_path(conn, :show, answer)
    assert json_response(conn, 200)["data"] == %{"id" => answer.id,
      "body" => answer.body,
      "correct" => answer.correct}
  end

  test "does not show resource and instead throw error when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, answer_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, answer_path(conn, :create), answer: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Answer, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, answer_path(conn, :create), answer: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    answer = Repo.insert! %Answer{}
    conn = put conn, answer_path(conn, :update, answer), answer: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Answer, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    answer = Repo.insert! %Answer{}
    conn = put conn, answer_path(conn, :update, answer), answer: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    answer = Repo.insert! %Answer{}
    conn = delete conn, answer_path(conn, :delete, answer)
    assert response(conn, 204)
    refute Repo.get(Answer, answer.id)
  end
end
