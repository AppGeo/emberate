module.exports = function isAddon(path) {
  return /^ember-addon\:/i.test(path);
}
