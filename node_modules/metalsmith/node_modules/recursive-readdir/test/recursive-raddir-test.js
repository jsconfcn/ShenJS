var assert = require('assert')
var readdir = require('../index')

describe('readdir', function() {
  it('correctly lists all files in nested directories', function (done) {
    var expectedFiles = [__dirname + '/testdir/a/a', __dirname + '/testdir/a/beans',
      __dirname + '/testdir/b/123', __dirname + '/testdir/b/b/hurp-durp',
      __dirname + '/testdir/c.txt', __dirname + '/testdir/d.txt'
    ]

    readdir(__dirname + '/testdir', function(err, list) {
      assert.ifError(err);
      assert.deepEqual(list.sort(), expectedFiles.sort());
      done()
    })
  })
  it('ignores the files listed in the ignores array', function (done) {
    var notExpectedFiles = [
      __dirname + '/testdir/d.txt',
      __dirname + '/testdir/a/beans'
    ]

    readdir(__dirname + '/testdir', ['d.txt', 'beans'], function(err, list) {
      assert.ifError(err);
      list.forEach(function(file) {
        assert.equal(notExpectedFiles.indexOf(file), -1,
          'Failed to ignore file "'+ file +'".')
      })
      done()
    })
  })
  it('works when there are no files to report except ignored files', function(done) {
    readdir(__dirname + '/testdirBeta', ['ignore.txt'], function(err, list) {
      assert.ifError(err);
      assert.equal(list.length, 0, 'expect to report 0 files')
      done()
    })
  })
})
