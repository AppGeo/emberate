'use strict';

var fs = require('fs');
var path = require('path');
var extend = require('extend');
var spider = require('spider-stream');
var addonResolver = require('./addonResolver');
var baseClean = require('./baseClean');
var inflector = require('./inflectStream');
var orderStream = require('./orderStream');
var templateStream = require('./templateStream');

module.exports = function (rootPath, userOptions, templatePath) {
  var defaultPath = path.join(__dirname, 'defaultTemplate.hbs');
  var defaultOptions = {
    appName: 'App',
    templatePath: defaultPath,
    podModulePrefix: 'pods'
  };
  var options = extend(true, defaultOptions, userOptions);
  var callback;

  if (typeof arguments[arguments.length - 1] === 'function'
    && options.outPath) {
    callback = arguments[arguments.length - 1];
  }

  rootPath = rootPath || process.cwd();

  var out = addonResolver().append(spider(rootPath))
    .pipe(baseClean(rootPath, options))
    .pipe(inflector(options))
    .pipe(orderStream(options))
    .pipe(templateStream(options));

  if (callback) {
    out.pipe(fs.createWriteStream(options.outPath))
      .on('error', callback)
      .on('finish', callback.bind(null, null));
  } else {
    return out;
  }
};
