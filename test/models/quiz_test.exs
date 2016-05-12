defmodule Porfiry.QuizTest do
  use Porfiry.ModelCase

  alias Porfiry.Quiz

  @valid_attrs %{break_length: 42, question_length: 42, start_date: "2010-04-17 14:00:00", end_date: "2010-05-17 14:00:00", title: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Quiz.changeset(%Quiz{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Quiz.changeset(%Quiz{}, @invalid_attrs)
    refute changeset.valid?
  end
end
