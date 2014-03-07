var through = require('through2');
var handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');
var defaultPath = path.join(__dirname, './defaultTemplate.hbs');
module.exports = function (customTemplate) {
  var called = 0;
  var templatePath;
  if (customTemplate) {
    templatePath = path.join(process.cwd(), customTemplate);
  } else {
    templatePath = defaultPath;
  }
  var template;
  var things = {modules:[]};
  return through.obj(function (chunk, _, next) {
    if (!called++) {
      things.helpters = chunk;
      fs.readFile(templatePath, {encoding: 'utf8'}, function (err, resp) {
        if (err) {
          return next(err);
        }
        template = handlebars.compile(resp);
        next();
      });
    } else {
      things.modules = things.modules.concat(chunk);
      next();
    }
  }, function (next) {
    this.push(template(things));
    next();
  });
};