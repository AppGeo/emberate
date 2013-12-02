var loom = require('loom');
var render = require('../helpers/render');

describe('mixin', function() {

  it('renders the template correctly', function(done) {
    var locals = { objectName: 'TacoCartable' };
    render('app/mixins/mixin.js.hbs', locals, function(expected) {
      loom('-sq mixin taco_cartable', function(env) {
        env.out.should.equal(expected);
        done();
      });
    });
  });

});

