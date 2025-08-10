defmodule Echo.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias Echo.{Repo, Mailer, Guardian}
  alias Echo.Accounts.{User, Otp}
  alias Swoosh.Email

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  def get_user_by_email(email), do: Repo.get_by(User, email: email)

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a user.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{data: %User{}}

  """
  def change_user(%User{} = user, attrs \\ %{}) do
    User.changeset(user, attrs)
  end

  def create_otp(%User{id: user_id}, expires_in_seconds \\ 3600) do
    code = :rand.uniform(999_999) |> Integer.to_string() |> String.pad_leading(6, "0")
    expires_at = DateTime.utc_now() |> DateTime.add(expires_in_seconds, :second)

    %Otp{}
    |> Otp.changeset(%{user_id: user_id, code: code, expires_at: expires_at})
    |> Repo.insert()
  end

  defp create_token(%User{} = user) do
    {:ok, access_token, _access_claims} =
      Guardian.encode_and_sign(user, %{}, token_type: "access", ttl: {1, :hour})

    {:ok, refresh_token, _refresh_claims} =
      Guardian.encode_and_sign(user, %{access_token: access_token},
        token_type: "refresh",
        ttl: {52, :weeks}
      )

    {:ok, access_token, refresh_token}
  end

  def verify_otp(email, code) do
    with {:ok, user} <- fetch_user_by_email(email),
         {:ok, otp} <- fetch_valid_otp(user, code),
         {:ok, _} <- check_otp_is_not_expired(otp) do
      {:ok, access_token, refresh_token} = create_token(user)
      {:ok, access_token, refresh_token}
    end
  end

  defp fetch_user_by_email(email) do
    case get_user_by_email(email) do
      nil -> {:error, :not_found}
      user -> {:ok, user}
    end
  end

  defp fetch_valid_otp(%User{id: user_id}, code) do
    case Repo.get_by(Otp, user_id: user_id, code: code) do
      nil -> {:error, :invalid_code}
      otp -> {:ok, otp}
    end
  end

  defp check_otp_is_not_expired(%Otp{expires_at: expires_at}) do
    case DateTime.compare(DateTime.utc_now(), expires_at) do
      :gt -> {:error, :expired_code}
      _ -> {:ok, :valid}
    end
  end

  def send_opt(%User{} = user) do
    {:ok, otp} = create_otp(user)
    opt_message = "Your Echo access code: #{otp.code}"

    email =
      Email.new()
      |> Email.to(user.email)
      |> Email.from({"Echo", "no-reply@echo.dev"})
      |> Email.subject(opt_message)
      |> Email.html_body(opt_message)
      |> Email.text_body(opt_message)

    Mailer.deliver(email)

    {:ok, :otp_sent}
  end

  def send_otp(email) when is_binary(email) do
    with {:ok, user} <- fetch_user_by_email(email) do
      send_opt(user)
    end
  end
end
