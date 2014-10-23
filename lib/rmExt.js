'use strict';

var path = require('path');

module.exports = function(str) {
  var result = path.join(path.dirname(str), path.basename(str, path.extname(str)));
  return path.sep === '\\' ? result.split(path.sep).join('/') : result;
};
