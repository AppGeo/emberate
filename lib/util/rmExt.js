var path = require('path');
var fixPathSep = require('./fixPathSep');

module.exports = function(str) {
  var result = path.join(path.dirname(str), path.basename(str, path.extname(str)));
  return fixPathSep(result);
}
