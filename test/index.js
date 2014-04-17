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
    });
  });

  t.end();
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
    });
  });

  t.end();
});
