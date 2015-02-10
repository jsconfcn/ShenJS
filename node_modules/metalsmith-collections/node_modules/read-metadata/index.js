var fs = require('fs');
var extname = require('path').extname;
var yaml = require('yaml-js');

function parse(ext, data) {
  if (ext === '.json') {
    return JSON.parse(data);
  }
  if (ext === '.yaml') {
    return yaml.load(data);
  }
  return new Error('Invalid metadata file type');
}

module.exports = exports = function(path, done) {
  var ext = extname(path);
  fs.readFile(path, 'utf-8', function(err, data){
    if (err) return done(err);
    var result = parse(ext, data);
    if (result instanceof Error) {
      return done(result);
    }
    done(null, result);
  });
};

exports.sync = function(path) {
  var ext = extname(path);
  var data = fs.readFileSync(path, 'utf-8');
  return parse(ext, data);
};