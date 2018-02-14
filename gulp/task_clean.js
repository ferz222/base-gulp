module.exports = function() {

    $.gulp.task('clean:build', function (cb) {
        $.gp.rimraf($.buildFolder, cb);
    });

    $.gulp.task('clean:dev', function (cb) {
        $.gp.rimraf($.devFolder, cb);
    });

};