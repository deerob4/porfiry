defmodule Porfiry.CategoryView do
  use Porfiry.Web, :view

  def render("index.json", %{categories: categories}) do
    %{data: render_many(categories, Porfiry.CategoryView, "category.json")}
  end

  def render("show.json", %{category: category}) do
    %{data: render_one(category, Porfiry.CategoryView, "category.json")}
  end

  def render("category.json", %{category: category}) do
    %{id: category.id,
      title: category.title}
  end
end
