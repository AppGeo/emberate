'use strict';

var fs = require('fs');
var path = require('path');
var through = require('through2');
var handlebars = require('handlebars');
var assign = require('./assign');

module.exports = function (options) {
  var things = assign(options, {
    modules: [],
  });
  var template = fs.readFileSync(options.templatePath, { encoding: 'utf8' });
  var compiled = handlebars.compile(template);

  return through.obj(function (chunk, _, next) {
    if (/\//i.test(chunk.name) || chunk.name === 'router') {
      things.modules.push(chunk);
    }
    next();
  }, function (next) {
    this.push(compiled(things));
    next();
  });
};
