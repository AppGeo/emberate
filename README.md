Emberate
======================
[![NPM][npm-badge-img]][npm-badge-link] [![Build Status][travis-img]][travis-url] [![Code Climate][coverage-img]][coverage-url]
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/AppGeo/emberate?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

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
npm install --save-dev emberate hbsfy handlebars ember-template-compiler browserify
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
  - appName - 'app' by default, used as your application global.
  - outPath - where to save the generated file (can only be used if specifying a done callaback after options).
  - debug - 'true' by default, used to optionally include the container-debug module. Set to false to exclude the module from your build.
  - modulePrefix - Name of the namespace used by ember to resolve modules, 'app' by default.
  - podModulePrefix - Name of the directory containing pod modules. `app/pods` by default.
  - templatePath - `lib/defaultTemplate.hbs` (in emberate project) by default. - *advanced options, only override if needed*
  - loaderPath - require path to the module loader used to connect commonjs modules with Ember's module system, defaults to a modified version of [ember-cli's loader](https://github.com/ember-cli/loader.js) - *advanced option, only override if needed*
  - resolverPath - require path for a custom Resolver. Defaults to the most current version of [ember-cli's resolver](https://github.com/ember-cli/ember-resolver) - *advanced option, only override if needed*
  -  debugAdapterPath - require path for a custom debug Adapter, defaults to the current version included with [ember-cli's resolver](https://github.com/ember-cli/ember-resolver).
  -  addonPath - `emberate-addons` by default, the path that ember addons will be installed into.
  -  addonSupport - `true` by default, set to false to disable addon support
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

    -h, --help                                   output usage information
    -V, --version                                output the version number
    -o, --output-path [path]                     Output path of generated file
    -i, --app-directory [dir]                    Directory to start crawling file tree
    -n, --app-name [app-name]                    App Name, where your app resides globally
    -m, --module-prefix [module-prefix]          Module prefix, a namespace for app modules
    -p, --pod-module-prefix [pod-module-prefix]  Pod Module Prefix, the directroy that the ember-resolver uses for pods
```

### Ember Addons

There is basic support for ember-addons. You should be able to npm install the addon, and assuming the published addon conforms to ember's addon standard, emberate will include the addon in your app bundle entry file.

You can optionally exclude the addon support from your build by setting `addonSupport` to false in the emberate options. Since Ember Addons are normally written in es6, you will need to include a transpiler in your browserify bundle. The most simple way to do so is with the [babelify transform](https://github.com/babel/babelify).

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
Also lots of the work regarding streams and performance was done by Calvin Metcalf.

[loom-ember]: https://github.com/rpflorence/loom-ember
[compiler]: https://github.com/toranb/ember-template-compiler
[travis-url]: https://travis-ci.org/AppGeo/emberate
[travis-img]: https://travis-ci.org/AppGeo/emberate.svg?branch=master
[npm-badge-img]: https://badge.fury.io/js/emberate.svg
[npm-badge-link]: http://badge.fury.io/js/emberate
[default-template]: https://github.com/AppGeo/emberate/blob/master/lib/defaultTemplate.hbs
[coverage-img]: https://codeclimate.com/github/AppGeo/emberate.svg
[coverage-url]: https://codeclimate.com/github/AppGeo/emberate
[browserify]: http://browserify.org/
[gulp]: README.md#via-gulp
[grunt]: README.md#via-grunt
[scaffold]: https://github.com/AppGeo/emberate-scaffold
[ember-cli]: https://github.com/ember-cli/ember-cli
[ember-browserify]: https://github.com/ef4/ember-browserify
