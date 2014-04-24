// this file is auto-generated, do not edit
require('ember'); // get Ember global around for the templates
require('./.templates');

var App = require('./app/config/application');
App.Resolver = Ember.DefaultResolver.extend({
  resolveTemplate: function(parsedName) {
    this.useRouterNaming(parsedName);
    return this.resolveOther(parsedName);
  }  
});
App.Router.map(require('./app/config/routes'));


require('./app/helpers/ajax');


App.ApplicationTemplate = require('./pods/application/template.hbs');
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
