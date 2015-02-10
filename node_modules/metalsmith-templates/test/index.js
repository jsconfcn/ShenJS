
var assert = require('assert');
var equal = require('assert-dir-equal');
var Metalsmith = require('metalsmith');
var templates = require('..');

describe('metalsmith-templates', function(){
  it('should render a basic template', function(done){
    Metalsmith('test/fixtures/basic')
      .use(templates({ engine: 'swig' }))
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/basic/expected', 'test/fixtures/basic/build');
        done();
      });
  });

  it('should accept an engine string', function(done){
    Metalsmith('test/fixtures/basic')
      .use(templates('swig'))
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/basic/expected', 'test/fixtures/basic/build');
        done();
      });
  });

  it('should accept an inPlace option', function(done){
    Metalsmith('test/fixtures/in-place')
      .use(templates({ engine: 'swig', inPlace: true }))
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/in-place/expected', 'test/fixtures/in-place/build');
        done();
      });
  });

  it('should accept a pattern to match', function(done){
    Metalsmith('test/fixtures/pattern')
      .use(templates({ engine: 'swig', pattern: '*.md' }))
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/pattern/expected', 'test/fixtures/pattern/build');
        done();
      });
  });

  it('should accept a default template', function(done){
    Metalsmith('test/fixtures/default')
      .use(templates({ engine: 'swig', pattern: '*.md', default: 'default.html' }))
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/pattern/expected', 'test/fixtures/pattern/build');
        done();
      });
  });

  it('should accept a different templates directory', function(done){
    Metalsmith('test/fixtures/directory')
      .use(templates({ engine: 'swig', directory: 'layouts' }))
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/directory/expected', 'test/fixtures/directory/build');
        done();
      });
  });

  it('should mix in global metadata', function(done){
    Metalsmith('test/fixtures/metadata')
      .metadata({ title: 'Global Title' })
      .use(templates({ engine: 'swig' }))
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/metadata/expected', 'test/fixtures/metadata/build');
        done();
      });
  });

  it('should preserve binary files', function(done){
    Metalsmith('test/fixtures/binary')
      .use(templates({ engine: 'swig' }))
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/binary/expected', 'test/fixtures/binary/build');
        done();
      });
  });
});