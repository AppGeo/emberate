var cli = require('ltcdr');
var pkg = require('../package');
var emberate = require('./index');
var fs = require('fs');

cli.version(pkg.version)
  .option('-o, --output-path [path]', 'Output path of generated file', './client/.index.js')
  .option('-i, --app-directory [dir]', 'Directory to start crawling file tree', './client')
  .option('-n, --app-name [app-name]', 'App Name, where your app resides globally')
  .parse(process.argv);

emberate({
  appDirectory: cli.appDirectory.
  appName: cli.appName,
  outPath: cli.outputPath
}).then(function () {
  process.exit();
}, function (err) {
  console.error(err);
  process.exit(1);
});

module.exports = cli;
