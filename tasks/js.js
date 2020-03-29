const gulp = require('gulp');
const gulpIf = require('gulp-if');
const bowerFiles = require('main-bower-files');
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
const eslint = require('gulp-eslint');
const order = require('gulp-order');
const babel = require('gulp-babel');
const eventStream = require('event-stream');
const sourcemaps = require('gulp-sourcemaps');
// const uglify = require('gulp-uglify');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const config = require('../package').gulp;
const replace = require('gulp-replace');

const fetchVendorJs = () => {
  return gulp
    .src(bowerFiles(config.selectors.js))
    .pipe(concat(config.vendor.js));
};

const validateLocalJs = () => {
  // return gulp.src([`${config.src.js}${config.selectors.js}`, '!**/*/pixi.js'])
  return gulp
    .src(`${config.src.js}${config.selectors.js}`)
    .pipe(eslint())
    .pipe(eslint.format());
  // .pipe(eslint.result((result) => console.log(`ESLint result: ${result.filePath}`)))
  // .pipe(eslint.results((results) => {
  //   console.log(`Total Results: ${results.length}`);
  //   console.log(`Total Warnings: ${results.warningCount}`);
  //   console.log(`Total Errors: ${results.errorCount}`);
  // }));
  // .pipe(eslint.failAfterError());
  // .pipe(jshint())
  // .pipe(jshint.reporter('jshint-stylish', { beep: true }));
};

const fetchLocalJs = () => {
  return validateLocalJs()
    .pipe(order([config.main.js, config.selectors.js]))
    .pipe(babel({ presets: ['env'], ignore: ['**/*/pixi.js'] }));
};

const buildJs = () => {
  const vendorJs = fetchVendorJs();
  const localJs = fetchLocalJs();

  return eventStream
    .merge(vendorJs, localJs)
    .pipe(order([config.vendor.js, '**/*/pixi.js', config.selectors.js])) // .pipe(order(['**/*/pixi.js', config.vendor.js, config.selectors.js]))
    .pipe(gulpIf(global.production, replace('http://localhost:4000', process.env.API_URL)))
    .pipe(concat(config.output.js))
    .pipe(sourcemaps.init())
    .pipe(gulpIf(global.production, uglify({ output: { max_line_len: false } })))
    .pipe(gulpIf(global.production, rename({ suffix: '.min' })))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest.js))
    .pipe(gulpIf(!global.production, browserSync.stream()));
};

gulp.task('build-js', buildJs);
module.exports = buildJs;
