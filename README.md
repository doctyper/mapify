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

### options
Array or object wich defines an alias mapping.

#### `cwd`
Entry point for the alias.

#### `pattern`
Glob pattern.

#### `expose` (optional)
Name of the alias.
