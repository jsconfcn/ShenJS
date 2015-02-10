
var assert = require('assert');
var equal = require('assert-dir-equal');
var Metalsmith = require('metalsmith');
var assets = require('..');

describe('metalsmith-assets', function(){
  it('should copy assets', function(done){
    Metalsmith('test/fixture')
      .use(assets({
        source: './assets',
        destination: './assets'
      }))
      .build(function(err){
        if (err) return done(err);
        equal('test/fixture/expected', 'test/fixture/build');
        done();
      });
  });
});
