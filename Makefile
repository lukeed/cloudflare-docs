# https://github.com/tdewolff/minify/tree/master/cmd/minify#installation
prepare:
	mkdir $HOME/src
	cd $HOME/src
	git clone --depth 1 https://github.com/tdewolff/minify.git
	cd minify
	make install
	which minify
	minify --version

build: prepare
	npm run build -- --minify
