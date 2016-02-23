var babel = require("babel-core");
var fs = require('fs');
var outDir = './vendor';

var src = './node_modules/ember-resolver/addon'
var files = fs.readdirSync(src);
console.log('building vendor files...');

function outDirFor(inDir) {
  return inDir.replace(src, outDir);
}

function transpile(baseDir, fileName) {
  var file = [baseDir, fileName].join('/');
  if (fs.lstatSync(file).isDirectory()) {
    fs.readdirSync(file).forEach(function(nested) {
      transpile(file, nested);
    });
  } else {
    var outDir = outDirFor(baseDir);
    console.log(file+' -> '+outDir+'/'+fileName);
    if (!fs.existsSync(outDir)){
      fs.mkdirSync(outDir);
    }
    var result = babel.transformFileSync(file);
    fs.writeFile(outDir+'/'+fileName, result.code);
  }
}

files.forEach(function(fileName) {
  transpile(src, fileName);
});
