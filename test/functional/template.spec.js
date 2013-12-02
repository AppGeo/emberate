var loom = require('loom');
var render = require('../helpers/render');
var msg = require('loom/lib/message');
var sinon = require('sinon');

describe('template', function() {

  it('renders the template correctly', function(done) {
    var locals = {objectName: 'User'};
    render('app/templates/template.hbs.hbs', locals, function(expected) {
      loom('-sq template user', function(env) {
        env.out.should.equal(expected);
        done();
      });
    });
  });

  it('requires a - in a component name', function(done) {
    var mock = sinon.mock(msg);
    mock.expects('error').once();
    loom('-sq template components/foo', function() {
      mock.verify();
      mock.restore();
      done();
    });
  });

});


