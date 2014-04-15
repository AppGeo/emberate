var esg = require('../lib'),
  fs = require('fs'),
  path = require('path'),
  test = require('tape'),
  allStructure = path.resolve('test', 'structures', 'all'),
  generatedFile = path.resolve('test', 'structures', 'all', '.index.js'),
  expectedFile = path.resolve('test', 'structures', 'all-structures.js');

test('is a stream', function (t) {
  var instance = esg(allStructure);

  t.equal(typeof instance.pipe, 'function'); 
  t.end();
});

test('creates expected output', function (t) {
  var instance = esg(allStructure).pipe(fs.createWriteStream(generatedFile));

  instance.on('finish', function () {
    debugger;
    fs.readFile(generatedFile, function (err, data) {
      debugger;
      var expected = fs.readFileSync(expectedFile);

      t.notOk(err, 'No file reading errors');
      t.deepEqual(data, expected, 'Generated is same as expected');
    });
  });

  t.end();
});
