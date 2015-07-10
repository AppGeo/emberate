Emberate
======================
[![Build Status][travis-img]][travis-url] [![Code Climate][coverage-img]][coverage-url]  
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/AppGeo/emberate?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![NPM][npm-badge-img]][npm-badge-url]

**Note: You probably want to use [ember-cli], which has browserify support with the [ember-browserify] module.**

Emberate is used to create a commonjs `require` hierarchy for your Ember.js project structure,
mainly to be used for building with [browserify].

For example, given the following structure:

```no-highlight
app.js
router.js
controllers/
  |_ user.js
  |_ user/
    |_ new.js
views/
  |_ profile.js
mixins/
  |_ draggable.js
models/
pods/
  |_ application
  |_ index
    |_ template.hbs  
  |_ post/
    |_ route.js
    |_ index/
      |_ template.hbs
      |_ controller.js
    |_ edit/
      |_ template.hbs
      |_ route.js
```

Emberate can be used to generate a file that can be used as the
entry point for browserify.

## Usage

__Install required packages__:

```bash
npm install emberate hbsfy handlebars ember-template-compiler browserify --save-dev
```

_Note: hbsfy can only be used for versions >= 2.1.0 and if using Handlebars >= 2, then
the ember-template-compiler needs to be version 1.9.0-alpha or greater._

__Basic Example__:


```js
var emberate = require('emberate');

emberate('./client', { outPath: './client/.index.js' }, function () {
  // './client/.index.js' now exists.. browserify it.
});
```

From here you can run browserify: 

```bash
browserify -t [ hbsfy -p ember-template-compiler -c Ember.Handlebars ] ./client/.index.js --outfile ./dist/scripts/application.js`
```

This is a basic example, for something more useful have a look at the [gulp] and [grunt] examples, or the
getting started with emberate [scaffold] repo.

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
    -o, --output-path [path]     Output path of generated file, default: './client/.index.js'
    -i, --input-directory [dir]  Directory to start crawling file tree, default: './client'
    -n, --app-name [app-name]    App Name, where your app resides globally, default 'App'
```

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
[browserify]: http://browserify.org/
[gulp]: README.md#via-gulp
[grunt]: README.md#via-grunt
[scaffold]: https://github.com/AppGeo/emberate-scaffold
[ember-cli]: https://github.com/ember-cli/ember-cli
[ember-browserify]: https://github.com/ef4/ember-browserify
