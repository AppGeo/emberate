var fleck = require('fleck');
var path = require('path');
var rmExt = require('./rmExt');

module.exports = function (str, pods) {
  var name =  rmExt(str);
  var parts = name.split('/');

  if (parts[parts.length - 1][0] === '.') {
    return;
  }

  if (pods) {
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
  var cat, section, name;

  if (parts.length > 1) {
    cat = parts.slice(-1)[0];
    section = parts.shift();
    
    if (section === 'app') {
      return byType(parts);
    }
  }
  else {
    cat = parts[0];
  }

  if (cat === 'template') {
    parts.pop();
    name = parts.join('/');
  }
  else {
    name = fleck.objectify(parts.join('/'));
  }

  return {
    name: name,
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
