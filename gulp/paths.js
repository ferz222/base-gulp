module.exports = {
    build: {
        htmlCompression: $.buildFolderCompression + '/',
        htmlNoCompression: $.buildFolderNoCompression + '/',

        jsCompression: $.buildFolderCompression + '/js/',
        jsNoCompression: $.buildFolderNoCompression + '/js/',

        cssCompression: $.buildFolderCompression + '/css/',
        cssNoCompression: $.buildFolderNoCompression + '/css/',

        imgCompression: $.buildFolderCompression + '/img/',
        imgNoCompression: $.buildFolderNoCompression + '/img/',

        fontsCompression: $.buildFolderCompression + '/fonts/',
        fontsNoCompression: $.buildFolderNoCompression + '/fonts/'
    },
    dev: {
        html: $.devFolder + '/',
        js: $.devFolder + '/js/',
        css: $.devFolder + '/css/',
        img: $.devFolder + '/img/',
        fonts: $.devFolder + '/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: [
            'bower_components/jquery/dist/jquery.js',
            'src/style/partials/**/*.js',
            'src/js/partials/*.js',
            'src/js/main.js'
        ],
        style: [
            'src/style/*.scss'
        ],
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: ['src/js/**/*.js', 'src/style/partials/**/*.js'],
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    browsers: ['last 3 chrome versions', 'last 3 edge versions', 'last 3 firefox versions', 'last 3 safari versions', 'last 3 ios versions', 'last 3 android versions']
    // browsers: ['last 2 versions', 'not dead']
};