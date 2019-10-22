const gulp        = require('gulp');
const gulpIf      = require('gulp-if');
const htmlhint    = require('gulp-htmlhint');
const htmlmin     = require('gulp-htmlmin');
const inject      = require('gulp-inject');
const browserSync = require('browser-sync');
const config      = require('../package').gulp;

const validateIndex = () => {
  return gulp
    .src(`${config.srcDir}${config.selectors.html}`)
    // .pipe(inject(gulp.src(['./*.js', './docs/*.docx'], { read: false }), {
    //   transform: function(filepath) {
    //     if (filepath.slice(-5) === '.docx') return '<li><a href="' + filepath + '">' + filepath + '</a></li>';
    //     // Use the default transform as fallback:
    //     return inject.transform.apply(inject.transform, arguments);
    //   }
    // }))
    .pipe(htmlhint({ 'doctype-first': false, 'attr-lowercase': ['viewBox'] }))
    .pipe(htmlhint.reporter('htmlhint-stylish'));
};

const buildIndex = () => {
  const js  = require('./js')();
  const css = require('./css')();

  return validateIndex()
    // write first to get relative path for inject
    .pipe(gulp.dest(config.destDir))
    .pipe(inject(js, { relative: true, addRootSlash: true }))
    .pipe(inject(css, { relative: true, addRootSlash: true }))
    .pipe(gulpIf(global.production, htmlmin({ collapseWhitespace: true, removeComments: true })))
    .pipe(gulp.dest(config.destDir))
    .pipe(gulpIf(!global.production, browserSync.stream()));
};

gulp.task('build-index', buildIndex);
module.exports = buildIndex;
