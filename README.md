Emberate [![Build Status][travis-img]][travis-url] [![Code Climate][coverage-img]][coverage-url]
======================

[![NPM][npm-badge-img]][npm-badge-url]

Emberate is used to create an commonjs `require` hierarchy for an Ember.js project structure,
mainly to be used with [browserify][browserify].

For example, given the following structure:

```no-highlight
app.js
router.js
controllers/
  |_user.js
  |_user/
    |_new.js
views/
  |_profile.js
mixins/
  |_draggable.js
models/
pods/
  |_application
  |_index
    |_template.hbs  
  |_post/
    |_route.js
    |_index/
      |_template.hbs
      |_controller.js
    |_edit/
      |_template.hbs
      |_route.js
```

Emberate can be used to generate a file that can be used as the
entry point for browserify.

## Usage

__Install required packages__:

```js
# Install dependencies
npm install knownasilya/node-hbsfy#ember ember-template-compiler browserify --save-dev
# Install emberate
npm install emberate --save-dev
```

__Setup template precompiling__:

Your `package.json` should look like so (dependencies not shown):

```json
{
  "name": "app-name",
  "version": "0.0.0",
  "browserify": {
    "transform": ["hbsfy"]
  },
  "hbsfy": {
    "precompiler": "ember-template-compiler",
    "compiler": "Ember.Handlebars"
  }
}
```

__Basic Example__:


```js
var emberate = require('emberate');

emberate('./client', { outPath: './client/.index.js' }, function () {
  // './client/.index.js' now exists.. browserify it.
});
```

From here you can run browserify: 

```bash
browserify ./client/.index.js --outfile ./dist/scripts/application.js`
```

__Available Options__:

Emberate exports a function with the following signature: `emberate(path, options, callback)`.

* __path__ - The path to the root of your client directory.
* __options__ - optional, options hash with the available options listed below.
  - appName - 'App' by default, used as your application global.
  - templatePath - `lib/defaultTemplate.hbs` (in emberate project) by default.
  - outPath - where to save the generated file (can only be used if specifying a done callaback after options).
* __callback__ - optional, returns once done writing, if used _outPath_ option above.

The callback is only fired if you specify `outPath` in the options hash, e.g.

```js
emberate('./client', { outPath: './client/.index.js' }, function () {
  // './client/.index.js' now exists
});
```

Otherwise it's assumed that you are streaming and will create your own output file, etc..

```js
emberate('./client')
  .pipe(fs.createWriteStream('./client/.index.js'));
```

### Folder Structure

- app.js
- router.js
- initializers/
- transforms/
- mixins/
- adapters/
- serializers/
- models/
- routes/
- controllers/
- views/
- components/
- templates/
- pods/

### CLI

For ease of use with npm scripts and for quick testing.

```no-highlight
Usage: emberate [options]

  Options:

    -h, --help                   output usage information
    -V, --version                output the version number
    -o, --output-path [path]     Output path of generated file
    -i, --input-directory [dir]  Directory to start crawling file tree
    -n, --app-name [app-name]    App Name, where your app resides globally
```

__--input-directory__ defaults to `./client` and __--output-path__ to `./client/.index.js`.


### Via Grunt

```js
// creates a file with requires for App.* for ember
grunt.registerTask('emberate', function () {
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
gulp.task('emberate', function () {
  var emberate = require('emberate');
  var source = require('vinyl-source-stream');

  return emberate('./client')
    .pipe(source('.index.js'))
    .pipe(gulp.dest('./client'));
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
[coverage-img]: https://codeclimate.com/github/AppGeo/emberate.png
[coverage-url]: https://codeclimate.com/github/AppGeo/emberate
[browserify][http://browserify.org/]
