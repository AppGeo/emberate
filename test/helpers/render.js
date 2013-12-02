var hbs = require('loom-engine-hbs');
var fs = require('fs');

module.exports = function(template, locals, callback) {
  var path = __dirname+'/../../loom/templates/'+template;
  var src = fs.readFileSync(path).toString();
  hbs(src, locals, callback);
};

