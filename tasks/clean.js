const gulp = require('gulp');
const clear = require('gulp-clean');
const config = require('../package').gulp;

const clean = () => {
  return gulp
    .src(config.destDir, { read: false, allowEmpty: true })
    .pipe(clear());
};

gulp.task('clean', clean);
module.exports = clean;
