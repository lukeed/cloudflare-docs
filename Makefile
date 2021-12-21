prepare:
	curl -sf https://gobinaries.com/tdewolff/minify/cmd/minify | sh
	minify --version

build:
	npm run build -- --minify
