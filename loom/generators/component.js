var componentize = require('../../lib/componentize_template');
var validateComponent = require('../../lib/validate_component');
var parent = require('./default');
var path = require('path');
var generator = module.exports = Object.create(parent);
var app = generator.appPath;

generator.before = function(next, env) {
  parent.before(function() {
    validateComponent(env.rawName);
    next();
  }, env);
};

generator.templates = [
  app+'/components/component.js.hbs',
  app+'/templates/components/component.hbs.hbs'
];

generator.savePath = function(next, env, template) {
  parent.savePath(function(savePath) {
    next(isTemplate(savePath) ? componentize(savePath) : savePath);
  }, env, template);
};

function isTemplate(savePath) {
  return path.extname(savePath) === '.hbs';
}

