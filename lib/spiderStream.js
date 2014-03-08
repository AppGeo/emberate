var Readable = require('readable-stream').Readable;
var fs = require('fs');
var path = require('path');
var util = require('util');

module.exports = FolderStat;
util.inherits(FolderStat, Readable);

function FolderStat(inPath) {
  if (!(this instanceof FolderStat)) {
    return new FolderStat(inPath);
  }

  Readable.call(this, {
    objectMode: true
  });

  this.paths = [path.resolve(inPath)];
  this.inProgress = 0;
}

FolderStat.prototype._read = function () {
  var self = this;
  var called = 0;
  var current;

  if (this.paths.length) {
    current = this.paths.pop();
    this.inProgress++;
  } else {
    if (!this.inProgress) {
      this.push(null);
    }
    return;
  }

  fs.readdir(current, function (err, paths) {
    var todo = paths.length;
    paths.forEach(function (file) {
      var fullPath = path.join(current, file);
      fs.stat(fullPath, function (err, stats) {
        if (stats.isFile()) {
          self.push(fullPath);
          called++;
        } else if (stats.isDirectory()) {
          self.paths.push(fullPath);
        }
        if(!--todo) {
          if (!--self.inProgress && !called) {
            self._read();
          } else if (!self.inProgress && !self.paths.length) {
            self.push(null);
          }
        }
      });
    })
  });
};
