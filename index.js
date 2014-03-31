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

function remapFile(browserify, alias, file) {
    var relativeFile = stripFolder(alias.cwd, file),
        expose = path.join(alias.expose, relativeFile),
        exposeWithoutExtension = stripFileExtension(expose);

    browserify.require(path.resolve(file),  {expose: exposeWithoutExtension});
}

function remapFiles(browserify, alias, files) {
    files
        .filter(matchesAlias.bind(null, alias.cwd))
        .forEach(remapFile.bind(null, browserify, alias));
}

module.exports = function (browserify, options, done) {
    var aliases = Array.isArray(options) ? options : [ options ];

    aliases.forEach(function (alias) {
        var globPattern = path.join(alias.cwd, alias.pattern),
            files = glob.sync(globPattern);

        remapFiles(browserify, alias, files);
    });
};
