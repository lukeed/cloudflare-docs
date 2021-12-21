prepare:
	curl -sf https://gobinaries.com/tdewolff/minify/cmd/minify | sh
	minify --version

build: prepare
	npm run build -- --minify
