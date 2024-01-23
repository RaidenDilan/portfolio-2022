const gulp = require('gulp');
const clean = require('./clean');
const buildIndex = require('./index');
const buildFonts = require('./fonts');
const buildImages = require('./images');
const eventStream = require('event-stream');
const { isDevEnv } = require('../config/environment');

const buildApp = (done) => {
  global.production = !isDevEnv();
  eventStream.merge(
    buildIndex(),
    buildImages(),
    buildFonts()
  );
  done();
};

gulp.task('build-app', gulp.series(clean, buildApp));
module.exports = buildApp;
