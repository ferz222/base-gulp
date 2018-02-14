'use strict';

// through2 is a thin wrapper around node transform streams
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

// Consts
const PLUGIN_NAME = 'my-html-replace';

function gulpPrefixer(replace) {

    if (!replace) {
        throw new PluginError(PLUGIN_NAME, 'Missing prefix text!');
    }

    // Creating a stream through which each file will pass
    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            // return empty file
            return cb(null, file);
        }
        if (file.isBuffer()) {
            Object.keys(replace).forEach(function (replaceFrom) {
                var replaceTo = replace[replaceFrom];
                file.contents = new Buffer(file.contents.toString().replace(replaceFrom, replaceTo));
            })
        }

        cb(null, file);

    });

}
module.exports = gulpPrefixer;