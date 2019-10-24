function customResponses(req, res, next) {
  res.notFound = function notFound(message) {
    const err = new Error('Not Found');
    err.status = 404;
    err.message = message || err.message;

    throw err;
  };

  res.badRequest = function badRequest(url, errors) {
    // req.flash('alert', errors);
    return res.redirect(url);
  };

  next();
}

module.exports = customResponses;
