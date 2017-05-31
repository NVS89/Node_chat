/**
 * Created by Nick-PC on 06.05.2017.
 */
//gulp plagins
const gulp = require('gulp');
const stylus = require('gulp-stylus');
const pug = require('gulp-pug');
const coffee = require('gulp-coffeescript');
const gulpIf = require('gulp-if');
const gulpAutoprefixer = require('gulp-autoprefixer');
const sourceMap = require('gulp-sourcemaps');
const newer = require('gulp-newer');
const debug = require('gulp-debug');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const ngMin = require('gulp-ngmin');
const uglify = require('gulp-uglify');

//modules
const browserSync = require('browser-sync').create();
const path = require('path');
const del = require('del');

//directory path
const assets = 'assets';
const public = 'public';
const destStyles = 'public/styles';
const destImg = 'public/images';
const destScripts = 'public/js';
const destTemplates = 'public/templates';
const images = 'assets/img/**';
const templates = 'assets/templates/**/*.pug';
const styles = 'assets/styles/main.styl';
const scripts = 'assets/scripts/**/*.coffee';
const dist = 'public/dist';

//vendor libraries
const vendScriptLibs = [
    'vendor/angular/*.js',
    'vendor/angular-ui-router/release/*.js',
    'vendor/jquery/dist/*.js',
    'vendor/bootstrap/dist/js/*.js',
    'vendor/bootstrap/dist/js/*.js',
    'node_modules/socket.io-client/socket.io.js'
    //'node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js'
];

const vendStylesLibs = [
    'vendor/bootstrap/dist/css/*.css',
    'vendor/animate.css/*.css'
];

gulp.task('styles', function () {
    return gulp.src(styles)
        .pipe(sourceMap.init())
        .pipe(stylus())
        .pipe(sourceMap.write('.'))
        .pipe(gulp.dest(destStyles));
});

gulp.task('images',function () {
    return gulp.src(images,{since: gulp.lastRun('images')})
        .pipe(newer(destImg))
        .pipe(debug({title:images}))
        .pipe(imagemin())
        .pipe(gulp.dest(destImg));
});

gulp.task('scripts', function () {
    return gulp.src(scripts)
        .pipe(sourceMap.init())
        .pipe(coffee())
        .pipe(sourceMap.write('.'))
        .pipe(gulp.dest(destScripts));
});

//uncomment for template compiling
/*gulp.task('templates', function () {
    return gulp.src(templates,{since:gulp.lastRun('templates')})
        .pipe(newer(destTemplates))
        .pipe(debug({title:'templates'}))
        .pipe(pug())
        .pipe(gulp.dest(destTemplates));
});*/

gulp.task('copy_script', function () {
    return gulp.src(vendScriptLibs,{since:gulp.lastRun('scripts')})
        .pipe(debug({title:'vendor_scripts_copying'}))
        .pipe(gulp.dest(destScripts));
});

gulp.task('compress_script', function () {
    return gulp.src('public/js/*.js',{since:gulp.lastRun('scripts')})
        .pipe(newer('public/js/*.js'))
        .pipe(debug({title:'scripts_concat'}))
        .pipe(concat('all.js'))
        .pipe(debug({title:'ng-min'}))
        .pipe(ngMin())
        .pipe(debug({title:'uglify'}))
        .pipe(uglify({mangle:false}))
        .pipe(gulp.dest(dist));
});

gulp.task('copy_styles', function () {
    return gulp.src(vendStylesLibs,{since:gulp.lastRun('styles')})
        .pipe(debug({title:'vendor_styles_copying'}))
        .pipe(gulp.dest(destStyles));
});

gulp.task('concat_styles', function () {
    return gulp.src('public/styles/*.css',{since:gulp.lastRun('styles')})
        .pipe(newer('public/styles/*.css'))
        .pipe(debug({title:'styles_concat'}))
        .pipe(concat('all.css'))
        .pipe(gulp.dest(dist));
});

gulp.task('clean', function () {
    return del([destStyles,destScripts,dist]);
});

gulp.task('watch', function () {
    gulp.watch('assets/styles/*.styl',gulp.series('styles'));
    gulp.watch(images,gulp.series('images'));
    gulp.watch(scripts,gulp.series('scripts'));
   // gulp.watch(templates,gulp.series('templates')); //uncomment for template compiling
    gulp.watch('public/js/*.js',gulp.series('copy_script'/*,'compress_script'*/)); // uncomment for compressing js to dist folder
    gulp.watch('public/js/*.js',gulp.series('copy_styles','concat_styles'));
});

gulp.task('build',gulp.series('clean',
    gulp.parallel('styles','images','scripts'/*,'templates'*/,'copy_styles','copy_script') //uncomment for template compiling
    , 'concat_styles'
    //, 'compress_script' // uncomment for compressing js to dist folder
    )
);

gulp.task('serve',function () {
    browserSync.init({
       // server:'public'
        proxy: 'http://localhost:3000',
        port: 3001
    });
    browserSync.watch('public/**/*.*')
        .on('change',browserSync.reload);
});

gulp.task('dev', gulp.series('build',
    gulp.parallel('watch','serve')));


