'use strict';

var path = require('path');
var rmExt = require('./rmExt');
var fleck = require('./fleck');

module.exports = function (str, options) {
  var name =  rmExt(str);
  var parts = name.split('/');

  if (parts[parts.length - 1][0] === '.') {
    return;
  }

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
      if (parts[0] === options.podModulePrefix) {
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

  return byPod(parts);
};
