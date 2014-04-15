// this file is auto-generated, do not edit

require('ember'); // get Ember global around for the templates
require('./.templates');

var routes = require('./config/routes');
var App = require('./config/application');

App.Router.map(routes);


require('./controllers/application');


App.ApplicationRoute = require('./routes/application');
App.ApplicationView = require('./views/application');

module.exports = App;
