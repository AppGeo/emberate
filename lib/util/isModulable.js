fileBlacklist = ['app.js', 'index.js'];

module.exports = function(path) {
  var parts = path.split('/');
  return !(/^\./.test(parts[parts.length - 1]) || fileBlacklist.indexOf(path) !== -1);
}
