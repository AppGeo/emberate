var loom = require('loom');
var render = require('../helpers/render');

describe('helper', function() {

  it('renders the template correctly', function(done) {
    var locals = { helperName: 'capitalize' };
    render('app/helpers/helper.js.hbs', locals, function(expected) {
      loom('-sq helper capitalize', function(env) {
        env.out.should.equal(expected);
        done();
      });
    });
  });

});

