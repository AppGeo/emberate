var rmExt = require('./rmExt');
var fixPathSep = require('./fixPathSep');
var path = require('path');
var isAddon = require('./isAddon');

module.exports = function(pathName, options) {
  pathName = /\.hbs$/i.test(pathName) ? fixPathSep(pathName) : rmExt(pathName);
  if (isAddon(pathName)) {
    pathName = pathName.replace('ember-addon:', '');
    return path.relative(path.resolve(options.rootPath), pathName);
  } else {
    return './' + pathName;
  }
}
