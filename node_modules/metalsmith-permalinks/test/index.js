
var rimraf = require('rimraf');
var assert = require('assert');
var equal = require('assert-dir-equal');
var Metalsmith = require('metalsmith');
var permalinks = require('..');

describe('metalsmith-permalinks', function(){
  before(function(done){
    rimraf('test/fixtures/*/build', done);
  });

  it('should change files even with no pattern', function(done){
    Metalsmith('test/fixtures/no-pattern')
      .use(permalinks())
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/no-pattern/expected', 'test/fixtures/no-pattern/build');
        done();
      });

  });

  it('should replace a pattern', function(done){
    Metalsmith('test/fixtures/pattern')
      .use(permalinks({ pattern: ':title' }))
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/pattern/expected', 'test/fixtures/pattern/build');
        done();
      });

  });

  it('should accepts a shorthand string', function(done){
    Metalsmith('test/fixtures/shorthand')
      .use(permalinks(':title'))
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/shorthand/expected', 'test/fixtures/shorthand/build');
        done();
      });

  });

  it('should copy relative files to maintain references', function(done){
    Metalsmith('test/fixtures/relative')
      .use(permalinks())
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/relative/expected', 'test/fixtures/relative/build');
        done();
      });
  });

  it('should not copy relative files', function(done){
    Metalsmith('test/fixtures/no-relative')
      .use(permalinks({
        relative: false
      }))
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/no-relative/expected', 'test/fixtures/no-relative/build');
        done();
      });
  });

  it('should copy relative files even with patterns', function(done){
    Metalsmith('test/fixtures/relative-pattern')
      .use(permalinks(':title'))
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/relative-pattern/expected', 'test/fixtures/relative-pattern/build');
        done();
      });
  });

  it('should copy relative files once per output file', function(done){
    Metalsmith('test/fixtures/relative-multiple')
      .use(permalinks(':title'))
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/relative-multiple/expected', 'test/fixtures/relative-multiple/build');
        done();
      });
  });

  it('should format a date', function(done){
    Metalsmith('test/fixtures/date')
      .use(permalinks(':date'))
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/date/expected', 'test/fixtures/date/build');
        done();
      });

  });

  it('should format a date with a custom formatter', function(done){
    Metalsmith('test/fixtures/custom-date')
      .use(permalinks({
        pattern: ':date',
        date: 'YYYY/MM'
      }))
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/custom-date/expected', 'test/fixtures/custom-date/build');
        done();
      });

  });

  it('should replace any backslashes in paths with slashes', function(done){
    Metalsmith('test/fixtures/backslashes')
      .use(permalinks())
      .use(function (files, metalsmith, pluginDone) {
        Object.keys(files).forEach(function(file){
          assert.equal(files[file].path.indexOf('\\'), -1);
        });
        pluginDone();
        done();
      })
      .build(function(err){
        if (err) return done(err);
      });

  });

  it('should ignore any files with permalink equal to false option', function(done){
    Metalsmith('test/fixtures/false-permalink')
      .use(permalinks(':title'))
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/false-permalink/expected', 'test/fixtures/false-permalink/build');
        done();
      });
  });
});
