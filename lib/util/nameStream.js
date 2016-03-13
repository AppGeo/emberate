'use strict';

var through = require('through2');
var normalizeName = require('./normalizeName');
var normalizePath = require('./normalizePath');

module.exports = function(options) {
  return through.obj(function(chunk, _, next) {
    var data = {
      path: normalizePath(chunk, options),
      name: normalizeName(chunk, options)
    };
    this.push(data);
    next();
  });
};
