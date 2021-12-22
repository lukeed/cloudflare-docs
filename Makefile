# https://github.com/tdewolff/minify/tree/master/cmd/minify#installation
# NOTE: build pipeline prevents `cd` action

download:
	curl -L https://github.com/tdewolff/minify/releases/download/v2.9.24/minify_linux_amd64.tar.gz > minify.tar.gz
	tar -xf minify.tar.gz

build: download
	npm run build
	./minify -r public -o .
	cat public/index.html
