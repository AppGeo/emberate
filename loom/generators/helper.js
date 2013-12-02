var inflector = require('../../lib/inflector');
var defaultGenerator = require('./default');

var generator = module.exports = Object.create(defaultGenerator);

generator.present = function(next, env) {
  next({
    helperName: inflector.camelize(env.args[0])
  });
};

