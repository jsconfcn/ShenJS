yaml-js
===

yaml-js is a YAML loader and dumper, ported pretty much line-for-line from
[PyYAML](http://pyyaml.org/).  The goal for the project is to maintain a reliable and
specification-complete YAML processor in pure Javascript, with CoffeeScript source code.  You can
try it out [here](http://connec.github.com/yaml-js/).

Current Status
---

The library is being actively maintained for issues, and rather less actively developed for new/improved features.

Loading is stable and well-used, and passes the [yaml-spec](https://github.com/connec/yaml-spec)
test suite, which fairly thoroughly covers the YAML 'core' schema (if you notice anything missing,
create an issue).

Dumping is present but very lightly tested (auto-tests only, no significant usage).  The output
should therefore be correct YAML, however formatting is currently entirely untested.

If you use the library and find any bugs, or have any suggestions, don't hesitate to create an
[issue](https://github.com/connec/yaml-js/issues).

How Do I Get It?
---

    npm install yaml-js

How Do I Use It?
---

### In node (CoffeeScript):

**Load**

```coffee
yaml = require 'yaml-js'
console.log yaml.load '''
  ---
  phrase1:
    - hello
    - &world world
  phrase2:
    - goodbye
    - *world
  phrase3: >
    What is up
    in this place.
'''
# { phrase1: [ 'hello', 'world' ],
#   phrase2: [ 'goodbye', 'world' ],
#   phrase3: 'What is up in this place.' }
```

**Dump**

```coffee
yaml = require 'yaml-js'
console.log yaml.dump
  phrase1: [ 'hello',   'world' ]
  phrase2: [ 'goodbye', 'world' ]
  phrase3: 'What is up in this place.'
# phrase1: [hello, world]
# phrase2: [goodbye, world]
# phrase3: What is up in this place.
```

### In the browser:

```html
<script src='yaml.min.js'></script>
<script>
  console.log(yaml.load('hello: world'));
  // { 'hello' : 'world' }
  console.log(yaml.dump({ hello: 'world' }));
  // 'hello: world\n'
</script>
```

License
---

[WTFPL](http://sam.zoy.org/wtfpl/)
