var through = require('through2');
var order = [
  'initializer',
  'helper',
  'mixin',
  'transform',
  'serializer',
  'adapter',
  'model',
  'component',
  'controller',
  'route',
  'view'
];

module.exports = function () {
  var out = {};
  return through.obj(function (chunk, _, next) {
    if (!(chunk.cat in out)) {
      out[chunk.cat] = [];
    }
    out[chunk.cat].push(chunk);
    next();
  }, function (next) {
    this.push(true);
    order.forEach(function (item) {
      if (item in out && Array.isArray(out[item])) {
        this.push(out[item]);
      }
    }, this);
    next();
  });
};
