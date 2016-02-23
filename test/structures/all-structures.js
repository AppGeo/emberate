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
define('app/config/environment', [], function() {
  return {
    name: 'App',
    modulePrefix: 'app',
    podModulePrefix: 'app/pods'
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
define("app/adapters/user", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./adapters/user'));
});
define("app/components/component-pod", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./components/component-pod/component'));
});
define("app/components/x-player", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./components/x-player'));
});
define("app/helpers/ajax", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./helpers/ajax'));
});
define("app/initializers/test", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./initializers/test'));
});
define("app/mixins/test", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./mixins/test'));
});
define("app/models/user", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./models/user'));
});
define("app/pods/application/controller", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./pods/application/controller'));
});
define("app/pods/application/route", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./pods/application/route'));
});
define("app/pods/application/template", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./pods/application/template.hbs'));
});
define("app/pods/application/view", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./pods/application/view'));
});
define("app/pods/user/index/controller", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./pods/user/index/controller'));
});
define("app/pods/user/index/template", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./pods/user/index/template.hbs'));
});
define("app/router", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./router'));
});
define("app/serializers/user", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./serializers/user'));
});
define("app/services/account", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./services/account'));
});
define("app/templates/components/component-pod", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./components/component-pod/template.hbs'));
});
define("app/templates/sidebar", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./templates/sidebar.hbs'));
});
define("app/transforms/object", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./transforms/object'));
});
loader.require("app/app")["default"].create(es6RequireShim(appOpts));
