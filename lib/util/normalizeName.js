var rmExt = require('./rmExt');

module.exports = function(name) {
  name = rmExt(name);
  if (/^components\/.+\/template$/i.test(name)) {
    name = 'templates/'+name.replace(/\/template$/i, '');
  } else if (/^components\/.+\/component$/i.test(name)) {
    name = name.replace(/\/component$/i, '');
  }
  return name;
}
