
BROWSERS="ie6..11"
BINS=node_modules/.bin
URL=http://localhost:3000/test
C=$(BINS)/component
S=$(BINS)/serve
G=$(BINS)/gravy

build: node_modules index.js components
	@$(C) build --dev

components: component.json
	@$(C) install --dev

test: build server
	@open $(URL)

test-sauce: server build
	@BROWSERS=$(BROWSERS) $(G) \
		--url $(URL)

node_modules: package.json
	@npm install

server: kill
	@$(S) . &> /dev/null & echo $$! test/pid
	@sleep 1

kill:
	@-test -e test/pid \
		&& kill $(cat test/pid) \
		&& rm -f test/pid

clean: kill
	rm -rf components build

.PHONY: clean

