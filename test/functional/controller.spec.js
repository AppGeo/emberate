var loom = require('loom');
var render = require('../helpers/render');
var msg = require('loom/lib/message');
var sinon = require('sinon');

describe('controller', function() {

  it('renders regular controllers', function(done) {
    var locals = {objectName: 'ApplicationController'};
    render('app/controllers/controller.js.hbs', locals, function(expected) {
      loom('-sq controller application type:n', function(env) {
        env.out.should.equal(expected);
        done();
      });
    });
  });

  it('renders object controllers', function(done) {
    var locals = {objectName: 'ApplicationController', type: 'Object'};
    render('app/controllers/controller.js.hbs', locals, function(expected) {
      loom('-sq controller application type:object', function(env) {
        env.out.should.equal(expected);
        done();
      });
    });
  });

  it('renders array controllers', function(done) {
    var locals = {objectName: 'ApplicationController', type: 'Array'};
    render('app/controllers/controller.js.hbs', locals, function(expected) {
      loom('-sq controller application type:array', function(env) {
        env.out.should.equal(expected);
        done();
      });
    });
  });

  it('prompts for controller type if not specified', function(done) {
    var prompt = msg.prompt;
    msg.prompt = function(q, cb) { cb('object'); };
    var locals = {objectName: 'ApplicationController', type: 'Object'};
    render('app/controllers/controller.js.hbs', locals, function(expected) {
      loom('-sq controller application', function(env) {
        env.out.should.equal(expected);
        msg.prompt = prompt;
        done();
      });
    });
  });

});


