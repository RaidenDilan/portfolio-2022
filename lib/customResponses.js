function customResponses(req, res, next) {
  res.notFound = function notFound(message) {
    const err = new Error('Not Found');
    err.status = 404;
    err.message = message || err.message;

    throw err;
  };

  res.badRequest = function badRequest(url, errors) {
    req.flash('alert', errors);
    return res.redirect(url);
  };

  res.unauthorized = function unauthorized(url='/login', message='You must be logged in') {
    req.flash('alert', message);
    return res.redirect(url);
  };

  return next();
}

module.exports = customResponses;
