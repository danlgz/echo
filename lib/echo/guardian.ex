defmodule Echo.Guardian do
  use Guardian, otp_app: :echo

  alias Echo.Accounts.User
  alias Echo.Accounts

  @impl true
  def subject_for_token(%User{id: id}, _claims) do
    {:ok, to_string(id)}
  end

  @impl true
  def resource_from_claims(%{"sub" => id}) do
    case Accounts.get_user(id) do
      nil -> {:error, :user_does_not_exist}
      user -> {:ok, user}
    end
  end

  def get_user(conn) do
    Echo.Guardian.Plug.current_resource(conn)
  end
end
