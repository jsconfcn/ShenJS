var path = require('path');
var bourbon = require('node-bourbon');

function includePaths() {
  return [bourbon.includePaths, path.join(__dirname, 'assets/')];
}

module.exports = {

  includePaths: includePaths(),

  with: function() {
    var paths = Array.prototype.slice.call(arguments);
    var result = [].concat.apply(includePaths(), paths);
    return result;
  }

};
