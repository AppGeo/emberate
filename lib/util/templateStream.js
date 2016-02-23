'use strict';

var fs = require('fs');
var through = require('through2');
var handlebars = require('handlebars');
var extend = require('extend');

var blacklisted = ['app', 'index'];

module.exports = function (options) {
  var things = extend(options, {
    modules: [],
  });
  var template = fs.readFileSync(options.templatePath, { encoding: 'utf8' });
  var compiled = handlebars.compile(template);

  return through.obj(function (chunk, _, next) {
    things.modules.push(chunk);
    next();
  }, function (next) {
    things.modules.sort(function(a, b) {return a.name < b.name ? -1 : 1;});

    this.push(compiled(things));
    next();
  });
};
