var cli = require('ltcdr');
var pkg = require('../package');
var app = require('./index');
var fs = require('fs');

cli.version(pkg.version)
  .option('-o, --output-path [path]', 'Output path of generated file', './client/.index.js')
  .option('-p, --pods', 'Enable PODS support')
  .option('-i, --input-directory [dir]', 'Directory to start crawling file tree', './client')
  .option('-n, --app-name [app-name]', 'App Name, where your app resides globally')
  .parse(process.argv);

app(cli.inputDirectory, {
  appName: cli.appName,
  pods: cli.pods,
  outPath: cli.outputPath
}, function () {
  process.exit();
})

module.exports = cli;
