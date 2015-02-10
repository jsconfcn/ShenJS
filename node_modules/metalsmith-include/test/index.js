
var assert = require('assert');
var equal = require('assert-dir-equal');
var Metalsmith = require('metalsmith');
var templates = require('metalsmith-templates');
var markdown = require('metalsmith-markdown');
var include = require('..');

describe('metalsmith-include', function(){
  it('should include other source files', function(done){
    Metalsmith('test/fixture-basic')
      .use(include())
      .build(function(err, files){
        if (err) return done(err);
        equal('test/fixture-basic/expected', 'test/fixture-basic/build');
        assert.equal(files['index.md'].thanks, files['thanks.md'].contents);
        done();
      });
  });

  it('should include files without an extension', function(done){
    Metalsmith('test/fixture-ext')
      .use(include())
      .build(function(err){
        if (err) return done(err);
        equal('test/fixture-ext/expected', 'test/fixture-ext/build');
        done();
      });
  });

  it('should remove partials before building', function(done){
    Metalsmith('test/fixture-delete')
      .use(include())
      .build(function(err){
        if (err) return done(err);

        equal('test/fixture-delete/expected', 'test/fixture-delete/build');
        done();
      });
  });

  it('should retain partials when the option is set', function(done){
    Metalsmith('test/fixture-retain')
      .use(include({
        deletePartials: false
      }))
      .build(function(err){
        if (err) return done(err);
        equal('test/fixture-retain/expected', 'test/fixture-retain/build');
        done();
      });
  });

  it('should allow file properties to be overwritten', function(done){
    Metalsmith('test/fixture-basic')
      .use(include())
      .use((function () {
        return function (files, metalsmith, done) {
          files['index.md'].thanks = "no thanks";
          done();
        };
      }).call(this))
      .build(function(err, files){
        if (err) return done(err);
        assert.equal(files['index.md'].thanks, "no thanks");
        done();
      });
  });
});
