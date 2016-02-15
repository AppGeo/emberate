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
Ember.TEMPLATES['components/component-pod'] = require('./components/component-pod/template.hbs');
Ember.TEMPLATES['components/fun-stuff'] = require('ember-funstuff/app/templates/components/fun-stuff.hbs');
Ember.TEMPLATES['sidebar'] = require('./templates/sidebar.hbs');
Ember.TEMPLATES['user/index'] = require('./pods/user/index/template.hbs');
App.TestInitializer = require('./initializers/test');
App.TestMixin = require('./mixins/test');
App.ObjectTransform = require('./transforms/object');
App.UserSerializer = require('./serializers/user');
App.UserAdapter = require('./adapters/user');
App.User = require('./models/user');
App.ComponentPodComponent = require('./components/component-pod/component');
App.FunStuffComponent = require('ember-funstuff/app/components/fun-stuff');
App.XPlayerComponent = require('./components/x-player');
App.ApplicationController = require('./pods/application/controller');
App.UserIndexController = require('./pods/user/index/controller');
App.ApplicationRoute = require('./pods/application/route');
App.AccountService = require('./services/account');
App.ApplicationView = require('./pods/application/view');

module.exports = App;
