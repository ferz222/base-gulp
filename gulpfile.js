'use strict';

global.$ = {
    buildFolder: 'build',
    buildFolderCompression: 'build/compression',
    buildFolderNoCompression: 'build/no-compression',
    devFolder: 'dev',
    fs: require('fs'),
    task: require('./gulp/tasks.js'),
    gulp: require('gulp'),
    watch: require('gulp-watch'),
    gp: require('gulp-load-plugins')({
        overridePattern: true,
        pattern: ['gulp-*', 'gulp.*', '@*/gulp{-,.}*', 'rimraf', 'doiuse', 'imagemin-pngquant']
    })
};

global.$.myPlugin = require("./gulp-plugins/my-plugin.js");
global.$.myReplace = require("./gulp-plugins/my-replace.js");
global.$.paths    = require('./gulp/paths');
global.$.gulpSync = require('gulp-sync')($.gulp);

//browser sync for dev
global.$.browserSync = require("browser-sync");
global.$.reload = $.browserSync.reload;

$.task.forEach(function(taskPath) {
    require(taskPath)();
});

// ERROR HANDLER
var _gulpsrc = $.gulp.src;
$.gulp.src = function () {
    return _gulpsrc.apply($.gulp, arguments)
        .pipe($.gp.plumber({
            errorHandler: function (err) {
                console.error(err.message);
                $.browserSync.notify(err.message, 15000); // Display error in the browser
                this.emit('end'); // Prevent gulp from catching the error and exiting the watch process
            }
        }));
};



// Run build
$.gulp.task('build:run', $.gulp.series(
    'js:build',
    'html:build',
    'style:build',
    'fonts:build',
    'image:build'
));

// Run dev
$.gulp.task('dev:run', $.gulp.parallel(
    'js:dev',
    'html:dev',
    'style:dev',
    'fonts:dev',
    'image:dev',
    'web_server',
    'watch'
));

// Dev task
$.gulp.task('dev', $.gulp.series('clean:dev', 'dev:run'));

// Build task
$.gulp.task('build', $.gulp.series('clean:build', 'build:run'));