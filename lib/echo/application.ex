defmodule Echo.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      EchoWeb.Telemetry,
      Echo.Repo,
      {DNSCluster, query: Application.get_env(:echo, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: Echo.PubSub},
      # Start a worker by calling: Echo.Worker.start_link(arg)
      # {Echo.Worker, arg},
      # Start to serve requests, typically the last entry
      EchoWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Echo.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    EchoWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
