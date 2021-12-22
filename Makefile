# https://github.com/tdewolff/minify/tree/master/cmd/minify#installation
# NOTE: build pipeline prevents `cd` action

FLAGS=v2.9.24
FLAGS=-ldflags "-s -w -X 'main.Version=${VERSION}'" -trimpath
ENVS=GO111MODULES=on CGO_ENABLED=0

prepare:
	echo "Cloning tdewolff/minify source"
	git clone --depth 1 https://github.com/tdewolff/minify.git
	echo "Installing minify dependencies"
	${ENVS} go install ${FLAGS} ./minify/cmd/minify
	which minify
	minify --version

build: prepare
	npm run build -- --minify
