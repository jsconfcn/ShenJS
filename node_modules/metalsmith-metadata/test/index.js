
var assert = require('assert');
var exists = require('fs').existsSync;
var Metalsmith = require('metalsmith');
var metadata = require('..');

describe('metalsmith-metadata', function(){
  it('should error for malformed data', function(done){
    var m = Metalsmith('test/fixtures/malformed').use(metadata({ file: 'data.json' }));
    m.build(function(err){
      assert(err);
      assert(~err.message.indexOf('malformed data'));
      assert(!exists('test/fixtures/malformed/build'));
      done();
    });
  });

  it('should parse JSON', function(done){
    var m = Metalsmith('test/fixtures/json').use(metadata({ file: 'data.json' }));
    m.build(function(err){
      if (err) return done(err);
      assert.deepEqual(m.metadata().file, { string: 'string' });
      assert(!exists('test/fixtures/json/build'));
      done();
    });
  });

  it('should parse YAML', function(done){
    var m = Metalsmith('test/fixtures/yaml').use(metadata({ file: 'data.yaml' }));
    m.build(function(err){
      if (err) return done(err);
      assert.deepEqual(m.metadata().file, { string: 'string' });
      assert(!exists('test/fixtures/yaml/build'));
      done();
    });
  });
});