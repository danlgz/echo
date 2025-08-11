defmodule Echo.Repo.Migrations.CreateUserRooms do
  use Ecto.Migration

  def change do
    create table(:user_rooms) do
      add :role, :string
      add :user_id, references(:users, on_delete: :delete_all)
      add :room_id, references(:rooms, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create index(:user_rooms, [:user_id])
    create index(:user_rooms, [:room_id])

    create unique_index(:user_rooms, [:user_id, :room_id])
  end
end
