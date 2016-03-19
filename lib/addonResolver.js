'use strict';

var fs = require('fs');
var path = require('path');
var readJson = require('read-json-sync');
var CombinedStream = require('combined-stream');
var spider = require('spider-stream');

module.exports = function(options) {
  var stream = CombinedStream.create();
  var moduleList = fs.readdirSync('node_modules');
  moduleList.forEach(function (moduleName) {
    var modulePath = path.resolve(path.join('node_modules', moduleName));
    try {
      var data = readJson(path.join(modulePath, 'package.json'));
    } catch (err) {
      return;
    }
    if (isAddon(data)) {
      options.addonList.push(moduleName);
      var addonPath = path.resolve(path.join(modulePath, 'addon'));
      crawlPath(stream, addonPath);
      var addonAppPath = path.resolve(path.join(modulePath, 'app'));
      crawlPath(stream, addonAppPath);
    }
  });
  return stream;
}

function isAddon(data) {
  try {
    return data.keywords.indexOf('ember-addon') !== -1;
  } catch (err) {
    return false;
  }
}

function crawlPath(returnStream, path) {
  try {
    fs.accessSync(path, fs.F_OK);
    returnStream.append(spider(path));
  } catch (e) { /* noop */ }
}
