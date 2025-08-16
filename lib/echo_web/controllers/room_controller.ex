defmodule EchoWeb.RoomController do
  use EchoWeb, :controller

  alias Echo.Rooms
  alias Echo.Rooms.Room
  alias Echo.Guardian

  action_fallback EchoWeb.FallbackController

  def index(conn, _params) do
    user = Guardian.get_user(conn)
    room = Rooms.list_rooms(user.id)
    render(conn, :index, room: room)
  end

  def create(conn, %{"name" => room_name}) do
    user = Guardian.get_user(conn)

    payload = %{
      name: room_name,
      created_by: user.id
    }

    with {:ok, {room, _user_room}} <-
           Rooms.create_room_and_user_admin(payload) do
      conn
      |> put_status(:created)
      |> render(:show, room: room)
    end
  end

  def show(conn, %{"id" => id}) do
    room = Rooms.get_room!(id)
    render(conn, :show, room: room)
  end

  def update(conn, %{"id" => id, "room" => room_params}) do
    room = Rooms.get_room!(id)

    with {:ok, %Room{} = room} <- Rooms.update_room(room, room_params) do
      render(conn, :show, room: room)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Guardian.get_user(conn)
    room = Rooms.get_room!(id)
    room_users = Rooms.list_room_users(room.id)

    can_delete =
      Enum.any?(room_users, fn user_room ->
        user_room.user_id == user.id and user_room.role == :admin
      end)

    if not can_delete do
      send_resp(conn, :forbidden, "You are not authorized to delete this room")
    else
      with {:ok, %Room{}} <- Rooms.delete_room(room) do
        send_resp(conn, :no_content, "")
      end
    end
  end
end
