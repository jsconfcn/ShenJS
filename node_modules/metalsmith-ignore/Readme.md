
# metalsmith-ignore

  A Metalsmith plugin to ignore files that match a pattern.

## Installation

    $ npm install metalsmith-ignore

## CLI Usage

  Install via npm and then add the `metalsmith-ignore` key to your `metalsmith.json` plugins. The simplest case just ignores a single pattern:

```json
{
  "plugins": {
    "metalsmith-ignore": "drafts/*"
  }
}
```

  But you can also pass an array of patterns to ignore:

```json
{
  "plugins": {
    "metalsmith-ignore": [
      "drafts/*",
      "unfinished/*"
    ]
  }
}
```

## Javascript Usage

  Pass the options to `Metalsmith#use`:

```js
var ignore = require('metalsmith-ignore');

metalsmith.use(ignore('drafts/*'));
```

  You can also pass an array of patterns to ignore:

```js
var ignore = require('metalsmith-ignore');

metalsmith.use(ignore([
  'drafts/*',
  'unfinished/*'
]));
```

## License

  MIT