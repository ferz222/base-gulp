module.exports = function() {

    $.gulp.task('js:build', function(){
        $.gulp.src($.paths.src.js)
            .pipe($.gp.rename({
                dirname: "./"
            }))
            .pipe($.gulp.dest($.paths.build.jsNoCompression))
            .pipe($.gp.concat('all.js'))
            .pipe($.gulp.dest($.paths.build.jsCompression))
            .pipe($.gp.uglify())
            .pipe($.gp.rename({suffix:'.min'}))
            .pipe($.gulp.dest($.paths.build.jsCompression));
    });

    $.gulp.task('js:dev', function(){
        $.gulp.src($.paths.src.js)
            .pipe($.gp.rename({
                dirname: "./"
            }))
            .pipe($.gulp.dest($.paths.dev.js))
            .pipe($.reload({stream: true}));
    });

};