var through = require('through2');
var inflector = require('./inflector');
var rmExt = require('./rmExt');
var path = require('path');

module.exports = function () {
  return through.obj(function(chunk, _, next) {
    var inf = inflector(chunk);

    if (!inf) {
      return next();
    }

    this.push({
      path: './' + rmExt(chunk),
      name: inf.name,
      cat: inf.cat
    });
    next();
  });
};
