'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'),
    plumber = require('gulp-plumber'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    gulpsync = require('gulp-sync')(gulp),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

// Paths

var isDev = true, buildFolder = isDev ? 'dev' : 'build';

var path = {
    build: {
        html: buildFolder + '/',
        js: buildFolder + '/js/',
        css: buildFolder + '/css/',
        img: buildFolder + '/img/',
        fonts: buildFolder + '/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './' + buildFolder
};

// Server config
var config = {
    server: {
        baseDir: "./dev"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "gulp_test"
};


// ERROR HANDLER
var _gulpsrc = gulp.src;
gulp.src = function() {
    return _gulpsrc.apply(gulp, arguments)
    .pipe(plumber({
        errorHandler: function(err) {
            console.error(err.message);
            browserSync.notify(err.message, 15000); // Display error in the browser
            this.emit('end'); // Prevent gulp from catching the error and exiting the watch process
        }
    }));
};

// Start server task
gulp.task('webserver', function () {
    browserSync(config);
});

// Clean build dir task
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

// Build html
gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

// Build JS
gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init()) 
        .pipe(uglify()) 
        .pipe(sourcemaps.write()) 
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

// Build styles
gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

// Build images
gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

// Build fonts
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});


// Run watchers
gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});


// Run build
gulp.task('buildProject', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);

// Dev task
gulp.task('dev', function(){
    isDev = true;
    console.log('Run DEV');
    gulp.start(gulpsync.sync(['clean', ['buildProject', 'webserver', 'watch']]));
});

// Build production task
gulp.task('build', function(){
    isDev = false;
    console.log('Run Build');
    gulp.start(gulpsync.sync(['clean', ['buildProject']]));
});