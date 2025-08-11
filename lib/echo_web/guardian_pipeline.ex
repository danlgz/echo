defmodule EchoWeb.GuardianPipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :echo,
    module: Echo.Guardian,
    error_handler: EchoWeb.GuardianErrorHandler

  plug Guardian.Plug.VerifyHeader
  plug Guardian.Plug.EnsureAuthenticated
  plug Guardian.Plug.LoadResource
end
