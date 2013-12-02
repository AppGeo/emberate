var generator = require('../../loom/generators/default');
var sinon = require('sinon');
var msg = require('loom/lib/message');

describe('default generator', function() {
  describe('before', function() {
    it('dasherizes the name of the resource and saves the original', function(done) {
      var env = { args: ['foo_bar'], name: 'controller' };
      generator.before(function() {
        env.should.eql({
          args: ['foo-bar'],
          name: 'controller',
          rawName: 'foo_bar'
        });
        done();
      }, env);
    });

    it('requires a resource name', function() {
      var mock = sinon.mock(msg);
      mock.expects('error').once();
      generator.before(function() {}, { args: [], name: 'controller' });
      mock.verify();
      mock.restore();
    });
  });

  describe('present', function() {
    it('inflects the resource name to an ember object name', function(done) {
      var env = { args: ['taco_cart'], name: 'model' };
      generator.present(function(locals) {
        locals.objectName.should.equal('TacoCart');
        done();
      }, env)
    });

    it('appends object types to objectName', function(done) {
      var env = { args: ['taco_cart'] };
      env.name = 'component';
      generator.present(function(locals) {
        locals.objectName.should.equal('TacoCartComponent');
        done();
      }, env)
    });
  });

  describe('template', function() {
    it('finds the right template for appendable object types', function(done) {
      var env = {name: 'controller'};
      generator.template(function(template) {
        template.should.equal('app/controllers/controller.js.hbs');
        done();
      }, env);
    });

    it('finds the right template for non-appendable object types', function(done) {
      var env = {name: 'model'};
      generator.template(function(template) {
        template.should.equal('app/models/model.js.hbs');
        done();
      }, env);
    });
  });
});
