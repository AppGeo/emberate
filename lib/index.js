'use strict';

var fs = require('fs');
var path = require('path');
var extend = require('extend');
var spider = require('spider-stream');
var fileStream = require('./util/fileStream');
var nameStream = require('./util/nameStream');
var templateStream = require('./util/templateStream');
var addonResolver = require('./addonResolver');

module.exports = function (rootPath, userOptions, templatePath) {
  var defaultPath = path.join(__dirname, 'defaultTemplate.hbs');
  var defaultOptions = {
    appName: 'App',
    templatePath: defaultPath,
    addonPath: 'emberate-addons',
    addonSupport: false,
    modulePrefix: 'app',
    debug: true,
    debugAdapterPath: 'emberate/vendor/container-debug-adapter.js',
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

  options.rootPath = rootPath || process.cwd();
  options.addonList = [];

  /* istanbul ignore next */
  function logError(error) {
    console.log(error.message);
    console.log(error.stack);
    console.trace(error);
    this.emit('end');
  }

  var out;
  if (options.addonSupport) {
    out = addonResolver(options)
    .on('error', logError)
    .append(spider(options.rootPath))
    .pipe(fileStream(options))
    .pipe(nameStream(options))
    .pipe(templateStream(options));
  } else {
    out = spider(options.rootPath)
    .pipe(fileStream(options))
    .pipe(nameStream(options))
    .pipe(templateStream(options));
  }

  if (callback) {
    out.pipe(fs.createWriteStream(options.outPath))
      .on('error', callback)
      .on('finish', callback.bind(null, null));
  } else {
    return out;
  }
};
