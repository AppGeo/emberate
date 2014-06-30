var fleck = require('fleck');
var path = require('path');
var rmExt = require('./rmExt');

module.exports = function (str, pods) {
  var name =  rmExt(str);
  var parts = name.split('/');

  if (parts[parts.length - 1][0] === '.') {
    return;
  }

  return byPod(parts);
};

function byType(parts) {
  var cat = fleck.singularize(parts.shift());
  var name;

  parts.push(cat);
  name = buildName(cat, parts);

  return {
    name: name,
    cat: cat
  }
}

function byPod(parts) {
  var cat, section, name;

  if (parts.length > 1) {
    if (parts[0] === 'pods') {
      cat = parts.slice(-1)[0];
      section = parts.shift();
    }
    else {
      return byType(parts);
    }
  }
  else {
    cat = parts[0];
  }

  return {
    name: buildName(cat, parts),
    cat: cat
  }
}

function buildName(cat, parts) {
  var name;

  if (cat === 'template') {
    parts.pop();
    name = parts.join('/');
  }
  else {
    name = fleck.objectify(parts.join('/'));
  }

  return name;
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
