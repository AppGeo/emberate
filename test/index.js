var emberate = require('../lib');
var fs = require('fs');
var path = require('path');
var test = require('tape');
var allStructure = path.join(__dirname, 'structures', 'all');
var minStructure = path.join(__dirname, 'structures', 'min');
var podsAllStructure = path.join(__dirname, 'structures', 'pods-all');
var podsCustomStructure = path.join(__dirname, 'structures', 'pods-custom');

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

test('creates output that excludes debug modules when debug is false', function (t) {
  var generatedFile = path.join(__dirname, 'structures', 'all', '.index.js');
  var expectedFile = path.join(__dirname, 'structures', 'all-structures-debug-false.js');
  var instance = emberate(allStructure, {debug: false}).pipe(fs.createWriteStream(generatedFile));

  instance.on('finish', function () {
    fs.readFile(generatedFile, function (err, data) {
      var expected = fs.readFileSync(expectedFile);

      t.notOk(err, 'No file reading errors');
      t.deepEqual(data, expected, 'Generated is same as expected');
      t.end();
    });
  });
});

test('creates output that excludes addons when addonSupport is false', function (t) {
  var generatedFile = path.join(__dirname, 'structures', 'all', '.index.js');
  var expectedFile = path.join(__dirname, 'structures', 'all-structures-addon-false.js');
  var instance = emberate(allStructure, {addonSupport: false}).pipe(fs.createWriteStream(generatedFile));

  instance.on('finish', function () {
    fs.readFile(generatedFile, function (err, data) {
      var expected = fs.readFileSync(expectedFile);

      t.notOk(err, 'No file reading errors');
      t.deepEqual(data, expected, 'Generated is same as expected');
      t.end();
    });
  });
});
