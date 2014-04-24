var baseClean = require('./baseClean');
var spider = require('spider-stream');
var inflector = require('./inflectStream');
var orderStream = require('./orderStream');
var templateStream = require('./templateStream');

module.exports = function (path, appName, templatePath) {
  var options;

  if (typeof appName !== 'object') {
    options = {
      appName: appName || 'App',
      templatePath: templatePath,
      pods: false
    }; 
  }

  path = path || process.cwd();

  return spider(path)
    .pipe(baseClean(path))
    .pipe(inflector(options))
    .pipe(orderStream())
    .pipe(templateStream(options));
};
