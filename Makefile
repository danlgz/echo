dev:
	make start-docker
	mix phx.server

dev-interactive:
	iex -S mix phx.server

migrate:
	mix ecto.migrate

test:
	mix test

start-docker:
	docker-compose up -d

stop-docker:
	docker-compose down

reset-docker:
	docker-compose down -v && docker-compose up -d
