var path = require('path');
var parent = require('./default');
var componentize = require('../../lib/componentize_template');
var validateComponent = require('../../lib/validate_component');
var generator = module.exports = Object.create(parent);
var app = parent.appPath;

generator.before = function(next, env) {
  parent.before(function() {
    if (isComponent(env.rawName)) {
      validateComponent(env.rawName);
    }
    next();
  }, env);
};

generator.template = function(next, env) {
  if (isComponent(env.rawName)) {
    next(app+'/templates/components/component.hbs.hbs');
  } else {
    next(app+'/templates/template.hbs.hbs');
  }
};

generator.savePath = function(next, env, template) {
  if (isComponent(env.rawName)) {
    var name = env.args[0].replace(/components\//, '');
    next(componentize(path.dirname(template)+'/'+name+'.hbs'));
  } else {
    parent.savePath(next, env, template);
  }
};

function isComponent(name) {
  return name.match(/^components\//);
}

