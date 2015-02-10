
var debug = require('debug')('metalsmith-include');
var each = require('async').each;

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to run files through any template in a template `dir`.
 *
 * @param {String or Object} options
 *   @property {String} deletePartials Whether or not to delete files that are indicated as partials. `false` means don't delete them. Defaults to `true`.
 *   @property {String} default (optional)
 *   @property {String} directory (optional)
 *   @property {String} engine
 *   @property {String} inPlace (optional)
 *   @property {String} pattern (optional)
 * @return {Function}
 */

function plugin(opts) {
  opts = opts || {};
  var included = {};

  return function (files, metalsmith, done) {
    var _files = copy(files);

    each(Object.keys(files), convert, done);

    function convert(filename, done) {

      debug('checking %s for includes', filename);

      var file = _files[filename];
      var includes = Object.keys(file.include || {});

      debug('adding %s included files', includes.length);

      each(includes, include, done);

      function include(name, done) {
        var filename = file.include[name];
        var property = {
          overwritten: false,
          value: undefined
        };
        var resolvedFilename = resolve(filename);

        if(!included[filename]) {

          if(!resolvedFilename) return done(new Error("Unknown file "+filename));

          included[filename] = _files[resolvedFilename];

          if(_files[resolvedFilename].partial && opts.deletePartials !== false) {
            debug('removing %s from files', resolvedFilename);
            delete files[resolvedFilename];
          }
        }

        debug('adding %s to includes as `%s`', resolvedFilename, name);

        file[name] = included[filename].contents;

        done();
      }
    }

    // resolve a filename in the files object
    // if there isn't a match, assume it was provided without an extension
    function resolve(name) {
      var filenames = Object.keys(_files);

      if(~filenames.indexOf(name)) return name;

      var re = new RegExp("^" + name + "\\..+$");

      for(var i=0; i<filenames.length; i++) {
        if(re.test(filenames[i])) return filenames[i];
      }

      return false;
    }

  };
}

// naive shallow copy
function copy(obj) {
  var newObj = {};

  for(var p in obj) {
    newObj[p] = obj[p];
  }

  return newObj;
}
