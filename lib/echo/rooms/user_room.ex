defmodule Echo.Rooms.UserRoom do
  use Ecto.Schema
  import Ecto.Changeset

  schema "user_rooms" do
    field :role, Ecto.Enum, values: [:admin, :member]
    field :user_id, :id
    field :room_id, :id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user_room, attrs) do
    user_room
    |> cast(attrs, [:role, :user_id, :room_id])
    |> validate_required([:role, :user_id, :room_id])
    |> unique_constraint([:user_id, :room_id])
  end
end
