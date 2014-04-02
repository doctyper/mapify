'use strict';
var glob = require('glob'),
    path = require('path');

function matchesAlias(folder, file) {
    return file.indexOf(folder) === 0;
}

function stripFileExtension(file) {
    return file.substring(file, file.lastIndexOf('.'));
}

function stripFolder(folder, file) {
    return file.substr(folder.length);
}

function remapFile(browserify, pathSeparator, alias, file) {
    var relativeFile = stripFolder(alias.cwd, file),
        regexp = new RegExp('\\' + path.sep, 'g'),
        expose = path.join(alias.expose, relativeFile),
        exposeWithoutExtension = stripFileExtension(expose),
        exposeWithSeparator = exposeWithoutExtension.replace(regexp, pathSeparator),
        exposeWithSeparatorAndExtension = expose.replace(regexp, pathSeparator);

    browserify.require(path.resolve(file),  {expose: exposeWithSeparator});
    browserify.require(path.resolve(file),  {expose: exposeWithSeparatorAndExtension});
}

function remapFiles(browserify, pathSeparator, alias, files) {
    files
        .filter(matchesAlias.bind(null, alias.cwd))
        .forEach(remapFile.bind(null, browserify, pathSeparator, alias));
}

module.exports = function (browserify, options) {
    var pathSeparator = options.pathSeparator || path.sep,
        aliases = Array.isArray(options) ? options : options.entries || [ options ];

    aliases.forEach(function (alias) {
        var globPattern = path.join(alias.cwd, alias.pattern),
            files = glob.sync(globPattern);

        remapFiles(browserify, pathSeparator, alias, files);
    });
};
