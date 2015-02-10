
var assert = require('assert');
var Metalsmith = require('metalsmith');
var collections = require('..');

describe('metalsmith-collections', function(){
  it('should add collections to metadata', function(done){
    var metalsmith = Metalsmith('test/fixtures/basic');
    metalsmith
      .use(collections({ articles: {}}))
      .build(function(err){
        if (err) return done(err);
        var m = metalsmith.metadata();
        assert.equal(2, m.articles.length);
        assert.equal(m.collections.articles, m.articles);
        done();
      });
  });

  it('should match collections by pattern', function(done){
    var metalsmith = Metalsmith('test/fixtures/pattern');
    metalsmith
      .use(collections({
        articles: {
          pattern: '*.md'
        }
      }))
      .build(function(err){
        if (err) return done(err);
        assert.equal(3, metalsmith.metadata().articles.length);
        done();
      });
  });

  it('should take a pattern shorthand string', function(done){
    var metalsmith = Metalsmith('test/fixtures/pattern');
    metalsmith
      .use(collections({
        articles: '*.md'
      }))
      .build(function(err){
        if (err) return done(err);
        assert.equal(3, metalsmith.metadata().articles.length);
        done();
      });
  });

  it('should add the collection property to a file', function(done){
    var metalsmith = Metalsmith('test/fixtures/pattern');
    metalsmith
      .use(collections({
        articles: '*.md'
      }))
      .build(function(err, files){
        if (err) return done(err);
        assert.equal(files['three.md'].collection, 'articles');
        done();
      });
  });

  it('should accept a "sortBy" option', function(done){
    var metalsmith = Metalsmith('test/fixtures/sort');
    metalsmith
      .use(collections({ articles: { sortBy: 'title' }}))
      .build(function(err){
        if (err) return done(err);
        var articles = metalsmith.metadata().articles;
        assert.equal('Alpha', articles[0].title);
        assert.equal('Beta', articles[1].title);
        assert.equal('Gamma', articles[2].title);
        done();
      });
  });

  it('should accept a "sortBy" function', function(done){
    var metalsmith = Metalsmith('test/fixtures/sort');
    metalsmith
      .use(collections({ articles: { sortBy: sort }}))
      .build(function(err){
        if (err) return done(err);
        var articles = metalsmith.metadata().articles;
        assert.equal('Gamma', articles[0].title);
        assert.equal('Beta', articles[1].title);
        assert.equal('Alpha', articles[2].title);
        done();
      });

    function sort(a, b){
      a = a.title.slice(1);
      b = b.title.slice(1);
      return a > b ? 1 : -1;
    }
  });

  it('should accept a "reverse" option', function(done){
    var metalsmith = Metalsmith('test/fixtures/sort');
    metalsmith
      .use(collections({
        articles: {
          sortBy: 'title',
          reverse: true
        }
      }))
      .build(function(err){
        if (err) return done(err);
        var articles = metalsmith.metadata().articles;
        assert.equal('Alpha', articles[2].title);
        assert.equal('Beta', articles[1].title);
        assert.equal('Gamma', articles[0].title);
        done();
      });
  });

  it('should add next and previous references', function(done){
    var metalsmith = Metalsmith('test/fixtures/references');
    metalsmith
      .use(collections({ articles: {}}))
      .build(function(err){
        if (err) return done(err);
        var articles = metalsmith.metadata().articles;
        assert(!articles[0].previous);
        assert.equal(articles[0].next, articles[1]);
        assert.equal(articles[1].previous, articles[0]);
        assert.equal(articles[1].next, articles[2]);
        debugger;
        assert.equal(articles[2].previous, articles[1]);
        assert(!articles[2].next);
        done();
      });
  });

  it('should not fail with empty collections', function(done) {
    var metalsmith = Metalsmith('test/fixtures/empty');
    metalsmith
      .use(collections({
        articles: {
          sortBy: 'date',
          reverse: true
        }
      }))
      .build(function(err) {
        if (err) return done(err);
        var articles = metalsmith.metadata().articles;
        assert.equal(articles.length, 0);
        done();
      });
  });

  it('should add metadata objects to collections', function (done) {
    var metalsmith = Metalsmith('test/fixtures/basic');
    metalsmith
      .use(collections({
        articles: {
          metadata: { name: 'Batman' }
        }
      }))
      .build(function(err){
        if (err) return done(err);
        var m = metalsmith.metadata();
        assert.equal('Batman', m.articles.metadata.name);
        done();
      });
  });

  it('should load collection metadata from a JSON file', function (done) {
    var metalsmith = Metalsmith('test/fixtures/basic');
    metalsmith
      .use(collections({
        articles: {
          metadata: 'test/fixtures/metadata/metadata.json'
        }
      }))
      .build(function(err){
        if (err) return done(err);
        var m = metalsmith.metadata();
        assert.equal('Batman', m.articles.metadata.name);
        done();
      });
  });

  it('should load collection metadata from a YAML file', function (done) {
    var metalsmith = Metalsmith('test/fixtures/basic');
    metalsmith
      .use(collections({
        articles: {
          metadata: 'test/fixtures/metadata/metadata.yaml'
        }
      }))
      .build(function(err){
        if (err) return done(err);
        var m = metalsmith.metadata();
        assert.equal('Batman', m.articles.metadata.name);
        done();
      });
  });

  it('should allow multiple collections', function (done) {
    var metalsmith = Metalsmith('test/fixtures/multi');
    metalsmith
      .use(collections({ articles: {}, posts: {}, drafts: {} }))
      .build(function(err){
        if (err) return done(err);
        var m = metalsmith.metadata();
        assert.equal(2, m.articles.length);
        assert.equal(1, m.drafts.length);
        assert.equal(1, m.posts.length);
        assert.equal(m.collections.articles, m.articles);
        assert.equal(m.collections.drafts, m.drafts);
        assert.equal(m.collections.posts, m.posts);
        done();
      });
  });

});
