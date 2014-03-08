var path = require('path');

module.exports = function(str) {
  return path.join(path.dirname(str), path.basename(str, path.extname(str)));
};
