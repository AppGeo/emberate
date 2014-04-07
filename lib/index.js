var baseClean = require('./baseClean');
var spider = require('spider-stream');
var inflector = require('./inflectStream');
var orderStream = require('./orderStream');
var templateStream = require('./templateStream');

module.exports = function (path, appName, templatePath) {
  path = path || process.cwd();

  return spider(path)
    .pipe(baseClean(path))
    .pipe(inflector())
    .pipe(orderStream())
    .pipe(templateStream(appName || 'App', templatePath));
};