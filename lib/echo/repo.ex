defmodule Echo.Repo do
  use Ecto.Repo,
    otp_app: :echo,
    adapter: Ecto.Adapters.Postgres
end
