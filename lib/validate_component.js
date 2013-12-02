var msg = require('loom/lib/message');

module.exports = function(name) {
  if (name.indexOf('-') < 0) {
    msg.error("Components must have a '-' character");
  }
};

