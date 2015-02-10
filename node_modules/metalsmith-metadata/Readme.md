
# metalsmith-metadata

  A metalsmith plugin to load global metadata from files.

  Supports `.json` and `.yaml` data.

## Installation

    $ npm install metalsmith-metadata

## CLI Usage

  Install via npm and then add the `metalsmith-metadata` key to your `metalsmith.json` plugins. Each key in the dictionary of options will be the key mixed into the global metadata, like so:

```json
{
  "plugins": {
    "metalsmith-metadata": {
      "authors": "./path/to/authors.json",
      "categories": "./path/to/categories.yaml"
    }
  }
}
```

## Javascript Usage

  Pass the options to `Metalsmith#use`:

```js
var metadata = require('metalsmith-metadata');

metalsmith.use(metadata({
  authors: './path/to/authors.json',
  categories: './path/to/categories.yaml'
}));
```

## License

  MIT