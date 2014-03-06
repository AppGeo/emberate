var baseClean = require('./baseClean');
var spider = require('./spiderStream');
var inflector = require('./inflectStream');
var orderStream = require('./orderStream');
var templateStream = require('./templateStream');
module.exports = function (path) {
  return spider(path).pipe(baseClean(path)).pipe(inflector()).pipe(orderStream()).pipe(templateStream());
}