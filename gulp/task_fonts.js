module.exports = function() {

    $.gulp.task('fonts:build', function() {
        $.gulp.src($.paths.src.fonts)
            .pipe($.gulp.dest($.paths.build.fontsCompression))
            .pipe($.gulp.dest($.paths.build.fontsNoCompression));
    });

    $.gulp.task('fonts:dev', function() {
        $.gulp.src($.paths.src.fonts)
            .pipe($.gulp.dest($.paths.dev.fonts));
    });

};