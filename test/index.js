var emberate = require('../lib');
var fs = require('fs');
var path = require('path');
var test = require('tape');
var allStructure = path.join(__dirname, 'structures', 'all');
var minStructure = path.join(__dirname, 'structures', 'min');
var podsAllStructure = path.join(__dirname, 'structures', 'pods-all');
var podsCustomStructure = path.join(__dirname, 'structures', 'pods-custom');
var inflector = require('../lib/inflector');

test('creates expected output', function (t) {
  var generatedFile = path.join(__dirname, 'structures', 'all', '.index.js');
  var expectedFile = path.join(__dirname, 'structures', 'all-structures.js');
  var instance = emberate(allStructure).pipe(fs.createWriteStream(generatedFile));

  instance.on('finish', function () {
    fs.readFile(generatedFile, function (err, data) {
      var expected = fs.readFileSync(expectedFile);

      t.notOk(err, 'No file reading errors');
      t.deepEqual(data, expected, 'Generated is same as expected');
      t.end();
    });
  });
});

test('creates expected output with callback', function (t) {
  var generatedFile = path.join(__dirname, 'structures', 'all', '.index.js');
  var expectedFile = path.join(__dirname, 'structures', 'all-structures.js');
  var instance = emberate(allStructure, {
    outPath: generatedFile
  }, function () {
    fs.readFile(generatedFile, function (err, data) {
      fs.readFile(expectedFile, function (err, expected){
        t.notOk(err, 'No file reading errors');
        t.deepEqual(data, expected, 'Generated is same as expected');
        t.end();
      });
    });
  });
});

test('works with required dirs/files only', function (t) {
  var expectedMinFile = path.join(__dirname, 'structures', 'min-structures.js');
  var generatedMinFile = path.join(__dirname, 'structures', 'min', '.index.js');
  var instance = emberate(minStructure).pipe(fs.createWriteStream(generatedMinFile));

  instance.on('finish', function () {
    fs.readFile(generatedMinFile, function (err, data) {
      var expected = fs.readFileSync(expectedMinFile);

      t.notOk(err, 'No file reading errors');
      t.deepEqual(data, expected, 'Generated is same as expected');
      t.end();
    });
  });
});

test('pods: all available items', function (t) {
  var expectedPodsAllFile = path.join(__dirname, 'structures', 'pods-all-structures.js');
  var generatedPodsAllFile = path.join(__dirname, 'structures', 'pods-all', '.index.js');
  var instance = emberate(podsAllStructure).pipe(fs.createWriteStream(generatedPodsAllFile));

  instance.on('finish', function () {
    fs.readFile(generatedPodsAllFile, function (err, data) {
      var expected = fs.readFileSync(expectedPodsAllFile);

      t.notOk(err, 'No file reading errors');
      t.deepEqual(data, expected, 'Generated is same as expected');
      t.end();
    });
  });
});

test('pods: all available items with custom folder', function (t) {
  var expectedPodsCustomFile = path.join(__dirname, 'structures', 'pods-custom-structures.js');
  var generatedPodsCustomFile = path.join(__dirname, 'structures', 'pods-custom', '.index.js');
  var instance = emberate(podsCustomStructure, {podModulePrefix: 'foo'}).pipe(fs.createWriteStream(generatedPodsCustomFile));

  instance.on('finish', function () {
    fs.readFile(generatedPodsCustomFile, function (err, data) {
      var expected = fs.readFileSync(expectedPodsCustomFile);

      t.notOk(err, 'No file reading errors');
      t.deepEqual(data, expected, 'Generated is same as expected');
      t.end();
    });
  });
});

test('inflector: by type', function (t) {
  var opts = {podModulePrefix: 'pods'};
  t.deepEqual(inflector('test.js', opts), { cat: 'test', name: 'Test' }, 'inflects root file');
  t.deepEqual(inflector('controllers/application.js', opts), { cat: 'controller', name: 'ApplicationController' }, 'inflects one level deep');
  t.deepEqual(inflector('controllers/user/index.js', opts), { cat: 'controller', name: 'UserIndexController' }, 'inflects two levels deep');
  t.end();
});

test('inflector: pods', function (t) {
  var opts = {podModulePrefix: 'pods'};
  t.deepEqual(inflector('test.js', opts), { cat: 'test', name: 'Test' }, 'inflects root file');
  t.deepEqual(inflector('pods/application/controller.js', opts), { cat: 'controller', name: 'ApplicationController' }, 'inflects one level deep');
  t.deepEqual(inflector('pods/user/index/route.js', opts), { cat: 'route', name: 'UserIndexRoute' }, 'inflects two levels deep');
  t.deepEqual(inflector('pods/user/index/template.hbs', opts), { cat: 'template', name: 'user/index' }, 'inflects two levels deep - template');
  t.deepEqual(inflector('templates/sidebar/header.hbs', opts), { cat: 'template', name: 'sidebar/header' }, 'inflects two levels deep - template, by type');
  t.deepEqual(inflector('mixins/ajax.js', opts), { cat: 'mixin', name: 'AjaxMixin' }, 'inflects app level by type');
  t.end();
});
