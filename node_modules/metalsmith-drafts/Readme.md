
# metalsmith-drafts

  A metalsmith plugin to hide drafts.

## Installation

    $ npm install metalsmith-drafts

## CLI Usage

  Install via npm and then add the `metalsmith-drafts` key to your `metalsmith.json` plugins, like so:

```json
{
  "plugins": {
    "metalsmith-drafts": true
  }
}
```

## Javascript Usage

  Pass the plugin to `Metalsmith#use`:

```js
var drafts = require('metalsmith-drafts');

metalsmith.use(drafts());
```

## License

  MIT