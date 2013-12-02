var genericGenerator = require('loom/lib/generic_generator');
var inflector = require('../../lib/inflector');
var msg = require('loom/lib/message');

var generator = module.exports = Object.create(genericGenerator);

var app = generator.appPath = 'app';

generator.before = function(next, env) {
  if (!env.args.length) {
    msg.error("You must specify a resource name, ie 'generate "+env.name+" user'");
  } else {
    env.rawName = env.args[0];
    env.args[0] = inflector.dasherize(env.args[0]);
    next();
  }
};

generator.present = function(next, env) {
  var params = env.params;
  var name = env.args[0];
  if (appendable(env.name)) {
    name += '-'+env.name;
  }
  next({
    objectName: inflector.objectify(name),
    params: params
  });
};

generator.template = function(next, env) {
  var plural = inflector.pluralize(env.name);
  next(app+'/'+plural+'/'+env.name+'.js.hbs');
};

function appendable(generatorName) {
  var types = [
    'adapter',
    'component',
    'controller',
    'route',
    'serializer',
    'view'
  ];
  return types.indexOf(generatorName) > -1;
}

