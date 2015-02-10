
# metalsmith-excerpts

  A [Metalsmith](http://metalsmith.io) plugin to extract an excerpt from Markdown files.

## Installation

    $ npm install metalsmith-excerpts

## CLI Usage

  Install via npm and then add the `metalsmith-excerpts` key to your `metalsmith.json` plugin, like so:

```json
{
  "plugins": {
    "metalsmith-excerpts": true
  } 
}
```

## Javascript Usage

```js
var excerpts = require('metalsmith-excerpts');

metalsmith.use(excerpts());
```

## License

  MIT