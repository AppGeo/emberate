Ember Stream Generators
==============================

This generator set is used to create an CJS `require` hierarchy for an EmberJS project structure.
The main use-case, is for use with Browserify.  
For example, given the following structure:


```
app
  |_controllers/
    |_user.js
    |_user/
      |_new.js
  |_views/
    |_user.js
  |_routes/
    |_user.js
    |_user/
      |_new.js
  |_...
```

This generator set can be used to generate a file, along the lines of `.index.js`, with the following contents:

```js
// Start template code: Generated from template
require('ember'); // get Ember global around for the templates
require('./.templates');
var routes = require('./config/routes');
var App = require('./config/application');
App.Router.map(routes);
// End template code

// Start generated code
App.UserController = require('./controllers/user');
App.UserNewController = require('./controllers/user/new');
App.UserView = require('./views/user');
App.UserRoute = require('./routes/user');
App.UserNewRoute = require('./routes/user/new');
// more ...
```

## Usage

```js
var esg = require('ember-stream-generator');
var fs = require('fs');
esg('path/to/app', 'path/to/optional/template.hbs').pipe(fs.createReadStream('output/path'));
```
If no template path is given it defaults to

```
// this file is auto-generated, do not edit

require('ember'); // get Ember global around for the templates
require('./.templates');
var routes = require('./config/routes');
var App = require('./config/application');
App.Router.map(routes);

{{#each helpers}}
require('{{path}}');{{/each}}

{{#each modules}}
App.{{name}} = require('{{path}}');{{/each}}

module.exports = App;
```

Ripped out of [this project](https://github.com/rpflorence/loom-ember).
