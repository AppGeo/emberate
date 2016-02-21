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
  // str = str.replace(/(\/|\\)/g, '_');
  // ember data expects models to be singular without the type
  //  attached to the name
  str = str.replace(/\/model$/, '');
  return str;
  // return str.replace('_', '/');
  return fleck.classify(str);
};

module.exports = fleck;
