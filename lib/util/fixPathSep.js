var path = require('path');

module.exports = function(p) {
  return path.sep === '\\' ? p.split(path.sep).join('/') : p;
}
