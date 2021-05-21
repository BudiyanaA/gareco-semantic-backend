rundev:
	@docker-compose up
runBuild:
	@docker-compose up --build
runBackground:
	@docker-compose up -d
stop:
	@docker-compose down
restartDev:
	@docker-compose down
	@docker-compose up
pushHeroku:
	@heroku container:login
	@heroku container:push web --app gareco-semantic-backend
	@heroku container:release web --app gareco-semantic-backend