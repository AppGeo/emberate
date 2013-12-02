var loom = require('loom');
var render = require('../helpers/render');

describe('route', function() {

  it('renders the template correctly', function(done) {
    var locals = { objectName: 'TacoCartRoute' };
    render('app/routes/route.js.hbs', locals, function(expected) {
      loom('-sq route taco_cart', function(env) {
        env.out.should.equal(expected);
        done();
      });
    });
  });

});


