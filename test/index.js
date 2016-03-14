var emberate = require('../lib');
var fs = require('fs');
var path = require('path');
var test = require('tape');
var espree = require('espree');
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
  var instance = emberate(minStructure, {addonSupport: false}).pipe(fs.createWriteStream(generatedMinFile));

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
  var instance = emberate(allStructure, {debug: false, addonSupport: false}).pipe(fs.createWriteStream(generatedFile));

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

var testFiles = [
  {
    import: 'PortalContent',
    expected: '../../../../ember-portal/addon/components/portal-content',
    original: 'ember-portal/components/portal-content',
    compiledFile: path.resolve('emberate-addons/ember-named-yields/addon/components/block-for/component.js'),
    addonFile: path.resolve('node_modules/ember-named-yields/addon/components/block-for/component.js')
  },
  {
    import: 'PortalFor',
    expected: '../../../../ember-portal/addon/components/portal-for',
    original: 'ember-portal/components/portal-for',
    compiledFile: path.resolve('emberate-addons/ember-named-yields/addon/components/named-yield/component.js'),
    addonFile: path.resolve('node_modules/ember-named-yields/addon/components/named-yield/component.js')
  },
  {
    import: 'PortalContent',
    expected: '../../addon/components/portal-content',
    original: 'ember-portal/components/portal-content',
    compiledFile: path.resolve('emberate-addons/ember-portal/app/components/portal-content.js'),
    addonFile: path.resolve('node_modules/ember-portal/app/components/portal-content.js')
  }
];

test('transpiles broken addon import statements', function(t) {
  var generatedFile = path.resolve('emberate-addons/ember-named-yields/addon/components/block-for/component.js');
  var instance = emberate(allStructure);
  var parseOpts = {
    ecmaVersion: 6,
    sourceType: "module"
  };

  instance.on('finish', function() {
    testFiles.forEach(function(test) {
      var oldFile = fs.readFileSync(test.addonFile).toString();
      var oldFileData = espree.parse(oldFile, parseOpts);
      var oldImportNode = importNodeFor(oldFileData, test.import);
      t.ok(oldImportNode, 'specified testing node found for import: '+test.import);
      t.equal(test.original, oldImportNode.source.value, 'import source matches original value: '+test.original);


      var newFile = fs.readFileSync(test.compiledFile).toString();
      var newFileData = espree.parse(newFile, parseOpts);
      var newImportNode = importNodeFor(newFileData, test.import);
      t.ok(newImportNode, 'specified testing node found for import: '+test.import);
      t.equal(test.expected, newImportNode.source.value, 'import source matches expected value: '+test.expected)
    });
    t.end();
  })
});

function importNodeFor(data, importName){
  var result = null;
  data.body.forEach(function(node) {
    var name = node.specifiers && node.specifiers[0].local.name;
    if (node.type === 'ImportDeclaration' && importName === name) {
      result = node;
    }
  });
  return result;
}
