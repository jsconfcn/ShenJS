
var match = require('multimatch');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to ignore files that match a pattern.
 *
 * @param {String or Array or Object} opts
 * @return {Function}
 */

function plugin(opts){
  if ('string' == typeof opts) opts = [opts];
  if (opts instanceof Array) opts = { patterns: opts };
  opts = opts || {};
  var patterns = opts.patterns || [];

  return function(files, metalsmith, done){
    setImmediate(done);
    for (var file in files) {
      if (match(file, patterns)[0]) delete files[file];
    }
  };
}
