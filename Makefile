# https://github.com/tdewolff/minify/tree/master/cmd/minify#installation
# NOTE: build pipeline prevents `cd` action

prepare:
	echo "Cloning tdewolff/minify source"
	git clone --depth 1 https://github.com/tdewolff/minify.git
	-@$(MAKE) install -C minify
	which minify
	minify --version

build: prepare
	npm run build -- --minify
