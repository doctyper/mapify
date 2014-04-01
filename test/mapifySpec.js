'use strict';
var path = require('path'),
    referee = require('referee'),
    refereeSinon = require('referee-sinon'),
    proxyquire = require('proxyquire'),
    sinon = require('sinon'),
    expect;

refereeSinon(referee, sinon);
expect = require('referee/lib/expect').bind(referee);

describe('mapify', function () {
    var mapify, browserify, glob;

    before(function () {
        glob = { sync: sinon.stub() };
        mapify = proxyquire('../index', {glob: glob});
    });


    beforeEach(function () {
        sinon.stub(path, 'resolve', function (file) { return file; });
        browserify = {
            require: sinon.stub()
        };
        glob.sync.returns([
            'foo/bar/baz.js',
            'foo/bar/qux/quux.js',
            'bar/foo/quux.js'
        ]);
    });

    afterEach(function () {
        path.resolve.restore();
    });

    it('should expose the configured aliases', function () {
        mapify(browserify, { cwd: 'foo/bar', pattern: '**/*.js', expose: 'exposed'});

        expect(browserify.require).toHaveBeenCalledTwice();
        expect(path.resolve).toHaveBeenCalledTwice();
        expect(browserify.require).toHaveBeenCalledWithExactly('foo/bar/baz.js', {expose: path.join('exposed', 'baz')});
        expect(browserify.require).toHaveBeenCalledWithExactly('foo/bar/qux/quux.js', {expose: path.join('exposed', 'qux', 'quux')});
    });

    it('should override the path separator', function() {
        mapify(browserify, {
            pathSeparator: '/', 
            entries: [ { cwd: 'foo/bar', pattern: '**/*.js', expose: 'exposed'} ]
        });

        expect(browserify.require).toHaveBeenCalledWithExactly('foo/bar/baz.js', {expose: 'exposed/baz'});
        expect(browserify.require).toHaveBeenCalledWithExactly('foo/bar/qux/quux.js', {expose: 'exposed/qux/quux'});

    });

    it('should override the path separator', function() {
        mapify(browserify, {
            pathSeparator: '\\', 
            entries: [ { cwd: 'foo/bar', pattern: '**/*.js', expose: 'exposed'} ]
        });

        expect(browserify.require).toHaveBeenCalledWithExactly('foo/bar/baz.js', {expose: 'exposed\\baz'});
        expect(browserify.require).toHaveBeenCalledWithExactly('foo/bar/qux/quux.js', {expose: 'exposed\\qux\\quux'});
    });

});
