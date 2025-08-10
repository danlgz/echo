defmodule EchoWeb.RoomJSON do
  alias Echo.Rooms.Room

  @doc """
  Renders a list of room.
  """
  def index(%{room: room}) do
    %{data: for(room <- room, do: data(room))}
  end

  @doc """
  Renders a single room.
  """
  def show(%{room: room}) do
    %{data: data(room)}
  end

  defp data(%Room{} = room) do
    %{
      id: room.id,
      name: room.name,
      created_by: room.created_by
    }
  end
end
