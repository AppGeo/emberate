/**
 * This file is auto-generated, by Emberate
 * (https://www.npmjs.org/package/emberate)
 *
 * DO NOT MODIFY
 */
'use strict';
var loader = require('emberate/lib/vendor/loader.js');
var define = loader.define;

var Ember = require('ember');
var appOpts = require('./app');

function es6RequireShim(obj) { return obj && obj.__esModule ? obj.default : obj; }

define("ember/resolver", [], function() {
  return es6RequireShim(require('emberate/vendor/resolver.js'));
});
define('app/config/environment', [], function() {
  return {
    name: 'App',
    modulePrefix: 'app',
    podModulePrefix: 'app/pods'
  };
});
define("ember/container-debug-adapter", [], function() {
  return es6RequireShim(require('emberate/vendor/container-debug-adapter.js'));
});
(function() {
  "use strict";

  Ember.Application.initializer({
    name: 'container-debug-adapter',

    initialize: function() {
      var app = arguments[1] || arguments[0];
      var ContainerDebugAdapter = es6RequireShim(require('emberate/vendor/container-debug-adapter.js'));

      app.register('container-debug-adapter:main', ContainerDebugAdapter);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  });
}());
define("ember/load-initializers", [], function() {
  return {
    'default': function(app, prefix) {
      var regex = new RegExp('^' + prefix + '\/((?:instance-)?initializers)\/');
      var getKeys = (Object.keys || Ember.keys);

      getKeys(loader.requirejs._eak_seen).map(function(moduleName) {
        return {
          moduleName: moduleName,
          matches: regex.exec(moduleName)
        };
      }).filter(function(dep) {
        return dep.matches && dep.matches.length === 2;
      }).forEach(function(dep) {
        var moduleName = dep.moduleName;

        var module = require(moduleName, null, null, true);
        if (!module) { throw new Error(moduleName + ' must export an initializer.'); }

        var initializerType = Ember.String.camelize(dep.matches[1].substring(0, dep.matches[1].length - 1));
        var initializer = module['default'];
        if (!initializer.name) {
          var initializerName = moduleName.match(/[^\/]+\/?$/)[0];
          initializer.name = initializerName;
        }

        app[initializerType](initializer);
      });
    }
  };
});
define("app/app",  ['exports', 'ember/resolver', 'ember/load-initializers', 'app/config/environment'], function(exports, _emberResolver, _emberLoadInitializers, _appConfigEnvironment) {
  var App;

  Ember.MODEL_FACTORY_INJECTIONS = true;

  App = Ember.Application.extend({
    modulePrefix: _appConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _appConfigEnvironment['default'].podModulePrefix,
    Resolver: _emberResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _appConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define("app/config/application", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./config/application'));
});
define("app/config/routes", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./config/routes'));
});
loader.require("app/app")["default"].create(es6RequireShim(appOpts));
