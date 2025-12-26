docker-build-api:
	docker build -t scripture-api -f packages/api/Dockerfile .

docker-run:
	docker stop scripture-api 
	docker rm scripture-api
	docker run -d --name scripture-api scripture-api

PHONY: docker-build docker-run
