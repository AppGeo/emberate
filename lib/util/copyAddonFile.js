'use strict';
/**
 *  Ember addons are often written in a way that is incompatible
 *  with node's require specification. In ember-cli, the modules
 *  are transpiled on a per file basis and wrapped in an AMD module
 *  loader. The contents of the 'addon' directory are registered in
 *  the module loader as `<%addon name%>/<%file type%>/<%file name%>`
 *  and the contents of the 'app' directory are registered in the module
 *  loader as `<%app name%>/<%file type%>/<%file name%>`.
 *
 *  The addon's `app` files usually require the addon's `addon` files by
 *  the name that they will be registered under, and not the 1 to 1 file
 *  to module mapping that node uses for module requires.
 *
 *  The require statements are expecting to be using the require defined
 *  by Ember's module loader, so at application runtime, these paths are
 *  correct. But for browserify and node, these paths are broken because
 *  the files are actually located in
 *  `<%addon name%>/<%(app|addon)%>/<%file type%>/<%file name%>`
 *
 *  This, coupled with the way that browserify handles applying transforms
 *  to files located in `node_modules`, makes the addons incompatable with
 *  browserify and node. This function acts as a translator by copying the
 *  addon files that are going to be included into an application directory
 *  and transpiling the broken require statements to work with the new file
 *  location and the 1 to 1 mapping that node expects.
 */
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

var espree = require('espree');
var escodegen = require('escodegen');

var nodeFolder = path.resolve('node_modules');
module.exports = function copyAddonFile(file, options, cb) {
  function isAddonImport(importString) {
    return options.addonList.indexOf(nameSpaceFrom(importString)) !== -1;
  }
  var newFile = file.replace(nodeFolder, path.resolve(options.addonPath));
  fs.readFile(file, function(err, data) {
    var text = data.toString();
    // make sure the file is not a template
    if (/\.js$/.test(file)) {
      // parse the file for static analysis
      var AST = parseData(text);
      for (var node in AST.body) {
        // For now, assume all ember addons are written in es6, this will only look for 'import' statements,
        // and match on import statements that are trying to import addon modules
        if (AST.body[node].type === "ImportDeclaration" && isAddonImport(AST.body[node].source.value)) {
          // transpile the import statement to a node compatable format
          var namespace = nameSpaceFrom(AST.body[node].source.value);
          // For now only expect the addons to reference <%namespace%>/addon modules
          var namespacedImportDir = path.join(path.resolve(options.addonPath), namespace, 'addon');
          // resolve the new location of the file
          var relativeNamespacedDir = path.relative(path.dirname(newFile), namespacedImportDir);
          var newImportValue = AST.body[node].source.value.replace(namespace, relativeNamespacedDir);
          AST.body[node].source.value = newImportValue;
          AST.body[node].source.raw = "'"+newImportValue+"'";
        }
      }
      // recompile the file
      text = escodegen.generate(AST);
    }
    mkdirp(path.dirname(newFile), function (err) {
      /* istanbul ignore next */
      if (err) {
        console.log('error creating directory for file: '+newFile);
        console.log(err.stack);
        return cb(newFile);
      }
      fs.writeFile(newFile, text, function(err) {
        /* istanbul ignore next */
        if (err) {
          console.log('error writing file: '+newFile);
          console.log(err.stack);
        }
        cb(newFile);
      });
    });
  });
}

function nameSpaceFrom(file) {
  file = file.replace(nodeFolder+'/', '');
  return file.split('/')[0];
}

function parseData(text) {
  return espree.parse(text, {
    ecmaVersion: 6,
    sourceType: "module"
  });
}
