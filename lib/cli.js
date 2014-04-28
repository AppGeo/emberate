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

debugger;
app(cli.inputDirectory, {
  appName: cli.appName,
  pods: cli.pods
}).pipe(fs.createWriteStream(cli.outputPath)).on('end', process.exit).on('error', console.error);

module.exports = cli;
