var through = require('through2');
var handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');

module.exports = function (options) {
  var called = 0;
  var template;
  var things = {
    modules: [],
    appName: options.appName
  };

  return through.obj(function (chunk, _, next) {
    if(!Array.isArray(chunk)) {
      fs.readFile(options.templatePath, { encoding: 'utf8' }, function (err, resp) {
        if (err) {
          return next(err);
        }

        template = handlebars.compile(resp);
        next();
      });
    } else {
      if (chunk[0].cat === 'helper') {
        things.helpers = chunk;
      } else {
        things.modules = things.modules.concat(chunk);
      }

      next();
    }
  }, function (next) {
    this.push(template(things));
    next();
  });
};
