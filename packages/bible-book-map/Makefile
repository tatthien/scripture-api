.PHONY: build

build:
	bun run build && bun run build:types

publish: build
	npm publish --access=public

