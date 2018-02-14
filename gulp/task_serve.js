module.exports = function() {

    // Server config
    var config = {
        server: {
            baseDir: "./" + $.devFolder
        },
        tunnel: false,
        host: 'localhost',
        port: 9000,
        logPrefix: "gulp_test"
    };

    // Start server task
    $.gulp.task('web_server', function () {
        $.browserSync(config);
    });

};