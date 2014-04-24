var esg = require('../lib');
var fs = require('fs');
var path = require('path');
var test = require('tape');
var allStructure = path.join(__dirname, 'structures', 'all');
var minStructure = path.join(__dirname, 'structures', 'min');
var generatedFile = path.join(__dirname, 'structures', 'all', '.index.js');
var expectedFile = path.join(__dirname, 'structures', 'all-structures.js');

test('is a stream', function (t) {
  var instance = esg(allStructure);

  t.equal(typeof instance.pipe, 'function'); 
  t.end();
});

test('creates expected output', function (t) {
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
  t.end();
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
  t.deepEqual(inflector('app/mixins/ajax.js', true), { cat: 'mixin', name: 'AjaxMixin' }, 'inflects app level by type');
  t.end();
});
