var through = require('through2');
var inflector = require('./inflector');
var rmExt = require('./rmExt');
var path = require('path');

module.exports = function (options) {
  return through.obj(function(chunk, _, next) {
    var inf = inflector(chunk, options.pods);

    if (!inf) {
      return next();
    }

    this.push({
      path: './' + (chunk.indexOf('.hbs') === -1 ? rmExt(chunk) : chunk),
      name: inf.name,
      cat: inf.cat
    });
    next();
  });
};
