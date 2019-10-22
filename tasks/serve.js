const gulp        = require('gulp');
const nodemon     = require('gulp-nodemon');
const browserSync = require('browser-sync').create();
const config      = require('../package').gulp;

const serve = () => {
  let started = false;

  browserSync.init(null, {
    proxy: 'http://localhost:4000',
    files: ['public/**/*.*'],
    browser: 'google chrome',
    port: 7000,
    reloadDelay: 1000
  });

  return nodemon({
    script: config.main.server,
    ignore: [config.destDir, config.srcDir],
    env: { NODE_ENV: 'development' }
  })
  .on('start', () => !started ? browserSync.reload() : started = false)
  .on('restart', () => console.log('Nodemon Restarted!'));
};

gulp.task('serve', serve);
module.exports = serve;
