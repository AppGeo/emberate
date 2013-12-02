var loom = require('loom');
var render = require('../helpers/render');

describe('view', function() {

  it('renders the template correctly', function(done) {
    var locals = { objectName: 'TacoCartView' };
    render('app/views/view.js.hbs', locals, function(expected) {
      loom('-sq view taco_cart', function(env) {
        env.out.should.equal(expected);
        done();
      });
    });
  });

});



