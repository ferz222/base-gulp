module.exports = function() {

    $.gulp.task('style:build', function () {
        $.gulp.src($.paths.src.style)
            .pipe($.gp.sass({
                sourceMap: false,
                errLogToConsole: true
            }))
            .pipe($.gp.autoprefixer({
                browsers: $.paths.browsers
            }))
            .pipe($.gp.concat('main.css'))
            .pipe($.gulp.dest($.paths.build.cssCompression))
            .pipe($.gulp.dest($.paths.build.cssNoCompression))
            .pipe($.gp.rename({suffix: '.min'}))
            .pipe($.gp.cleanCss())
            .pipe($.gulp.dest($.paths.build.cssCompression));
    });

    $.gulp.task('style:dev', function () {
        $.gulp.src($.paths.src.style, {cwd: process.cwd()})
            .pipe($.gp.sourcemaps.init())
            .pipe($.gp.sass({
                outputStyle: 'compressed',
                sourceMap: true,
                errLogToConsole: true
            }))
            .pipe($.gp.autoprefixer({
                browsers: $.paths.browsers
            }))
            .pipe($.gp.postcss([
                $.gp.doiuse({
                    browsers: $.paths.browsers,
                    ignore: ['rem'],
                    ignoreFiles: ['**/normalize.css'],
                    onFeatureUsage: function (usageInfo) {
                        console.log(usageInfo.message)
                    }
                })
            ]))
            .pipe($.gp.sourcemaps.write())
            .pipe($.gp.concat('main.css'))
            .pipe($.gulp.dest($.paths.dev.css))
            .pipe($.reload({stream: true}));
    });

};