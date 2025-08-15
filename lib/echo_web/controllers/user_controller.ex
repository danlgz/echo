defmodule EchoWeb.UserController do
  use EchoWeb, :controller

  alias Echo.Accounts
  alias Echo.Accounts.User
  alias Echo.Guardian

  def register(conn, %{"email" => _, "username" => _} = user_params) do
    case Accounts.create_user(user_params) do
      {:ok, %User{} = user} ->
        Accounts.send_opt(user)

        conn
        |> put_status(:created)
        |> render(:show, user: user)

      {:error, _changeset} ->
        conn
        |> put_status(:bad_request)
        |> render(:error, message: "Error registering user")
    end
  end

  def register(conn, _) do
    conn
    |> put_status(:bad_request)
    |> render(:error, message: "Invalid request")
  end

  def verify_otp(conn, %{"code" => code, "email" => email}) do
    case Accounts.verify_otp(email, code) do
      {:ok, access_token, refresh_token} ->
        conn
        |> put_status(:ok)
        |> render(:show, access_token: access_token, refresh_token: refresh_token)

      {:error, reason} ->
        conn
        |> put_status(:bad_request)
        |> render(:error, message: reason)
    end
  end

  def send_otp(conn, %{"email" => email}) do
    case Accounts.send_otp(email) do
      {:ok, _} ->
        conn
        |> put_status(:ok)
        |> render(:show, message: "OTP sent successfully")

      {:error, reason} ->
        conn
        |> put_status(:bad_request)
        |> render(:error, message: reason)
    end
  end

  def check_email_availability(conn, %{"email" => email}) do
    available = elem(Accounts.check_email_availability(email), 0) == :ok

    conn
    |> put_status(:ok)
    |> render(:show, available: available)
  end

  def refresh_token(conn, %{"refresh_token" => refresh_token}) do
    case Accounts.refresh_token(refresh_token) do
      {:ok, access_token, refresh_token} ->
        conn
        |> put_status(:ok)
        |> render(:show, access_token: access_token, refresh_token: refresh_token)

      {:error, reason} ->
        conn
        |> put_status(:bad_request)
        |> render(:error, message: reason)
    end
  end

  def get_current_user(conn, _) do
    case Guardian.get_user(conn) do
      %User{} = user ->
        conn
        |> put_status(:ok)
        |> render(:show, user: user)

      _ ->
        conn
        |> put_status(:bad_request)
        |> render(:error, message: "Error getting user from token")
    end
  end
end
