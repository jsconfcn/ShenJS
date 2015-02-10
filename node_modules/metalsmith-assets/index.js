var debug = require('debug')('metalsmith-assets');
var fs = require('fs');
var path = require('path');
var readdir = require('recursive-readdir');
var Mode = require('stat-mode');
var merge = require('merge');
var each = require('async').each;

/**
 * Expose `assets`.
 */

module.exports = assets;

/**
 * Default plugin options
 */
var defaults = {
  source: './public',
  destination: '.'
};

/**
 * Metalsmith plugin to include static assets.
 *
 * @param {Object} options (optional)
 *   @property {String} source Path to copy static assets from (relative to working directory). Defaults to './public'
 *   @property {String} destination Path to copy static assets to (relative to destination directory). Defaults to '.'
 * @return {Function}
 */
function assets(options) {
  options = merge({}, defaults, options);

  return function (files, metalsmith, done) {
    var src = metalsmith.join(options.source);
    var dest = options.destination;

    debug('pulling files from '+src);
    debug('and putting in '+dest);


    // copied almost line for line from https://github.com/segmentio/metalsmith/blob/master/lib/index.js
    readdir(src, function (err, arr) {
      if (err) return done(err);

      debug(arr.length+' files found.');

      each(arr, read, function (err) {
        debug(arr.length+' files copied.');
        done(err, files);
      });
    });

    function read(file, done) {
      var name = path.join(dest, path.relative(src, file));
      fs.stat(file, function (err, stats) {
        if (err) return done(err);
        fs.readFile(file, function (err, buffer) {
          if (err) return done(err);
          var file = {};

          file.contents = buffer;

          file.mode = Mode(stats).toOctal();
          files[name] = file;
          done();
        });
      });
    }
  };
}
