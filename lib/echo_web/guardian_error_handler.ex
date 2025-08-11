defmodule EchoWeb.GuardianErrorHandler do
  import Plug.Conn

  def auth_error(conn, {type, _reason}, _opts) do
    body = Jason.encode!(%{error: type, message: "Token expired or invalid"})

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(401, body)
  end
end
