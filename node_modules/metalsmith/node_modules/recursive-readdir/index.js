var fs = require('fs')
var p = require('path')

// how to know when you are done?
function readdir(path, ignores, callback) {
  if (typeof ignores == 'function') {
    callback = ignores
    ignores  = null
  }
  var list = []

  fs.readdir(path, function (err, files) {
    if (err) {
      return callback(err)
    }

    var pending = files.length
    if (!pending) {
      // we are done, woop woop
      return callback(null, list)
    }

    files.forEach(function (file) {
      if (ignores != null && ignores.indexOf(file) > -1){
        pending -= 1
        if (pending <= 0) {
          callback(null, list)
        }
        return 
      }

      fs.stat(p.join(path, file), function (err, stats) {
        if (err) {
          return callback(err)
        }

        if (stats.isDirectory()) {
          files = readdir(p.join(path, file), ignores, function (err, res) {
            list = list.concat(res)
            pending -= 1
            if (!pending) {
              callback(null, list)
            }
          })
        }
        else {
          list.push(p.join(path, file))
          pending -= 1
          if (!pending) {
            callback(null, list)
          }
        }
      })
    })
  })
}

module.exports = readdir
