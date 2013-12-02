var loom = require('loom');
var render = require('../helpers/render');
var stubIndex = require('../helpers/stub_index');

describe('index build', function() {
  it('renders the template correctly', function(done) {
    var stub = stubIndex();
    var locals = {
      modules: [
        { path: './controllers/application', name: 'ApplicationController' },
        { path: './controllers/foo/bar/baz-qux', name: 'FooBarBazQuxController' }
      ],
      helpers: [{ path: './helpers/capitalize' }]
    };
    render('build/index.js.hbs', locals, function(index) {
      loom('-sq index', function(env) {
        env.out.should.equal(index);
        stub.restore();
        done();
      });
    });
  });

});


