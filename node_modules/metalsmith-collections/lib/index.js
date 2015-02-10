
var debug = require('debug')('metalsmith-collections');
var extend = require('extend');
var Matcher = require('minimatch').Minimatch;
var unique = require('uniq');
var read = require('fs').readFileSync;
var loadMetadata = require('read-metadata').sync;

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin that adds `collections` of files to the global
 * metadata as a sorted array.
 *
 * @param {Object} collections (optional)
 * @return {Function}
 */

function plugin(opts){
  opts = normalize(opts);
  var keys = Object.keys(opts);
  var match = matcher(opts);

  return function(files, metalsmith, done){
    var metadata = metalsmith.metadata();

    /**
     * Find the files in each collection.
     */

    Object.keys(files).forEach(function(file){
      debug('checking file: %s', file);
      var data = files[file];
      match(file, data).forEach(function(key){
        metadata[key] = metadata[key] || [];
        metadata[key].push(data);
      });
    });

    /**
     * Ensure that a default empty collection exists.
     */

    keys.forEach(function(key) {
      metadata[key] = metadata[key] || [];
    });

    /**
     * Sort the collections.
     */

    keys.forEach(function(key){
      debug('sorting collection: %s', key);
      var settings = opts[key];
      var sort = settings.sortBy || 'date';
      var col = metadata[key];

      if ('function' == typeof sort) {
        col.sort(sort);
      } else {
        col.sort(function(a, b){
          a = a[sort];
          b = b[sort];
          if (!a && !b) return 0;
          if (!a) return -1;
          if (!b) return 1;
          if (b > a) return -1;
          if (a > b) return 1;
          return 0;
        });
      }

      if (settings.reverse) col.reverse();
    });

    /**
     * Add `next` and `previous` references.
     */

    keys.forEach(function(key){
      debug('referencing collection: %s', key);
      var col = metadata[key];
      var last = col.length - 1;
      col.forEach(function(file, i){
        if (0 != i) file.previous = col[i-1];
        if (last != i) file.next = col[i+1];
      });
    });

    /**
     * Add collection metadata
     */

    keys.forEach(function(key){
      debug('adding metadata: %s', key);
      var settings = opts[key];
      var col = metadata[key];
      col.metadata = (typeof settings.metadata === 'string') ?
        loadMetadata(settings.metadata) :
        settings.metadata;
    });

    /**
     * Add them grouped together to the global metadata.
     */

    metadata.collections = {};
    keys.forEach(function(key){
      return metadata.collections[key] = metadata[key];
    });

    done();
  };
}

/**
 * Normalize an `options` dictionary.
 *
 * @param {Object} options
 */

function normalize(options){
  options = options || {};

  for (var key in options) {
    var val = options[key];
    if ('string' == typeof val) options[key] = { pattern: val };
  }

  return options;
}

/**
 * Generate a matching function for a given set of `collections`.
 *
 * @param {Object} collections
 * @return {Function}
 */

function matcher(cols){
  var keys = Object.keys(cols);
  var matchers = {};

  keys.forEach(function(key){
    var opts = cols[key];
    if (!opts.pattern) return;
    matchers[key] = new Matcher(opts.pattern);
  });

  return function(file, data){
    var matches = [];

    if (data.collection) {
      var collection = data.collection;
      if (!Array.isArray(collection)) collection = [collection];
      collection.forEach(function(key){
        if (key && ~keys.indexOf(key)) matches.push(key);
      });
    }
    else {
      for (var key in matchers){
        var m = matchers[key];
        if (m && m.match(file)) matches.push(key);
      }
    }

    data.collection = unique(matches);
    return data.collection;
  };
}
