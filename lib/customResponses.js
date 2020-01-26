function customResponses(req, res, next) {
  res.notFound = function notFound(message) {
    const err = new Error('Not Found');
    err.status = 404;
    err.message = message || err.message;

    throw err;
  };

  res.badRequest = function badRequest() { // error as an arguement
    const err = new Error('Bad Request');
    err.status = 400;
    // err.status = error;

    throw err;
  };

  res.unauthorized = function unauthorized(message) {
    const err = new Error('Unauthorized');
    err.status = 401;
    err.message = message || err.message;

    throw err;
  };

  next();
}

module.exports = customResponses;
