'use strict';

var through = require('through2');
var path = require('path');
var isModulable = require('./isModulable');

module.exports = function(base) {
  var fullBase = path.resolve(base);

  return through.obj(function(chunk, _, next) {
    var relativePath = path.relative(fullBase, chunk);

    if (isModulable(relativePath)) {
      this.push(relativePath);
    }

    next();
  });
};
