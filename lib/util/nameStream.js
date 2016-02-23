'use strict';

var through = require('through2');
var normalizeName = require('./normalizeName');
var normalizePath = require('./normalizePath');

module.exports = function() {
  return through.obj(function(chunk, _, next) {
    this.push({
      path: normalizePath(chunk),
      name: normalizeName(chunk)
    });

    next();
  });
};
