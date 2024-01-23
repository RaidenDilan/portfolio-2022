const gulp = require('gulp');
const gulpIf = require('gulp-if');
const bowerFiles = require('main-bower-files');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const order = require('gulp-order');
const babel = require('gulp-babel');
const eventStream = require('event-stream');
const sourcemaps = require('gulp-sourcemaps');
const stripJsComments = require('gulp-strip-comments');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const replace = require('gulp-replace');
const config = require('../package').gulp;

const fetchVendorJs = () => {
  return gulp
    .src(bowerFiles())
    .pipe(stripJsComments())
    .pipe(order([
      config.vendor.gsap,
      config.vendor.preloadjs,
      config.vendor.lethargyjs,
      config.vendor.smoothscrolling
    ]))
    .pipe(concat(config.output.vendor));
};

const validateLocalJs = () => {
  return gulp
    .src(`${config.src.js}${config.selectors.js}`)
    .pipe(eslint())
    .pipe(eslint.format('stylish'));
};

const fetchLocalJs = () => {
  return validateLocalJs()
    .pipe(order([
      config.selectors.pixi,
      config.selectors.js,
      config.main.js
    ]))
    .pipe(babel({ presets: ['env'], ignore: [config.selectors.pixi] }))
    .pipe(concat(config.output.js));
};

const buildJs = () => {
  const vendorJs = fetchVendorJs();
  const localJs = fetchLocalJs();

  return eventStream
    .merge(vendorJs, localJs)
    .pipe(order([config.vendor.js, config.selectors.js]))
    .pipe(gulpIf(global.production, replace('http://localhost:4000', process.env.API_URL)))
    .pipe(gulpIf(global.production, concat(config.output.js)))
    .pipe(sourcemaps.init())
    .pipe(gulpIf(global.production, uglify({ output: { max_line_len: false } })))
    .pipe(gulpIf(global.production, rename({ suffix: '.min' })))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest.js))
    .pipe(gulpIf(!global.production, browserSync.stream()));
};

gulp.task('build-js', buildJs);
module.exports = buildJs;
