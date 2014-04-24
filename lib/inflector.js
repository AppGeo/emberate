var fleck = require('fleck');
var path = require('path');
var rmExt = require('./rmExt');

module.exports = function (str, pods) {
  if (str.indexOf('pods') > -1) {
    debugger;
  }
  var name =  rmExt(str);
  var parts = name.split('/');

  if (parts[parts.length - 1][0] === '.') {
    return;
  }

  if (name.indexOf('pods') > -1) {
    return byPod(parts);
  }
  else {
    return byType(parts)
  }
};

function byType(parts) {
  var cat = fleck.singularize(parts.shift());
  parts.push(cat);

  return {
    name: fleck.objectify(parts.join('/')),
    cat: cat
  }
}

function byPod(parts) {
  var cat = parts.slice(-1)[0];
  parts.shift();

  return {
    name: fleck.objectify(parts.join('/')),
    cat: cat
  }
}

/*
 * CapitalizedCamelCase
 */

fleck.classify = function(str) {
  return fleck.camelize(str, true);
};

/*
 * users/update_avatar -> UsersUpdateAvatar
 */

fleck.objectify /*lol*/ = function (str) { 
  str = str.replace(/(\/|\\)/g, '_');
  return fleck.classify(str);
};
