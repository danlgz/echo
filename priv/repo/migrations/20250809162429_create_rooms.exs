defmodule Echo.Repo.Migrations.CreateRooms do
  use Ecto.Migration

  def change do
    create table(:rooms) do
      add :name, :string
      add :created_by, references(:users, on_delete: :nothing)

      timestamps(type: :utc_datetime)
    end

    create index(:rooms, [:created_by])
  end
end
