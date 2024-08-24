import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import sass from 'sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcss from 'gulp-postcss';

import imagemin from 'gulp-imagemin';
import gulpAvif from 'gulp-avif';
import webp from 'gulp-webp';

import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';

const { src, dest, watch, series } = gulp;

// Funciones
function css() {
    return src('./src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(gulpSass(sass)())
        .pipe(postcss([autoprefixer({ overrideBrowserslist: ['last 1 version'] }), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(dest('./build/css'));
}

function imagen() {
    return src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(dest('./build/img'));
}

function versionAvif() {
    return src('./src/img/**/*.{png,jpg,svg}')
        .pipe(gulpAvif())
        .pipe(dest('./build/img/'));
}

function versionWebp() {
    return src('./src/img/**/*.{png,jpg,svg}')
        .pipe(webp())
        .pipe(dest('./build/img/'));
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
    watch('./src/img/**/*', imagen);
}

export {css,dev,imagen,versionAvif,versionWebp,font,woff,woff2};

export default series(imagen, versionAvif, versionWebp, font, woff2, css, dev);
