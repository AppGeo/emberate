'use strict';

var through = require('through2');
var path = require('path');
var isModulable = require('./isModulable');
var copyAddonFile = require('./copyAddonFile');

module.exports = function(options) {
  var nodeFolder = path.resolve('node_modules');
  var fullBase = path.resolve(options.rootPath);

  return through.obj(function(chunk, _, next) {
    var relativePath = path.relative(fullBase, chunk);
    if (chunk.indexOf(nodeFolder) !== -1) {
      // we don't want blueprints
      if (!/\/blueprints\//i.test(chunk) && !/\/styles\//i.test(chunk)) {
        var self = this;
        copyAddonFile(chunk, options, function(newPath) {
          self.push('ember-addon:'+newPath);
          next();
        });
      } else {
        next();
      }
    } else if (isModulable(relativePath)) {
      this.push(relativePath);
      next();
    } else {
      next();
    }
  });
};
