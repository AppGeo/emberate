'use strict';

var path = require('path');
var rmExt = require('./rmExt');
var fleck = require('./fleck');

module.exports = function (str, options) {
  var name =  rmExt(str);
  var parts = name.split('/');

  var newName = rmExt(str);
  if (parts[parts.length - 1][0] === '.') {
    return;
  }

  function byType(parts) {
    var cat = fleck.singularize(parts.shift());
    var name;

    parts.push(cat);
    name = buildName(cat, parts);

    return {
      name: newName,
      cat: cat
    }
  }

  function byPod(parts) {
    var cat, section, name;

    if (parts.length > 1) {
      if (parts[0] === options.podModulePrefix) {
        cat = parts.slice(-1)[0];
        section = parts.shift();
      } else if (parts[0] === 'components' && parts.length > 2) {
        return byComponentPod(parts);
      } else {
        return byType(parts);
      }
    } else {
      cat = parts[0];
    }

    return {
      name: buildName(cat, parts),
      cat: cat
    }
  }

  function byComponentPod(parts) {
    var cat = parts.pop();

    if (cat !== 'template') {
      parts.shift();
      parts.push(fleck.singularize(cat));
    }

    return {
      name: buildName(cat, parts),
      cat: cat
    }
  }

  function buildName(cat, parts) {
    var name;

    if (cat === 'template') {
      if (parts.indexOf('template') !== -1) {
        parts.pop();
      }
      name = parts.join('/');
    }
    else {
      name = fleck.objectify(parts.join('/'));
    }

    return newName;
  }

  return byPod(parts);
};
