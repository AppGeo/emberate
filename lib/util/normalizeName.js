var path = require('path');
var rmExt = require('./rmExt');
var isAddon = require('./isAddon');

module.exports = function(name, options) {
  name = rmExt(name);
  var namespace = options.modulePrefix;
  if (isAddon(name)) {
    // Preserve the addon's namespace in the name if the file
    // is located in the 'addon' directory
    if (/^ember\-addon\:.+\/addon\//i.test(name)) {

      var basePath = 'ember-addon:'+path.resolve(options.addonPath)+'/';
      name = name.replace(basePath, '');
      var parts = name.split('/');
      namespace = parts.shift();
      // remove the 'addon' segment of the path
      parts.shift();
      name = parts.join('/');
    } else {
      name = name.replace(/^ember\-addon\:.+\/app\//i, '');
    }
  }
  if (/^components\/.+\/template$/i.test(name)) {
    name = 'templates/'+name.replace(/\/template$/i, '');
  } else if (/^components\/.+\/component$/i.test(name)) {
    name = name.replace(/\/component$/i, '');
  }
  return namespace+'/'+name;
}
