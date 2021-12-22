# https://github.com/tdewolff/minify/tree/master/cmd/minify#installation
# NOTE: build pipeline prevents `cd` action
prepare:
	git clone --depth 1 https://github.com/tdewolff/minify.git
	go install ./minify/cmd/minify
	which minify
	minify --version

build: prepare
	npm run build -- --minify
