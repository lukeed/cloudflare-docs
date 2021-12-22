# https://github.com/tdewolff/minify/tree/master/cmd/minify#installation
# NOTE: build pipeline prevents `cd` action

prepare:
	echo "Cloning tdewolff/minify source"
	git clone --depth 1 https://github.com/tdewolff/minify.git
	ls -alh minify
	@-$(MAKE) install -C minify -k
	which minify
	ls -alh minify
	minify --version

build: prepare
	npm run build -- --minify
