const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const stripCssComments = require('gulp-strip-css-comments');
const minifycss = require('gulp-clean-css');
const bowerFiles = require('main-bower-files');
const concat = require('gulp-concat');
const eventStream = require('event-stream');
const order = require('gulp-order');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const gulpIf = require('gulp-if');
const browserSync = require('browser-sync');
const config = require('../package').gulp;

const fetchVendorCss = () => {
  return gulp
    .src(bowerFiles(config.selectors.css))
    .pipe(stripCssComments())
    .pipe(concat(config.vendor.css));
};

const fetchLocalCss = () => {
  return gulp
    .src(`${config.src.scss}${config.main.scss}`)
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer({ browsers: config.browserslist }))
    .pipe(concat(config.output.css));
};

const buildCss = () => {
  const vendorCss = fetchVendorCss();
  const localCss = fetchLocalCss();

  return eventStream
    .merge(vendorCss, localCss)
    .pipe(order([config.vendor.css, config.output.css]))
    .pipe(concat(config.output.css))
    .pipe(sourcemaps.init())
    .pipe(gulpIf(global.production, minifycss()))
    .pipe(gulpIf(global.production, rename({ suffix: '.min' })))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest.css))
    .pipe(gulpIf(!global.production, browserSync.stream()));
};

gulp.task('build-css', buildCss);
module.exports = buildCss;
