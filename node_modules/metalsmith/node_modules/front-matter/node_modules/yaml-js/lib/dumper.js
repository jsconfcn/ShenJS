(function() {
  var emitter, representer, resolver, serializer, util,
    __slice = [].slice;

  util = require('./util');

  emitter = require('./emitter');

  serializer = require('./serializer');

  representer = require('./representer');

  resolver = require('./resolver');

  this.make_dumper = function(Emitter, Serializer, Representer, Resolver) {
    var Dumper, components;
    if (Emitter == null) {
      Emitter = emitter.Emitter;
    }
    if (Serializer == null) {
      Serializer = serializer.Serializer;
    }
    if (Representer == null) {
      Representer = representer.Representer;
    }
    if (Resolver == null) {
      Resolver = resolver.Resolver;
    }
    components = [Emitter, Serializer, Representer, Resolver];
    return Dumper = (function() {
      var component;

      util.extend.apply(util, [Dumper.prototype].concat(__slice.call((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = components.length; _i < _len; _i++) {
          component = components[_i];
          _results.push(component.prototype);
        }
        return _results;
      })())));

      function Dumper(stream, options) {
        var _i, _len, _ref;
        if (options == null) {
          options = {};
        }
        components[0].call(this, stream, options);
        _ref = components.slice(1);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          component = _ref[_i];
          component.call(this, options);
        }
      }

      return Dumper;

    })();
  };

  this.Dumper = this.make_dumper();

}).call(this);
