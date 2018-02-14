module.exports = function() {

    $.gulp.task('image:build', function () {
        $.gulp.src($.paths.src.img)
            .pipe($.gp.imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [$.gp.imageminPngquant()],
                interlaced: true
            }))
            .pipe($.gulp.dest($.paths.build.imgNoCompression))
            .pipe($.gulp.dest($.paths.build.imgCompression));
    });

    $.gulp.task('image:dev', function () {
        $.gulp.src($.paths.src.img)
            .pipe($.gp.imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [$.gp.imageminPngquant()],
                interlaced: true
            }))
            .pipe($.gulp.dest($.paths.dev.img))
            .pipe($.reload({stream: true}));
    });

};