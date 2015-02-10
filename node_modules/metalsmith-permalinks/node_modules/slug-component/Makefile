
build: components index.js
	@component build --dev

test:
	@open test/index.html

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

.PHONY: clean test
