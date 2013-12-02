var generator = require('../../loom/generators/template');
var sinon = require('sinon');
var msg = require('loom/lib/message');

describe('template generator', function() {
  describe('before', function() {
    it('validates whether or not its a component', function() {
      var mock = sinon.mock(msg);
      mock.expects('error').once().withArgs("Components must have a '-' character");
      var env = { args: ['components/foo'], rawName: 'components/foo' };
      generator.before(function() {}, env);
      mock.verify();
      mock.restore();
    });
  });

  describe('template', function() {
    it('returns the component template for components', function(done) {
      generator.template(function(template) {
        template.should.equal('app/templates/components/component.hbs.hbs');
        done();
      }, {rawName: 'components/x-foo'});
    });

    it('returns the template template for non-components', function(done) {
      generator.template(function(template) {
        template.should.equal('app/templates/template.hbs.hbs');
        done();
      }, {rawName: 'foo'});
    });
  });

  describe('savePath', function() {

    it('saves component templates to the right place', function(done) {
      var env = { args: ['components/x_foo'], rawName: 'components/x-foo', name: 'template'};
      generator.template(function(template) {
        generator.savePath(function(path) {
          path.should.equal('app/templates/components/x-foo.hbs');
          done();
        }, env, template);
      }, env);
    });

    it('saves templates to the right place', function(done) {
      var env = { args: ['foo_bar'], rawName: 'foo_bar', name: 'template'};
      generator.template(function(template) {
        generator.savePath(function(path) {
          path.should.equal('app/templates/foo_bar.hbs');
          done();
        }, env, template);
      }, env);
    });
  });
});


