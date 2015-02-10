
# metalsmith-markdown

  A Metalsmith plugin to convert markdown files.

## Installation

    $ npm install metalsmith-markdown

## CLI Usage

  Install via npm and then add the `metalsmith-markdown` key to your `metalsmith.json` plugins with any [Marked](https://github.com/chjj/marked) options you want, like so:

```json
{
  "plugins": {
    "metalsmith-markdown": {
      "smartypants": true,
      "gfm": true,
      "tables": true
    }
  }
}
```

## Javascript Usage

  Pass `options` to the markdown plugin and pass it to Metalsmith with the `use` method:

```js
var markdown = require('metalsmith-markdown');

metalsmith.use(markdown({
  smartypants: true,
  gfm: true,
  tables: true
}));
```

## License

  MIT