var generator = require('../../loom/generators/helper');

describe('helper generator', function() {
  describe('present', function() {
    it('sets resource name to camelCase', function(done) {
      generator.present(function(locals) {
        locals.helperName.should.equal('fooBar');
        done();
      }, { args: ['foo-bar']});
    });
  });
});

