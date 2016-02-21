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

define("app/pods/application/template", ["exports"], function (exports) {
  var imported = require('./pods/application/template.hbs');
  exports["default"] = _interopRequireDefault(imported);
});
define("app/templates/application", ["exports"], function (exports) {
  var imported = require('./templates/application.hbs');
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
define("app/components/x-player", ["exports"], function (exports) {
  var imported = require('./components/x-player');
  exports["default"] = _interopRequireDefault(imported);
});
define("app/controllers/application", ["exports"], function (exports) {
  var imported = require('./controllers/application');
  exports["default"] = _interopRequireDefault(imported);
});
define("app/controllers/user/index", ["exports"], function (exports) {
  var imported = require('./controllers/user/index');
  exports["default"] = _interopRequireDefault(imported);
});
define("app/routes/application", ["exports"], function (exports) {
  var imported = require('./routes/application');
  exports["default"] = _interopRequireDefault(imported);
});
define("app/services/account", ["exports"], function (exports) {
  var imported = require('./services/account');
  exports["default"] = _interopRequireDefault(imported);
});
define("app/views/application", ["exports"], function (exports) {
  var imported = require('./views/application');
  exports["default"] = _interopRequireDefault(imported);
});

module.exports = app;
