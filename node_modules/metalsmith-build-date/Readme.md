
# metalsmith-build-date

  A Metalsmith plugin that adds a build date to the metadata. Useful for `atom.xml` or other feeds.

## Installation

    $ npm install metalsmith-build-date

## Usage

```js
var date = require('metalsmith-build-date');

metalsmith.use(date());
```

  That will add a global `date` property to your metadata, so you can use it in a template like:

```handlebars
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <updated>{{ date }}</updated>
```

## CLI Usage

  Install via npm and then add the `metalsmith-build-date` key to your `metalsmith.json`:

```json
{
  "plugins": {
    "metalsmith-build-date": true
  }
}
```

## License

  MIT