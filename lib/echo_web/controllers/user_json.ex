defmodule EchoWeb.UserJSON do
  alias Echo.Accounts.User

  def show(%{user: user}) do
    %{data: data(user)}
  end

  def show_tokens(%{access_token: access_token, refresh_token: refresh_token}) do
    %{
      data: %{
        access_token: access_token,
        refresh_token: refresh_token
      }
    }
  end

  def data(%User{} = user) do
    %{
      id: user.id,
      email: user.email,
      username: user.username
    }
  end

  def error(%{message: message}) do
    %{error: message}
  end
end
