var generator = require('../../loom/generators/index');
var stubIndex = require('../helpers/stub_index');

describe('default generator', function() {
  describe('savePath', function() {
    it('saves to the right place', function(done) {
      generator.savePath(function(path) {
        path.should.equal('app/.index.js');
        done();
      });
    });
  });

  describe('present', function() {
    it('returns all modules and helpers', function(done) {
      var stub = stubIndex();
      generator.present(function(locals) {
        locals.should.eql({
          modules: [
            {name: 'ApplicationController', path: './controllers/application'},
            {name: 'FooBarBazQuxController', path: './controllers/foo/bar/baz-qux'}
          ],
          helpers: [{path: './helpers/capitalize'}]
        });
        stub.restore();
        done();
      });
    });
  });
});

