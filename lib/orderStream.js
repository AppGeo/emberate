'use strict';

var through = require('through2');

module.exports = function (options) {
  var out = {};
  var order = [
    'template',
    'initializer',
    'helper',
    'mixin',
    'transform',
    'serializer',
    'adapter',
    'model',
    'component',
    'controller',
    'route',
    'view'
  ];

  function prioritize(category) {
    var podKeys = [];
    var notPods = [];

    var pods = category.filter(function (item) {
      if (item && item.path.indexOf(options.podModulePrefix) > -1) {
        podKeys.push(item.name);
        return true;
      } else {
        notPods.push(item);
        return false;
      }
    });

    return notPods.filter(function (item) {
      return podKeys.indexOf(item.name) > -1 ? false : true;
    }).concat(pods);
  }

  return through.obj(function (chunk, _, next) {
    if (!(chunk.cat in out)) {
      out[chunk.cat] = [];
    }

    out[chunk.cat].push(chunk);
    next();
  }, function (next) {
    this.push(true);

    order.forEach(function (item) {
      var prioritized;

      if (item in out && Array.isArray(out[item])) {
        prioritized = prioritize(out[item]);
        this.push(prioritized);
      }
    }, this);

    next();
  });
};

