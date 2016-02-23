'use strict';

var fs = require('fs');
var chalk = require('chalk');
var cli = require('ltcdr');
var pkg = require('../package');
var emberate = require('./index');

cli.version(pkg.version)
  .option('-o, --output-path [path]', 'Output path of generated file', './client/.index.js', './client/.index.js')
  .option('-i, --app-directory [dir]', 'Directory to start crawling file tree', './client', './client')
  .option('-n, --app-name [app-name]', 'App Name, where your app resides globally', 'App', 'App')
  .option('-m, --module-prefix [module-prefix]', 'Module prefix, a namespace for app modules', 'app', 'app')
  .option('-p, --pod-module-prefix [pod-module-prefix]', 'Pod Module Prefix, the directroy that the ember-resolver uses for pods', 'app/pods', 'app/pods')
  .parse(process.argv);

emberate({
  appDirectory: cli.appDirectory,
  appName: cli.appName,
  outPath: cli.outputPath,
  modulePrefix: cli.modulePrefix,
  podModulePrefix: cli.podModulePrefix
}).then(function () {
  process.exit();
}, function (err) {
  console.error(chalk.red(err));
  process.exit(1);
});

module.exports = cli;
