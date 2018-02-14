'use strict';

// through2 is a thin wrapper around node transform streams
var through = require('through2');
var gutil = require('gulp-util');
var path = require('path');
var glob = require('glob');
var PluginError = gutil.PluginError;

// Consts
const PLUGIN_NAME = 'html-build';
var AllJsFiles = [];
var options = {
    tag: '<!--BOTTOM JS HERE-->',
    type: 'js'
};


var htmlSetJs = function (file, enc, cb) {
    if (file.isNull()) {
        console.log('file empty');
        return cb(null, file);
    }
    if (AllJsFiles.length == 0) {
        console.log('No Js files');
        return cb(null, file);
    }

    var stringJs = '';
    for (var i = AllJsFiles.length - 1; i >= 0; i--) {
        var jsFile = AllJsFiles[i];
        if(options.type === 'js')
            stringJs += '<script src="js/' + jsFile.base + '"></script>' + "\n\t";
        else if(options.type === 'css')
            stringJs += '<link rel="stylesheet" type="text/css" href="css/' + jsFile.base + '"/>' + "\n\t";
    }

    file.contents = new Buffer(file.contents.toString().replace(options.tag, stringJs));

    cb(null, file);
};

// Plugin level function(dealing with files)
function gulpPrefixer(js, opt) {

    if (opt != undefined)
        Object.assign(options, opt);

    if (!js) {
        throw new PluginError(PLUGIN_NAME, 'Missing JS files!');
    }

    for (var i = js.length - 1; i >= 0; i--) {
        var match = new glob.Glob(js[i], {sync: true});
        if (match.found.length === 0)
            continue;

        if (match.found.length == 1)
            AllJsFiles.push(path.parse(match.found[0]));
        else {
            for (var i1 = match.found.length - 1; i1 >= 0; i1--) {
                AllJsFiles.push(path.parse(match.found[i1]));
            }
        }
    }

    // console.log(AllJsFiles);

    return through.obj(htmlSetJs);
}

// Exporting the plugin main function
module.exports = gulpPrefixer;