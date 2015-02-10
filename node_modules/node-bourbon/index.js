var path = require('path');

function includePaths() {
  return [path.join(__dirname, 'assets/stylesheets')];
}

module.exports = {

  includePaths: includePaths(),

  with: function() {
    var paths  = Array.prototype.slice.call(arguments);
    var result = [].concat.apply(includePaths(), paths);
    return result;
  }

};
