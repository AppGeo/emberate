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
define("app/adapters/user", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./adapters/user'));
});
define("app/components/block-for", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-named-yields/app/components/block-for/component'));
});
define("app/components/bubble-chart", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/app/components/bubble-chart'));
});
define("app/components/component-pod", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./components/component-pod/component'));
});
define("app/components/ember-wormhole", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-wormhole/app/components/ember-wormhole'));
});
define("app/components/horizontal-bar-chart", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/app/components/horizontal-bar-chart'));
});
define("app/components/named-yield", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-named-yields/app/components/named-yield'));
});
define("app/components/pie-chart", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/app/components/pie-chart'));
});
define("app/components/portal-content", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-portal/app/components/portal-content'));
});
define("app/components/portal-for", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-portal/app/components/portal-for'));
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
define("app/components/x-player", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./components/x-player'));
});
define("app/helpers/ajax", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./helpers/ajax'));
});
define("app/initializers/container-debug-adapter", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-resolver/app/initializers/container-debug-adapter'));
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
define("app/services/portal", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-portal/app/services/portal'));
});
define("app/templates/components/chart-component", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-charts/app/templates/components/chart-component.hbs'));
});
define("app/templates/components/component-pod", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./components/component-pod/template.hbs'));
});
define("app/templates/components/portal-content", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-portal/app/templates/components/portal-content.hbs'));
});
define("app/templates/sidebar", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./templates/sidebar.hbs'));
});
define("app/transforms/object", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('./transforms/object'));
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
define("ember-named-yields/components/block-for", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-named-yields/addon/components/block-for/component'));
});
define("ember-named-yields/components/named-yield", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-named-yields/addon/components/named-yield/component'));
});
define("ember-named-yields/templates/components/block-for", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-named-yields/addon/components/block-for/template.hbs'));
});
define("ember-named-yields/templates/components/named-yield", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-named-yields/addon/components/named-yield/template.hbs'));
});
define("ember-portal/components/portal-content", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-portal/addon/components/portal-content'));
});
define("ember-portal/components/portal-for", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-portal/addon/components/portal-for'));
});
define("ember-portal/services/portal", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-portal/addon/services/portal'));
});
define("ember-portal/utils/portal-id", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-portal/addon/utils/portal-id'));
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
define("ember-wormhole/components/ember-wormhole", ["exports"], function(exports) {
  exports["default"] = es6RequireShim(require('../../../emberate-addons/ember-wormhole/addon/components/ember-wormhole'));
});
loader.require("app/app")["default"].create(es6RequireShim(appOpts));
