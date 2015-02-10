
var assert = require('assert');
var Metalsmith = require('metalsmith');
var date = require('..');

describe('metalsmith-build-date', function(){
  it('should add a build date', function(done){
    var m = Metalsmith('test/fixture');
    m
      .use(date())
      .build(function(err){
        if (err) return done(err);
        assert(m.metadata().date instanceof Date);
        done();
      });
  });
});