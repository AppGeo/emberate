var rmExt = require('./rmExt');
var fixPathSep = require('./fixPathSep');

module.exports = function(pathName) {
  pathName = /\.hbs$/i.test(pathName) ? fixPathSep(pathName) : rmExt(pathName);
  return './' + pathName;
}
