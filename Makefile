install:
	@echo "> Installing..."
	cd api && bun install && bun run clean && bun run build
	cd deployment && npm install -ci
	@echo "> Installing done!"

deploy: install
	@echo "> Deploying..."
	pulumi -C deployment up
	@echo "> Deployment finished!"