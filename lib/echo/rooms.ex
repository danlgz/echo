defmodule Echo.Rooms do
  @moduledoc """
  The Rooms context.
  """

  import Ecto.Query, warn: false
  alias Echo.Repo

  alias Echo.Rooms.{Room, UserRoom}

  @doc """
  Returns the list of rooms.

  ## Examples

      iex> list_rooms()
      [%Room{}, ...]

  """
  def list_rooms(user_id) do
    query =
      from r in Room,
        join: ur in UserRoom,
        on: ur.room_id == r.id,
        where: ur.user_id == ^user_id,
        select: r

    Repo.all(query)
  end

  @doc """
  Gets a single room.

  Raises `Ecto.NoResultsError` if the Room does not exist.

  ## Examples

      iex> get_room!(123)
      %Room{}

      iex> get_room!(456)
      ** (Ecto.NoResultsError)

  """
  def get_room!(id), do: Repo.get!(Room, id)

  @doc """
  Creates a room.

  ## Examples

      iex> create_room(%{field: value})
      {:ok, %Room{}}

      iex> create_room(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_room(attrs) do
    %Room{}
    |> Room.changeset(attrs)
    |> Repo.insert()
  end

  def create_user_room(attrs) do
    %UserRoom{}
    |> UserRoom.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Creates a `Room` and assigns the creator as an administrator (`UserRoom`)
  within a single database transaction.

  ## Parameters

    * `attrs` - A map containing the attributes required to create the room.
      Must include at least:
        - `:created_by` (the ID of the user creating the room)
        - Any other fields required by the `Room` changeset.

  ## Behavior

    1. Inserts a new record into the `rooms` table using `create_room/1`.
    2. Inserts a new record into the `user_rooms` table with the role `:admin`
      for the user specified in `:created_by` and the newly created room.
    3. If any of the operations fail, a **rollback** is triggered and no changes
      are persisted to the database.

  ## Return values

    * `{:ok, {room, user_room}}` if both inserts succeed.
    * `{:error, reason}` if any operation fails, where `reason` may be a changeset
      with validation errors or another failure reason.

  ## Example

    attrs = %{name: "Test Room", created_by: 1}

    case Echo.Rooms.create_room_and_user_admin(attrs) do
      {:ok, {room, user_room}} ->
        IO.puts("Room created with ID \#{room.id} and admin \#{user_room.user_id}")

      {:error, reason} ->
        IO.inspect(reason, label: "Failed to create room")
    end
  """
  def create_room_and_user_admin(attrs) do
    Repo.transaction(fn ->
      with {:ok, room} <- create_room(attrs),
           {:ok, user_room} <-
             create_user_room(%{user_id: attrs.created_by, room_id: room.id, role: :admin}) do
        {room, user_room}
      else
        {:error, reason} -> Repo.rollback(reason)
      end
    end)
  end

  @doc """
  Updates a room.

  ## Examples

      iex> update_room(room, %{field: new_value})
      {:ok, %Room{}}

      iex> update_room(room, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_room(%Room{} = room, attrs) do
    room
    |> Room.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a room.

  ## Examples

      iex> delete_room(room)
      {:ok, %Room{}}

      iex> delete_room(room)
      {:error, %Ecto.Changeset{}}

  """
  def delete_room(%Room{} = room) do
    Repo.delete(room)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking room changes.

  ## Examples

      iex> change_room(room)
      %Ecto.Changeset{data: %Room{}}

  """
  def change_room(%Room{} = room, attrs \\ %{}) do
    Room.changeset(room, attrs)
  end
end
