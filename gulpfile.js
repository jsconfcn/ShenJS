var path = require('path');
var http = require('http');

var ncp = require('ncp').ncp;
var openBrowser = require('open');
var connect = require('connect');
var Metalsmith = require('metalsmith');

var gulp = require('gulp');
var mkdirp = require('mkdirp');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var merge = require('merge-stream');
var log = gutil.log;
var colors = gutil.colors;

var site = require(path.resolve(__dirname, 'site.json'));
var siteJS = site.assets.vendor.js.concat(site.assets.custom.js);
var siteCSS = site.assets.vendor.css.concat(site.assets.custom.scss);

/*
 * Tasks
 */
gulp.task('prepare', function(callback) {
    mkdirp(site.destination, callback);
});

gulp.task('clean', function() {
    gulp.src(site.destination, {read: false})
        .pipe(clean());
})

gulp.task('js', function() {
    gulp.src(siteJS)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./public/assets'));
});

gulp.task('css', function() {
    var vendor = gulp.src(site.assets.vendor.css);

    var custom = gulp.src(site.assets.custom.scss)
                     .pipe(sass({ includePaths: require('eggshell').includePaths }));

    return merge(vendor, custom)
           .pipe(concat('styles.css'))
           .pipe(gulp.dest('./public/assets'));
});

//
gulp.task('metalsmith', function(callback) {
    var metalsmith = new Metalsmith(process.cwd());
    var plugins = site.metalsmith || {};
    metalsmith.source(site.source);
    metalsmith.destination(site.destination);
    metalsmith.metadata(site.metadata);
    Object.keys(plugins).forEach(function(key) {
        var plugin;
        var opts = plugins[key];

        plugin = require(key);

        metalsmith.use(plugin(opts));
    });

    metalsmith.build(function(err){
        if (err) return callback(err);
        callback();
    });
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['css', 'js', 'metalsmith']);

gulp.task('development', ['css', 'js', 'metalsmith'], function(callback) {
    var devApp, devServer, devAddress, devHost, url;
    devApp = connect()
    .use(connect.logger('dev'))
    .use(connect.static(site.destination));

    // change port and hostname to something static if you prefer
    devServer = http.createServer(devApp).listen(gutil.env.port || 0 /*, hostname*/);

    devServer.on('error', function(error) {
        log(colors.underline(colors.red('ERROR'))+' Unable to start server!');
        callback(error); // we couldn't start the server, so report it and quit gulp
    });

    devServer.on('listening', function() {
        devAddress = devServer.address();
        devHost = devAddress.address === '0.0.0.0' ? 'localhost' : devAddress.address;
        url = ('http://' + devHost + ':' + devAddress.port);

        log('Started dev server at '+colors.magenta(url));
        if(gutil.env.open) {
            log('Opening dev server URL in browser');
            openBrowser(url);
        } else {
            log(colors.gray('(Run with --open to automatically open URL on startup)'));
        }
        log('Done');
        callback(); // we're done with this task for now
    });

    // Watching files
    gulp.watch(siteJS, ['js']);
    gulp.watch(siteCSS, ['css']);
    gulp.watch(['./public/**/*', './templates/**/*', './source/**/*'], ['metalsmith']);
});
