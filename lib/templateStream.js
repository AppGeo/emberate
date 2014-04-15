var through = require('through2');
var handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');
var defaultPath = path.join(__dirname, './defaultTemplate.hbs');

module.exports = function (appName, customTemplate) {
  var called = 0;
  var templatePath;
  var template;
  var things = {
    modules: [],
    appName: appName
  };

  if (customTemplate) {
    templatePath = path.join(process.cwd(), customTemplate);
  } else {
    templatePath = defaultPath;
  }

  return through.obj(function (chunk, _, next) {
    if (!called++) { 
      if (chunk.name === 'helpers') {
        things.helpers = chunk.data;
      } else {
        things.modules = things.modules.concat(chunk.data);
      }

      fs.readFile(templatePath, { encoding: 'utf8' }, function (err, resp) {
        if (err) {
          return next(err);
        }
        template = handlebars.compile(resp);
        next();
      });
    } else {
      things.modules = things.modules.concat(chunk.data);
      next();
    }
  }, function (next) {
    this.push(template(things));
    next();
  });
};
