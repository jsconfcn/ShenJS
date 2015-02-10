(function() {
  var composer, constructor, parser, reader, resolver, scanner, util,
    __slice = [].slice;

  util = require('./util');

  reader = require('./reader');

  scanner = require('./scanner');

  parser = require('./parser');

  composer = require('./composer');

  resolver = require('./resolver');

  constructor = require('./constructor');

  this.make_loader = function(Reader, Scanner, Parser, Composer, Resolver, Constructor) {
    var Loader, components;
    if (Reader == null) {
      Reader = reader.Reader;
    }
    if (Scanner == null) {
      Scanner = scanner.Scanner;
    }
    if (Parser == null) {
      Parser = parser.Parser;
    }
    if (Composer == null) {
      Composer = composer.Composer;
    }
    if (Resolver == null) {
      Resolver = resolver.Resolver;
    }
    if (Constructor == null) {
      Constructor = constructor.Constructor;
    }
    components = [Reader, Scanner, Parser, Composer, Resolver, Constructor];
    return Loader = (function() {
      var component;

      util.extend.apply(util, [Loader.prototype].concat(__slice.call((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = components.length; _i < _len; _i++) {
          component = components[_i];
          _results.push(component.prototype);
        }
        return _results;
      })())));

      function Loader(stream) {
        var _i, _len, _ref;
        components[0].call(this, stream);
        _ref = components.slice(1);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          component = _ref[_i];
          component.call(this);
        }
      }

      return Loader;

    })();
  };

  this.Loader = this.make_loader();

}).call(this);
