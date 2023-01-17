const gulp = require('gulp');
const config = require('../package').gulp;

const watch = (done) => {
  gulp.watch([`${config.src.scss}${config.selectors.scss}`, `${config.src.scss}${config.main.scss}`], gulp.series('build-css'));
  gulp.watch(`${config.src.js}${config.selectors.js}`, gulp.series('build-js'));
  gulp.watch(`${config.src.images}${config.selectors.images}`, gulp.series('build-images'));
  gulp.watch(`${config.src.fonts}${config.selectors.fonts}`, gulp.series('build-fonts'));
  gulp.watch(`${config.src.js}${config.selectors.html}`, gulp.series('build-partials'));
  gulp.watch(`${config.srcDir}${config.main.index}`, gulp.series('build-index'));
  done();
};

gulp.task('watch', watch);
module.exports = watch;
