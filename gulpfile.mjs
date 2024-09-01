import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as sass from 'sass'; 
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcss from 'gulp-postcss';


import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';

const { src, dest, watch, series } = gulp;

const sassCompiler = gulpSass(sass);

// Funciones
function css() {
    return src('./src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sassCompiler().on('error', sassCompiler.logError)) 
        .pipe(postcss([autoprefixer({ overrideBrowserslist: ['last 1 version'] }), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./build/css'));
}


function font() {
    return src('./src/font/**/*')
        .pipe(dest('./build/font/'));
}

function woff() {
    return src('./src/font/**/*')
        .pipe(ttf2woff())
        .pipe(dest('./build/font/'));
}

function woff2() {
    return src('./src/font/**/*')
        .pipe(ttf2woff2())
        .pipe(dest('./build/font/'));
}

function dev() {
    watch('./src/scss/**/*.scss', css);
}

export { css, dev, font, woff, woff2 };

export default series(font, woff2, css, dev);
