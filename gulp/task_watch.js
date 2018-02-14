module.exports = function() {
    $.gulp.task('watch', function(){
        $.watch([$.paths.watch.html], function(event, cb) {
            $.gulp.start('html:dev');
        });
        $.watch([$.paths.watch.style], function(event, cb) {
            $.gulp.start('style:dev');
        });
        $.watch($.paths.watch.js, function(event, cb) {
            console.log('path.watch.js');
            $.gulp.start('js:dev');
        });
        $.watch([$.paths.watch.img], function(event, cb) {
            $.gulp.start('image:dev');
        });
        $.watch([$.paths.watch.fonts], function(event, cb) {
            $.gulp.start('fonts:dev');
        });
    });
};