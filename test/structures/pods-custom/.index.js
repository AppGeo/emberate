/* global define */
/**
 * This file is auto-generated, by Emberate
 * (https://www.npmjs.org/package/emberate)
 *
 * DO NOT MODIFY
 */
'use strict';
var Ember = require('ember');

require('loader.js/lib/loader.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

define('app/config/environment', function() {
  var prefix = 'app';

  try {
    var metaName = prefix + '/config/environment';
    var rawConfig = Ember.$('meta[name="' + metaName + '"]').attr('content');
    var config = JSON.parse(unescape(rawConfig));

    return { 'default': config };
  }
  catch(err) {
    throw new Error('Could not read config from meta tag with name "' + metaName + '".');
  }
});

var app = require('./app');

app.Router = require('./router');

define("app/components/component-pod/template", ["exports"], function (exports) {
  var imported = require('./components/component-pod/template.hbs');
  exports["default"] = _interopRequireDefault(imported);
});
define("app/foo/application/template", ["exports"], function (exports) {
  var imported = require('./foo/application/template.hbs');
  exports["default"] = _interopRequireDefault(imported);
});
define("app/foo/user/index/template", ["exports"], function (exports) {
  var imported = require('./foo/user/index/template.hbs');
  exports["default"] = _interopRequireDefault(imported);
});
define("app/templates/sidebar", ["exports"], function (exports) {
  var imported = require('./templates/sidebar.hbs');
  exports["default"] = _interopRequireDefault(imported);
});
define("app/initializers/test", ["exports"], function (exports) {
  var imported = require('./initializers/test');
  exports["default"] = _interopRequireDefault(imported);
});
define("app/mixins/test", ["exports"], function (exports) {
  var imported = require('./mixins/test');
  exports["default"] = _interopRequireDefault(imported);
});
define("app/transforms/object", ["exports"], function (exports) {
  var imported = require('./transforms/object');
  exports["default"] = _interopRequireDefault(imported);
});
define("app/serializers/user", ["exports"], function (exports) {
  var imported = require('./serializers/user');
  exports["default"] = _interopRequireDefault(imported);
});
define("app/adapters/user", ["exports"], function (exports) {
  var imported = require('./adapters/user');
  exports["default"] = _interopRequireDefault(imported);
});
define("app/models/user", ["exports"], function (exports) {
  var imported = require('./models/user');
  exports["default"] = _interopRequireDefault(imported);
});
define("app/components/component-pod/component", ["exports"], function (exports) {
  var imported = require('./components/component-pod/component');
  exports["default"] = _interopRequireDefault(imported);
});
define("app/components/x-player", ["exports"], function (exports) {
  var imported = require('./components/x-player');
  exports["default"] = _interopRequireDefault(imported);
});
define("app/foo/application/controller", ["exports"], function (exports) {
  var imported = require('./foo/application/controller');
  exports["default"] = _interopRequireDefault(imported);
});
define("app/foo/user/index/controller", ["exports"], function (exports) {
  var imported = require('./foo/user/index/controller');
  exports["default"] = _interopRequireDefault(imported);
});
define("app/foo/application/route", ["exports"], function (exports) {
  var imported = require('./foo/application/route');
  exports["default"] = _interopRequireDefault(imported);
});
define("app/services/account", ["exports"], function (exports) {
  var imported = require('./services/account');
  exports["default"] = _interopRequireDefault(imported);
});
define("app/foo/application/view", ["exports"], function (exports) {
  var imported = require('./foo/application/view');
  exports["default"] = _interopRequireDefault(imported);
});

module.exports = app;
