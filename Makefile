# https://github.com/tdewolff/minify/tree/master/cmd/minify#installation
prepare:
	mkdir $(HOME)/src
	cd $(HOME)/src
	git clone --depth 1 https://github.com/tdewolff/minify.git
	ls -alh
	ls -alh minify
	cd minify
	ls -alh
	go install ./cmd/minify
	which minify
	minify --version

build: prepare
	npm run build -- --minify
