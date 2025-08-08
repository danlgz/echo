defmodule Echo.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :username, :string
    field :email, :string
    field :hashed_password, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :email, :hashed_password])
    |> validate_required([:username, :email, :hashed_password])
    |> unique_constraint(:email)
    |> unique_constraint(:username)
  end
end
