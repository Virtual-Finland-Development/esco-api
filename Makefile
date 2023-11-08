install:
	@echo "> Installing..."
	cd api && bun install
	cd deployment && npm install -ci
	@echo "> Installing completed!"

build-bun-runtime:
	@echo "> Building bun runtime..."
	./deployment/bun-lambda/build-runtime.sh
	@echo "> Building bun runtime completed!"

build: build-bun-runtime
	@echo "> Building app..."
	cd api && bun run clean && bun run build
	@echo "> Building app completed!"

test:
	@echo "> Testing app..."
	cd api && bun run test
	@echo "> Testing app completed!"

deploy: build
	@echo "> Deploying..."
	pulumi -C deployment up
	@echo "> Deployment finished!"