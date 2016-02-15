'use strict';

var fs = require('fs');
var path = require('path');
var CombinedStream = require('combined-stream');
var spider = require('spider-stream');

module.exports = function () {
  var stream = CombinedStream.create();
  var moduleList = fs.readdirSync('node_modules');
  moduleList.forEach(function (moduleName) {
    var modulePath = path.join('node_modules', moduleName);
    try {
      var data = require(path.join(moduleName, 'package.json'));
    } catch (err) {
      return;
    }
    if (isAddon(data)) {
      var addonPath = path.join(modulePath, 'app');
      stream.append(spider(path.resolve(addonPath)));
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
