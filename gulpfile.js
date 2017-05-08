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

//modules
const browserSync = require('browser-sync').create();
const path = require('path');
const del = require('del');

//directory path
const assets = 'assets';
const public = 'public';
const destStyles = 'public/stylesheets';
const destImg = 'public/images';
const destScripts = 'public/js';
const destTemplates = 'public/templates';
const images = 'assets/img/**';
const templates = 'assets/templates/**/*.pug';
const styles = 'assets/styles/main.styl';
const scripts = 'assets/s/**/*.coffee';

gulp.task('styles', function () {
    return gulp.src(styles)
        .pipe(sourceMap.init())
        .pipe(stylus())
        .pipe(sourceMap.write('.'))
        .pipe(gulp.dest(destStyles));
});
//TODO: concat castom and vendor css files in public folder and minificate

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

gulp.task('templates', function () {
    return gulp.src(templates,{since:gulp.lastRun('templates')})
        .pipe(newer(destTemplates))
        .pipe(debug({title:'templates'}))
        .pipe(pug())
        .pipe(gulp.dest(destTemplates));
});

gulp.task('clean', function () {
    return del(destStyles,destScripts);
});

gulp.task('watch', function () {
    gulp.watch('assets/styles/**/*.styl',gulp.series('styles'));
    gulp.watch(images,gulp.series('images'));
    gulp.watch(scripts,gulp.series('scripts'));
    gulp.watch(templates,gulp.series('templates'));
});

gulp.task('build',gulp.series('clean',
    gulp.parallel('styles','images','scripts','templates'))
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


