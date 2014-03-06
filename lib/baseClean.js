var through = require('through2');
var path = require("path");

module.exports = function (base) {
  var fullBase = path.resolve(base);
  return through.obj(function(chunk, _, next) {
    this.push(path.relative(fullBase, chunk));
    next();
  });
}