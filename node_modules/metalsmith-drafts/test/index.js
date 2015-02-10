
var equal = require('assert-dir-equal');
var Metalsmith = require('metalsmith');
var drafts = require('..');

describe('metalsmith-drafts', function(){
  it('should remove drafts from output', function(done){
    Metalsmith('test/fixture')
      .use(drafts())
      .build(function(err){
        if (err) return done(err);
        equal('test/fixture/expected', 'test/fixture/build');
        done();
      });
  });
});