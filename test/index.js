var esg = require('../lib');
var fs = require('fs');
var path = require('path');
var test = require('tape');
var allStructure = path.join(__dirname, 'structures', 'all');
var minStructure = path.join(__dirname, 'structures', 'min');
var podsAllStructure = path.join(__dirname, 'structures', 'pods-all');

test('creates expected output', function (t) {
  var generatedFile = path.join(__dirname, 'structures', 'all', '.index.js');
  var expectedFile = path.join(__dirname, 'structures', 'all-structures.js');
  var instance = esg(allStructure).pipe(fs.createWriteStream(generatedFile));

  instance.on('finish', function () {
    fs.readFile(generatedFile, function (err, data) {
      var expected = fs.readFileSync(expectedFile);

      t.notOk(err, 'No file reading errors');
      t.deepEqual(data, expected, 'Generated is same as expected');
      t.end();
    });
  });
});

test('works with required dirs/files only', function (t) {
  var expectedMinFile = path.join(__dirname, 'structures', 'min-structures.js');
  var generatedMinFile = path.join(__dirname, 'structures', 'min', '.index.js');
  var instance = esg(minStructure).pipe(fs.createWriteStream(generatedMinFile));

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
  var instance = esg(podsAllStructure, { pods: true }).pipe(fs.createWriteStream(generatedPodsAllFile));

  instance.on('finish', function () {
    fs.readFile(generatedPodsAllFile, function (err, data) {
      var expected = fs.readFileSync(expectedPodsAllFile);
      
      t.notOk(err, 'No file reading errors');
      t.deepEqual(data, expected, 'Generated is same as expected');
      t.end();
    });
  });
});

test('inflector: by type', function (t) {
  var inflector = require('../lib/inflector');

  t.deepEqual(inflector('test.js'), { cat: 'test', name: 'Test' }, 'inflects root file');
  t.deepEqual(inflector('controllers/application.js'), { cat: 'controller', name: 'ApplicationController' }, 'inflects one level deep');
  t.deepEqual(inflector('controllers/user/index.js'), { cat: 'controller', name: 'UserIndexController' }, 'inflects two levels deep');
  t.end();
});

test('inflector: pods', function (t) {
  var inflector = require('../lib/inflector', true);
  
  t.deepEqual(inflector('test.js', true), { cat: 'test', name: 'Test' }, 'inflects root file');
  t.deepEqual(inflector('pods/application/controller.js', true), { cat: 'controller', name: 'ApplicationController' }, 'inflects one level deep');
  t.deepEqual(inflector('pods/user/index/route.js', true), { cat: 'route', name: 'UserIndexRoute' }, 'inflects two levels deep');
  t.deepEqual(inflector('pods/user/index/template.js', true), { cat: 'template', name: 'UserIndexTemplate' }, 'inflects two levels deep - template');
  t.deepEqual(inflector('app/mixins/ajax.js', true), { cat: 'mixin', name: 'AjaxMixin' }, 'inflects app level by type');
  t.end();
});
