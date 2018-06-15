module.exports = function() {
    $.gulp.task('watch', function(){
        $.watch([$.paths.watch.html], $.gulp.series('html:dev'));
        $.watch([$.paths.watch.style], $.gulp.series('style:dev'));
        $.watch($.paths.watch.js, $.gulp.series('js:dev'));
        $.watch([$.paths.watch.img], $.gulp.series('image:dev'));
        $.watch([$.paths.watch.fonts], $.gulp.series('fonts:dev'));
    });
};