
# metalsmith-include

  Make the contents of other source files as properties on a metalsmith file object. Can be used as a rudimentary partial system for `metalsmith-templates`.

## Example

index.md:

```markdown
---
template: home.jade
include:
  thanks: thanks.md
---

### Welcome to my website!
```

home.jade:

```jade
.main
  !=contents

  .thanks
    !=thanks
```

thanks.md:

```markdown
---
template: thanks.jade
partial: true
---

#### Thanks for visiting!
```

Output:

```html
<div class="main">
  <h3>Welcome to my website!</h3>

  <div class="thanks">
    <h4>Thanks for visiting!</h4>
  </div>
</div>
```

## Installation

    $ npm install metalsmith-include

## Options
  
  The only option is `deletePartials`, which tells `metalsmith-include` whether or not to remove files that are included in other files, and have a `partial` indicator in their front-matter. Defaults to true.

## CLI Usage

  Install via npm and then add the `metalsmith-include` key to your `metalsmith.json` plugins with your options passed as an object:

```json
{
  "plugins": {
    "metalsmith-include": {}
  }
}
```

## Javascript Usage

  Pass `options` to the include plugin and pass it to Metalsmith with the `use` method:

```js
var include = require('metalsmith-include');

metalsmith.use(include());
```

## License

  MIT
