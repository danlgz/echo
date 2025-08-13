defmodule EchoWeb.UserJSON do
  # @TODO: refactor this module and create a generic JSON response module
  alias Echo.Accounts.User

  def show(%{user: user}) do
    %{data: data(user)}
  end

  def show(%{message: message}) do
    %{message: message}
  end

  def show(%{available: available}) do
    %{available: available}
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
