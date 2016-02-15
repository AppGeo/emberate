/**
 * This file is auto-generated, by Emberate
 * (https://www.npmjs.org/package/emberate)
 *
 * DO NOT MODIFY
 */
'use strict';

var Ember = require('ember');
var App = require('./app');

App.Router = require('./router');


Ember.TEMPLATES['application'] = require('./pods/application/template.hbs');
Ember.TEMPLATES['components/fun-stuff'] = require('ember-funstuff/app/templates/components/fun-stuff.hbs');
App.TestInitializer = require('./initializers/test');
App.TestMixin = require('./mixins/test');
App.ObjectTransform = require('./transforms/object');
App.UserSerializer = require('./serializers/user');
App.UserAdapter = require('./adapters/user');
App.User = require('./models/user');
App.FunStuffComponent = require('ember-funstuff/app/components/fun-stuff');
App.XPlayerComponent = require('./components/x-player');
App.ApplicationController = require('./controllers/application');
App.UserIndexController = require('./controllers/user/index');
App.ApplicationRoute = require('./routes/application');
App.AccountService = require('./services/account');
App.ApplicationView = require('./views/application');

module.exports = App;
