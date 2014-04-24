var path = require('path');
var extend = require('extend');
var spider = require('spider-stream');
var baseClean = require('./baseClean');
var inflector = require('./inflectStream');
var orderStream = require('./orderStream');
var templateStream = require('./templateStream');

module.exports = function (rootPath, appName, templatePath) {
  var options;
  var defaultPath = path.join(__dirname, './defaultTemplate.hbs');
  var defaultOptions = {
    appName: 'App',
    templatePath: defaultPath,
    pods: false
  };

  // TODO: remove backwards compat for 1.0
  if (typeof appName !== 'object') {
    options = extend(true, defaultOptions, {
      appName: typeof appName === 'string' ? appName : 'App',
      templatePath: templatePath
    });
  }
  else {
    // appName is actually the `options` hash
    options = extend(true, defaultOptions, appName);
  }

  // Use pods template if pods: true
  if (options.pods) {
    options.templatePath = path.join(__dirname, './podsTemplate.hbs');  
  }

  rootPath = rootPath || process.cwd();

  return spider(rootPath)
    .pipe(baseClean(rootPath))
    .pipe(inflector(options))
    .pipe(orderStream(options.pods))
    .pipe(templateStream(options));
};
