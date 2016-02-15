'use strict';

var through = require('through2');
var path = require('path');

var isAddon = /node_modules\/.*\/app/i;

module.exports = function (base) {
  var fullBase = path.resolve(base);

  return through.obj(function(chunk, _, next) {
    var relative = path.relative(fullBase, chunk);
    if (isAddon.test(relative)) {
      relative = correctAddonPath(relative);
    }

    this.push(relative);
    next();
  });
};

function correctAddonPath(relativePath) {
  var parts = relativePath.split('/');
  var newPath = parts.slice(parts.indexOf('node_modules')+1);
  newPath.unshift('ember-addon');
  return newPath.join('/');
}
