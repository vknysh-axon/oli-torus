defmodule Oli.Delivery.Sections.AuthorSection do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key false
  schema "authors_sections" do
    timestamps(type: :utc_datetime)
    belongs_to :author, Oli.Accounts.Author
    belongs_to :section, Oli.Delivery.Sections.Section
  end

  @doc false
  def changeset(user_section, attrs \\ %{}) do
    user_section
    |> cast(attrs, [:author_id, :section_id])
    |> validate_required([:author_id, :section_id])
  end
end
