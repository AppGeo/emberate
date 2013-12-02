var generator = require('../../loom/generators/controller');
var msg = require('loom/lib/message');
var sinon = require('sinon');

describe('controller generator', function() {

  describe('present', function() {
    it('prompts for controller type if not provided', function(done) {
      var env = { args: ['application'], name: 'controller', params: {} };
      var prompt = msg.prompt;
      msg.prompt = function(q, cb) { cb('array') };
      generator.present(function(locals) {
        locals.should.eql({
          objectName: 'ApplicationController',
          params: {},
          type: 'Array'
        });
        msg.prompt = prompt;
        done();
      }, env);
    });

    it('uses controller type if provided', function(done) {
      var env = {
        args: ['application'],
        params: { type: 'array' },
        name: 'controller'
      };
      generator.present(function(locals) {
        locals.should.eql({
          objectName: 'ApplicationController',
          params: {type: 'array'},
          type: 'Array'
        });
        done();
      }, env);
    });
  });
});

