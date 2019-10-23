function homeRoute(req, res) {
  res.render('home');
}

function aboutRoute(req, res) {
  res.render('about');
}

function topPaddockRoute(req, res) {
  res.render('top-paddock');
}

function bandSomeRoute(req, res) {
  res.render('band-some');
}

module.exports = {
  home: homeRoute,
  about: aboutRoute,
  topPaddock: topPaddockRoute,
  bandSome: bandSomeRoute
};
