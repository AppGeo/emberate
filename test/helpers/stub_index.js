var sinon = require('sinon');
var glob = require('glob');

module.exports = function() {
  var stub = sinon.stub(glob, 'sync');
  stub.returns([]);
  stub.withArgs('app/helpers/**/*.js').returns([
    'app/helpers/capitalize.js'
  ]);
  stub.withArgs('app/controllers/**/*.js').returns([
    'app/controllers/application.js',
    'app/controllers/foo/bar/baz-qux.js'
  ]);
  return stub;
};

