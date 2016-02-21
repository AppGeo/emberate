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


module.exports = app;
