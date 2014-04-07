Ember Stream Generator
======================

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

_Note: The `config` directory is required, with the application definition in `config/application.js` and the router definition in `config/routes.js`. This also requires a `.templates.js` file in the root directory (this is a precompiled templates file, see [ember-template-compiler][compiler])._

## Usage

__Install__:

```js
npm install ember-stream-generator --save
```


__Available Options__:

This stream takes three options `stream(path, appName, customTemplatePath)`.

* __path__ - The path to the root of you client directory.
* __appName__ - Name of your `Ember.Application` instance, e.g. `App.UserRoute`.
* __customTemplatePath__ - Path to custom template, the default template is below.


__Basic Example__:

This stream should be used with other streams:
```js
var esg = require('ember-stream-generator');
var fs = require('fs');

esg('./client/app').pipe(fs.createReadStream('./tmp/.index.js'));
```


__Default Template__: 

If no template path is given, this is the default:

```
// this file is auto-generated, do not edit

require('ember'); // get Ember global around for the templates
require('./.templates');

var routes = require('./config/routes');
var {{appName}} = require('./config/application');

{{appName}}.Router.map(routes);

{{#each helpers}}
require('{{path}}');{{/each}}

{{#each modules}}
{{../appName}}.{{name}} = require('{{path}}');{{/each}}

module.exports = {{appName}};
```


### Via Grunt

```js
  // creates a file with requires for App.* for ember
  grunt.registerTask('build-index', function () {
    var done = this.async();
    var emberStream = require('ember-stream-generator');
    var fs = require('fs');
    var inStream = emberStream('./client');
    var outStream = fs.createWriteStream('./client/.index.js');

    outStream.on('finish', done);
    inStream.pipe(outStream);
  });
```

## Acknowledgment

The concept and some of the code comes from Ryan Florence's [loom-ember][1].

[1]: https://github.com/rpflorence/loom-ember
[compiler]: https://github.com/toranb/ember-template-compiler
