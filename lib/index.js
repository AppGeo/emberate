'use strict';

var fs = require('fs');
var path = require('path');
var extend = require('extend');
var spider = require('spider-stream');
var fileStream = require('./util/fileStream');
var nameStream = require('./util/nameStream');
var templateStream = require('./util/templateStream');

module.exports = function (rootPath, userOptions, templatePath) {
  var defaultPath = path.join(__dirname, 'defaultTemplate.hbs');
  var defaultOptions = {
    appName: 'App',
    templatePath: defaultPath,
    modulePrefix: 'app',
    podModulePrefix: 'app/pods',
    loaderPath: 'emberate/lib/vendor/loader.js',
    resolverPath: 'emberate/vendor/resolver.js'
  };
  var options = extend(true, defaultOptions, userOptions);
  var callback;

  if (typeof arguments[arguments.length - 1] === 'function'
    && options.outPath) {
    callback = arguments[arguments.length - 1];
  }

  rootPath = rootPath || process.cwd();

  var out = spider(rootPath)
    .pipe(fileStream(rootPath))
    .pipe(nameStream())
    .pipe(templateStream(options));

  if (callback) {
    out.pipe(fs.createWriteStream(options.outPath))
      .on('error', callback)
      .on('finish', callback.bind(null, null));
  } else {
    return out;
  }
};
