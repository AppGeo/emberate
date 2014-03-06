var through = require('through2');
var handlebars = require('handlebars');
var header = [
  "require('ember'); // get Ember global around for the templates",
  "require('./.templates');",
  "var routes = require('./config/routes');",
  "var App = require('./config/application');",
  "App.Router.map(routes);"
].join('\n');
var footer = 'module.exports = App;'
var helperTemp = handlebars.compile("require('{{path}}')");
var mainTemp = handlebars.compile("App.{{name}} = require('{{path}}')");
module.exports = function () {
  var called = 0;
  return through.obj(function (chunk, _, next) {
    if (!called++) {
      this.push(header);
    }
    this.push('\n');
    if (chunk.cat === 'helper') {
      this.push(helperTemp(chunk));
    } else {
      this.push(mainTemp(chunk));
    }
    next();
  }, function (next) {
    this.push('\n');
    this.push(footer);
    next();
  });
};