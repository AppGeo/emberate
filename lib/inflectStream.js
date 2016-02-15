'use strict';

var path = require('path');
var through = require('through2');
var inflector = require('./inflector');
var rmExt = require('./rmExt');

module.exports = function (options) {
  return through.obj(function(chunk, _, next) {
    var inf = inflector(chunk, options);

    if (!inf) {
      return next();
    }

    this.push({
      path: inf.location || buildPath(chunk),
      name: inf.name,
      cat: inf.cat,
      isTemplate: (inf.cat === 'template')
    });

    next();
  });
};

function fixPathSep(p) {
  return path.sep === '\\' ? p.split(path.sep).join('/') : p;
}

function buildPath(chunk) {
  return './' + (chunk.indexOf('.hbs') === -1 ? rmExt(chunk) : fixPathSep(chunk));
}
