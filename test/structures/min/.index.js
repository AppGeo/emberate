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
define("app/components/bubble-chart", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/app/components/bubble-chart'));
});
define("app/components/horizontal-bar-chart", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/app/components/horizontal-bar-chart'));
});
define("app/components/pie-chart", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/app/components/pie-chart'));
});
define("app/components/scatter-chart", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/app/components/scatter-chart'));
});
define("app/components/time-series-chart", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/app/components/time-series-chart'));
});
define("app/components/vertical-bar-chart", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/app/components/vertical-bar-chart'));
});
define("app/config/application", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./config/application'));
});
define("app/config/routes", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./config/routes'));
});
define("app/initializers/container-debug-adapter", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-resolver/app/initializers/container-debug-adapter'));
});
define("app/templates/components/chart-component", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/app/templates/components/chart-component.hbs'));
});
define("ember-charts/components/bubble-chart", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/addon/components/bubble-chart'));
});
define("ember-charts/components/chart-component", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/addon/components/chart-component'));
});
define("ember-charts/components/horizontal-bar-chart", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/addon/components/horizontal-bar-chart'));
});
define("ember-charts/components/pie-chart", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/addon/components/pie-chart'));
});
define("ember-charts/components/scatter-chart", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/addon/components/scatter-chart'));
});
define("ember-charts/components/time-series-chart", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/addon/components/time-series-chart'));
});
define("ember-charts/components/vertical-bar-chart", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/addon/components/vertical-bar-chart'));
});
define("ember-charts/mixins/axes", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/addon/mixins/axes'));
});
define("ember-charts/mixins/colorable", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/addon/mixins/colorable'));
});
define("ember-charts/mixins/floating-tooltip", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/addon/mixins/floating-tooltip'));
});
define("ember-charts/mixins/formattable", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/addon/mixins/formattable'));
});
define("ember-charts/mixins/has-time-series-rule", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/addon/mixins/has-time-series-rule'));
});
define("ember-charts/mixins/legend", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/addon/mixins/legend'));
});
define("ember-charts/mixins/no-margin-chart", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/addon/mixins/no-margin-chart'));
});
define("ember-charts/mixins/pie-legend", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/addon/mixins/pie-legend'));
});
define("ember-charts/mixins/resize-handler", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/addon/mixins/resize-handler'));
});
define("ember-charts/mixins/sortable-chart", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/addon/mixins/sortable-chart'));
});
define("ember-charts/mixins/time-series-labeler", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/addon/mixins/time-series-labeler'));
});
define("ember-charts/utils/group-by", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/addon/utils/group-by'));
});
define("ember-charts/utils/label-trimmer", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/addon/utils/label-trimmer'));
});
define("ember-resolver/container-debug-adapter", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-resolver/addon/container-debug-adapter'));
});
define("ember-resolver/index", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-resolver/addon/index'));
});
define("ember-resolver/resolver", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-resolver/addon/resolver'));
});
define("ember-resolver/utils/class-factory", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-resolver/addon/utils/class-factory'));
});
define("ember-resolver/utils/create", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-resolver/addon/utils/create'));
});
define("ember-resolver/utils/make-dictionary", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-resolver/addon/utils/make-dictionary'));
});
define("ember-resolver/utils/module-registry", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-resolver/addon/utils/module-registry'));
});
loader.require("app/app")["default"].create(es6RequireShim(appOpts));
