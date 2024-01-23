const gulp = require('gulp');
const serve = require('./serve');
const watch = require('./watch');

const defaultTask = (done) => {
  gulp.series(serve, watch);
  done();
};

gulp.task('default', gulp.series('build-app', gulp.series(serve, watch)));
module.exports = defaultTask;
