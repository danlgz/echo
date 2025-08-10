defmodule Echo.Repo.Migrations.CreateOpts do
  use Ecto.Migration

  def change do
    create table(:opts) do
      add :code, :string
      add :expires_at, :utc_datetime
      add :user_id, references(:users, on_delete: :nothing)

      timestamps(type: :utc_datetime)
    end

    create index(:opts, [:user_id])
  end
end
