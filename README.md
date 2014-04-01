[![Build Status](https://travis-ci.org/lusini/mapify.png?branch=master)](https://travis-ci.org/lusini/mapify)
[![Dependencies](https://david-dm.org/lusini/mapify.png)](https://david-dm.org/lusini/mapify)
[![NPM version](https://badge.fury.io/js/mapify.png)](http://badge.fury.io/js/mapify)

mapify
======

A browserify plugin to create alias mappings for directories.

## Usage
```js
var browserify = require('browserify'),
    b = browserify(__dirname);

b.plugin('mapify', {
    cwd: 'foo/bar/app',
    pattern: '**/*.js',
    expose: 'app'
});

b.bundle();

// this maps e.g. foo/bar/app/index.js to app/index
```

The aliases are built with `path.join` so they will use the system's path separator. You can also override the path separator (e.g. you're on Windows but prefer forward slashes).

```js
var browserify = require('browserify'),
    b = browserify(__dirname);

b.plugin('mapify', {
    pathSeparator: '/',
    entries: [{
      cwd: 'foo/bar/app',
      pattern: '**/*.js',
      expose: 'app'
    }]
});

b.bundle();

// this maps e.g. foo\\bar\\app\\index.js to app/index
```

### options
An array or object which defines an alias mapping.

#### `cwd`
Entry point for the alias.

#### `pattern`
Glob pattern.

#### `expose`
Name of the alias.

#### `pathSeparator`
String to override system's path separator.

#### `entries`
Array of alias mappings.
