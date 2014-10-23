'use strict';

var fleck = require('fleck');

/*
 * CapitalizedCamelCase
 */

fleck.classify = function(str) {
  return fleck.camelize(str, true);
};

/*
 * users/update_avatar -> UsersUpdateAvatar
 */

fleck.objectify = function (str) { 
  str = str.replace(/(\/|\\)/g, '_');
  return fleck.classify(str);
};

module.exports = fleck;
