Emberate [![Build Status][travis-img]][travis-url]
======================

[![NPM][npm-badge-img]][npm-badge-url]

This generator set is used to create an CJS `require` hierarchy for an EmberJS project structure.
The main use-case, is for use with Browserify.  

**Now supporting [PODS][pods] project structure.**

For example, given the following structure:

```no-highlight
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

var App = require('./config/application');
App.Router.map(require('./config/routes'));
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


__Install__:

```js
npm install emberate --save-dev
```


__Basic Example__:

This stream should be used with other streams:
```js
var emberate = require('emberate');
var fs = require('fs');

emberate('./client').pipe(fs.createReadStream('./tmp/.index.js'));
```

From here you can run browserify: `browserify ./client/.index.js --outfile ./dist/scripts/application.js`.


__Available Options__:

* __path__ - The path to the root of your client directory.
* __options__ - optional, options hash with the available options listed below.
  - appName - 'App' by default, used as your application global.
  - templatePath - `lib/defaultTemplate.hbs` (in emberate project) by default.
  - pods - `false` by default
  - outPath - where to save the generated file (can only be used if specifying a done callaback after options).
* __callback__ - optional, returns once done writing, if used _outPath_ option above.

**Options below are for backwards compatibility only, and do not work with PODS**  

This stream takes three options `stream(path, appName, customTemplatePath)`.

* __path__ - The path to the root of you client directory.
* __appName__ - Name of your `Ember.Application` instance, e.g. `App.UserRoute`.
* __customTemplatePath__ - Path to custom template, the default template is [here][default-template].


### PODS

When using PODS, you must use the new options syntax, see above.

```no-highlight
npm install --save-dev knownasilya/node-hbsfy#ember ember-template-compiler
```
_Note: PR for `hbsfy` has been submitted, jut waiting on response._

Specify the following options in your `package.json`:

```json
{
  "browserify": {
    "transform": ["hbsfy"]
  },
  "hbsfy": {
    "precompiler": "ember-template-compiler",
    "compiler": "Ember.Handlebars"
  }
}
```

Run this before browserifying:

```js
var emberate = require('emberate');

emberate('./client', { pods: true })
  .pipe(fs.createReadStream('./tmp/.index.js'));
```

This requires the following structure in the `./client` folder:

```no-highlight
./client
  |_app/
    |_config/
      |_application.js
      |_routes.js
    |_mixins/
    |_models/
    |_initializers/
    |_helpers/
    |_transforms/
    |_adapters/
    |_serializers/
  |_pods/
    |_application/
      |_controller.js
      |_template.hbs
    |_users/
      |_index/
        |_template.hbs
  |_components/
    |_nav-menu
      |_component.js
```

### CLI

For ease of use with npm scripts and for quick testing.

```no-highlight
Usage: emberate [options]

  Options:

    -h, --help                   output usage information
    -V, --version                output the version number
    -o, --output-path [path]     Output path of generated file
    -p, --pods                   Enable PODS support
    -i, --input-directory [dir]  Directory to start crawling file tree
    -n, --app-name [app-name]    App Name, where your app resides globally
```

__--input-directory__ defaults to `./client` and __--output-path__ to `./client/.index.js`,
so you can call `emberate` or `emberate -p` (for PODS).


### Via Grunt


```js
  // creates a file with requires for App.* for ember
  grunt.registerTask('pre-browserify', function () {
    var done = this.async();
    var emberate = require('emberate');
    
    emberate('./client', { outPath: './tmp/.index.js' }, function () {
      done();  
    });
  });
```

### Via Gulp

```js
// creates a file with requires for App.* for ember
gulp.task('pre-browserify', function () {
  var emberate = require('emberate');
  var rename = require('gulp-rename');
  var source = require('vinyl-source-stream');
  var clientPath = './client/';

  emberate(clientPath)
    .pipe(source(clientPath))
    .pipe(rename('.index.js'))
    .pipe(gulp.dest(clientPath));
});
```

## Acknowledgment

The concept and some of the code comes from Ryan Florence's [loom-ember][loom-ember].

[loom-ember]: https://github.com/rpflorence/loom-ember
[compiler]: https://github.com/toranb/ember-template-compiler
[travis-url]: https://travis-ci.org/AppGeo/emberate
[travis-img]: https://travis-ci.org/AppGeo/emberate.svg?branch=master
[npm-badge-img]: https://nodei.co/npm/emberate.svg?compact=true
[npm-badge-url]: https://nodei.co/npm/emberate/
[default-template]: https://github.com/AppGeo/emberate/blob/master/lib/defaultTemplate.hbs
[pods]: http://emberjs.com/blog/2013/12/17/whats-coming-in-ember-in-2014.html
