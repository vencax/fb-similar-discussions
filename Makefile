.PHONY: run

run: mock-server dev-server

dev-server:
	@API_URL=http://localhost:3000 ./node_modules/.bin/webpack-dev-server \
		--content-base examples/forum --inline --hot --history-api-fallback

mock-server:
	@node ./fake_backend/index.js &

test:
	@NODE_ENV=test ./node_modules/.bin/tape \
		-r babel-register -r ./tests/setup.js \
		./tests/**/*.spec.js

testwatch:
	@NODE_ENV=test ./node_modules/.bin/tape --watch \
		-r babel-register -r ./tests/setup.js \
		./tests/**/*.spec.js
