
# metalsmith-templates

  A metalsmith plugin to render files with templates.

  You can use any templating engine supported by [consolidate.js](https://github.com/visionmedia/consolidate.js).

## Installation

    $ npm install metalsmith-templates

## CLI Usage

  Install the node modules and then add the `metalsmith-templates` key to your `metalsmith.json` plugins. The simplest use case just requires the template engine you want to use:

```json
{
  "plugins": {
    "metalsmith-templates": "handlebars"
  }
}
```

  If you want to specify additional options, pass an object:

```json
{
  "plugins": {
    "metalsmith-templates": {
      "engine": "handlebars",
      "directory": "templates"
    }
  }
}
```

## Javascript Usage

  For the simplest use case, just pass your templating engine:

```js
var templates = require('metalsmith-templates');

metalsmith.use(templates('swig'));
```

  To specify additional options:

```js
metalsmith.use(templates({
  engine: 'swig',
  directory: 'templates'
}));
```

## License

  MIT