
# metalsmith-assets

  Include static assets in your Metalsmith build

## Installation

    $ npm install metalsmith-assets

## CLI Usage

  Install via npm and then add the `metalsmith-assets` key to your `metalsmith.json` plugins with a source and destination directory, like so:

```json
{
  "plugins": {
    "metalsmith-assets": {
      "source": "./assets",
      "destination": "./assets"
    }
  }
}
```

## Javascript Usage

  Pass `options` to the assets plugin and pass it to Metalsmith with the `use` method:

```js
var assets = require('metalsmith-assets');

metalsmith.use(assets({
  source: './assets', // relative to the working directory
  destination: './assets' // relative to the build directory
}));
```

## License

  MIT
