Ember Generators (ember-tools)
==============================

This generator set is used in [ember-tools][1] to create the application
objects.

Installation
------------

`npm install loom-generators-ember --save`

The `--save` is important, loom needs to read your package.json to find
the generators.

Generator Examples
------------------

```sh
generate component x-buttonset
generate controller users/mini-profile
generate controller application type:array
generate helper capitalize
generate mixin queryable
generate route index
generate template profile
generate view index
```

That's pretty much everything.

Models were removed, I (or you) will be creating a different generator
set for ember-data models, serializers and adapters later.

Contributing
------------

I welcome pull requests :)

```sh
npm install
npm test
```

  [1]:https://github.com/rpflorence/ember-tools

