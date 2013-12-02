var loom = require('loom');
var render = require('../helpers/render');
var msg = require('loom/lib/message');
var sinon = require('sinon');

describe('component', function() {

  it('renders the template correctly', function(done) {
    var locals = {objectName: 'XFooComponent'};
    render('app/components/component.js.hbs', locals, function(component) {
      render('app/templates/components/component.hbs.hbs', locals, function(template) {
        loom('-sq component x-foo', function(env) {
          env.out.should.equal(component + template);
          done();
        });
      });
    });
  });

  it('requires a - in the component name', function(done) {
    var mock = sinon.mock(msg);
    mock.expects('error').once();
    loom('-sq component foo', function(env) {
      mock.verify();
      mock.restore();
      done();
    });
  });

});


