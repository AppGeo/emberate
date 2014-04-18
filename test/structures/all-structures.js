// this file is auto-generated, do not edit

require('ember'); // get Ember global around for the templates
require('./.templates');

var routes = require('./config/routes');
var App = require('./config/application');

App.Router.map(routes);


require('./helpers/ajax');


App.TestInitializer = require('./initializers/test');
App.TestMixin = require('./mixins/test');
App.ObjectTransform = require('./transforms/object');
App.UserSerializer = require('./serializers/user');
App.UserAdapter = require('./adapters/user');
App.UserModel = require('./models/user');
App.XPlayerComponent = require('./components/x-player');
App.ApplicationController = require('./controllers/application');
App.UserIndexController = require('./controllers/user/index');
App.ApplicationRoute = require('./routes/application');
App.ApplicationView = require('./views/application');

module.exports = App;
