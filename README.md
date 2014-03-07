Ember Stream Generators
==============================

This generator set is used to create an ember index.

Ripped out of [this project](https://github.com/rpflorence/loom-ember).

## Usage

```js
var esg = require('ember-stream-generator');
var fs = require)('fs');
esg('path/to/app', 'path/to/optional/template.hbs').pipe(fs.createReadStream('output/path'));
```