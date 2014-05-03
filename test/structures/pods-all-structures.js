// this file is auto-generated, do not edit
require('ember'); // get Ember global around for the templates

var App = require('./app/config/application');
App.Router.map(require('./app/config/routes'));


require('./app/helpers/ajax');


Ember.TEMPLATES['user/index'] = require('./pods/user/index/template.hbs');
Ember.TEMPLATES['application'] = require('./pods/application/template.hbs');
Ember.TEMPLATES['sidebar'] = require('./app/templates/sidebar.hbs');
App.TestInitializer = require('./app/initializers/test');
App.TestMixin = require('./app/mixins/test');
App.ObjectTransform = require('./app/transforms/object');
App.UserSerializer = require('./app/serializers/user');
App.UserAdapter = require('./app/adapters/user');
App.UserModel = require('./app/models/user');
App.XPlayerComponent = require('./components/x-player/component');
App.UserIndexController = require('./pods/user/index/controller');
App.ApplicationController = require('./pods/application/controller');
App.ApplicationRoute = require('./pods/application/route');
App.ApplicationView = require('./pods/application/view');

module.exports = App;
