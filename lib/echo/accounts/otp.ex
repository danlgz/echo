defmodule Echo.Accounts.Otp do
  use Ecto.Schema
  import Ecto.Changeset

  schema "opts" do
    field :code, :string
    field :expires_at, :utc_datetime
    field :user_id, :id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(otp, attrs) do
    otp
    |> cast(attrs, [:code, :expires_at, :user_id])
    |> validate_required([:code, :expires_at, :user_id])
  end
end
