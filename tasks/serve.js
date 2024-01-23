const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const config = require('../package').gulp;
const { env } = require('../config/environment');
const browserSync = require('browser-sync').create();

const nodemonConfig = {
  script: config.main.server,
  ignore: [config.destDir, config.srcDir],
  env: { NODE_ENV: env }
};

const browserSyncConfig = {
  proxy: 'http://localhost:4000',
  files: ['public/**/*.*'],
  browser: 'google chrome',
  port: 3000,
  reloadDelay: 600,
  open: true
};

const serve = (done) => {
  let started = false;
  nodemon(nodemonConfig).on('start', () => (!started ? started = true : browserSync.reload()));
  done();
  return browserSync.init(null, browserSyncConfig);
};

gulp.task('serve', serve);
module.exports = serve;
