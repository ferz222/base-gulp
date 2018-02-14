module.exports = function() {

    $.gulp.task('html:build', function () {
        $.gulp.src($.paths.src.html)
            .pipe($.gp.rigger())
            .pipe($.myPlugin($.paths.src.js))
            .pipe($.myReplace({
                '<!--TOP STYLE HERE-->':   '<link rel="stylesheet" type="text/css" href="css/main.css"/>'
            }))
            .pipe($.gulp.dest($.buildFolderNoCompression));

        $.gulp.src($.paths.src.html)
            .pipe($.gp.rigger())
            .pipe($.myReplace({
                '<!--BOTTOM JS HERE-->': '<script src="js/all.min.js"></script>',
                '<!--TOP STYLE HERE-->': '<link rel="stylesheet" type="text/css" href="css/main.min.css"/>'
            }))
            .pipe($.gulp.dest($.buildFolderCompression));
    });

    $.gulp.task('html:dev', function () {
        $.gulp.src($.paths.src.html)
            .pipe($.gp.rigger())
            .pipe($.myPlugin($.paths.src.js))
            .pipe($.myReplace({
                '<!--TOP STYLE HERE-->':   '<link rel="stylesheet" type="text/css" href="css/main.css"/>'
            }))
            .pipe($.gulp.dest($.paths.dev.html))
            .pipe($.reload({stream: true}));
    });
};