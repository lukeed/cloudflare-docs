prepare:
	which go
	which pkg
	which apt-get
	# curl -sf https://gobinaries.com/tdewolff/minify/cmd/minify | sh
	# minify --version

build: prepare
	npm run build -- --minify
