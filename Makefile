# https://github.com/tdewolff/minify/tree/master/cmd/minify#installation
# NOTE: build pipeline prevents `cd` action

prepare:
	which go
	which git
	curl -L https://github.com/tdewolff/minify/releases/download/v2.9.24/minify_linux_amd64.tar.gz > minify.tar.gz
	tar -xf minify.tar.gz
	ls /usr/local
	ls /usr/local/bin
	ls /usr/bin
	./minify -h
	ln -s minify
	which minify
	minify --version

build: prepare
	npm run build -- --minify
