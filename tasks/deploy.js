const gulp = require('gulp');

const deploy = (done) => {
  global.production = true;
  done();
};

gulp.task('deploy', gulp.series(deploy, 'build-app'));
module.exports = deploy;