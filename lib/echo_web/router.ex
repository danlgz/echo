defmodule EchoWeb.Router do
  use EchoWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    # plug CORSPlug
  end

  pipeline :auth do
    plug EchoWeb.GuardianPipeline
  end

  scope "/api/v1", EchoWeb do
    pipe_through :api

    post "/users/register", UserController, :register
    post "/users/otp/verify", UserController, :verify_otp
    post "/users/otp/send", UserController, :send_otp
    post "/users/jwt/refresh", UserController, :refresh_token
    post "/users/email/check-availability", UserController, :check_email_availability
  end

  scope "/api/v1", EchoWeb do
    pipe_through [:api, :auth]

    get "/users/me", UserController, :get_current_user

    get "/rooms", RoomController, :index
    post "/rooms", RoomController, :create
    get "/rooms/:id", RoomController, :show
  end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:echo, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through [:fetch_session, :protect_from_forgery]

      live_dashboard "/dashboard", metrics: EchoWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
