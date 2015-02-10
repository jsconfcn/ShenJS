
var assert = require('assert');
var excerpt = require('..');
var markdown = require('metalsmith-markdown');
var Metalsmith = require('metalsmith');

describe('metalsmith-excerpts', function(){
  it('should convert excerpt files', function(done){
    Metalsmith('test/fixtures/basic')
      .use(markdown())
      .use(excerpt())
      .build(function(err, files){
        if (err) return done(err);
        assert.equal('<p>excerpt</p>', files['index.html'].excerpt);
        done();
      });
  });

  it('should convert excerpt files that have leading whitespace', function(done){
    Metalsmith('test/fixtures/whitespace')
      .use(markdown())
      .use(excerpt())
      .build(function(err, files){
        if (err) return done(err);
        assert.equal('<p>excerpt</p>', files['index.html'].excerpt);
        done();
      });
  });

  it('should convert excerpt files that only have one paragraph', function(done){
    Metalsmith('test/fixtures/one-paragraph')
      .use(markdown())
      .use(excerpt())
      .build(function(err, files){
        if (err) return done(err);
        assert.equal('<p>excerpt</p>', files['index.html'].excerpt);
        done();
      });
  });

  it('should convert excerpt files with reference-style links', function(done) {
    Metalsmith('test/fixtures/reference-links')
      .use(markdown())
      .use(excerpt())
      .build(function(err, files) {
        if (err) return done(err);
        assert.equal('<p>This is <a href="http://example.com">a link</a>.</p>', files['index.html'].excerpt);
        done();
      });
  });

  it('should skip excerpts with leading whitespace', function(done) {
    Metalsmith('test/fixtures/indented-paragraph')
      .use(markdown())
      .use(excerpt())
      .build(function(err, files) {
        if (err) return done(err);
        assert.equal('<p>This is the excerpt.</p>', files['index.html'].excerpt);
        done();
      });
  });
});
