//Comparto mi gulpfile.js compatible con v4, debido a que el código del video no corresponde a la versión actualizada, espero les sirva(esta muy lejos que sea perfecto)

'use strict'

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleancss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin');

gulp.task('sass', function() {
    return gulp.src('./css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});


// configuramos nuestra primera tarea de gulp
//la diferencia con grunt es que en gulp al definir una tarea va a usar el concepto de string
// donde va a tener el src donde comienza a procesar el flujo de archivos y luego se empieza a armar pipe ()
//hay que poner el return antes de src fuente consultada: https://www.hiberus.com/crecemos-contigo/introduccion-la-automatizacion-tareas-gulp-npm-iii/
gulp.task('sass:watch', function() {
    gulp.watch('./css/*.scss', gulp.series('sass'));
});

//Static server
gulp.task('browser-sync', function() {
    var files = ['./*.html', './css/*.css', './images/*.{png,jpg,gif,jpeg}', './js/*.js'];
    browserSync.init(files, {
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('clean', function() {
    return del(['distGulp']);
});

gulp.task('copyfonts', function() {
    return gulp.src('./node_modules/open-iconic/font/fonts/*.{ttf,woff,eof,svg,eot,otf}*')
        .pipe(gulp.dest('./distGulp/fonts'));
});

gulp.task('imagemin', function() {
    return gulp.src('./images/*.{png,jpg,jpeg,gif}', './images/catalogo/*.{png,jpg,jpeg,gif}', './images/catalogo/manchas/*.{png,jpg,jpeg,gif}', './images/catalogo/nina/*.{png,jpg,jpeg,gif}')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('distGulp/images'));
});

gulp.task('usemin', function() {
    return gulp.src('*.html')
        .pipe(flatmap(function(stream, file) {
            return stream
                .pipe(usemin({
                    css: [rev()],
                    html: [function() { return htmlmin({ collapseWhitespace: true }) }],
                    js: [uglify(), rev()],
                    inlinejs: [uglify()],
                    inlinecss: [cleancss(), 'concat']
                }));
        }))
        .pipe(gulp.dest('distGulp/'));
});

gulp.task('default', gulp.parallel('browser-sync', 'sass:watch'));
gulp.task('build', gulp.series('clean', 'copyfonts', 'imagemin', 'usemin'));