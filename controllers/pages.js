function homeRoute(req, res) {
  return res.render('home');
}

function aboutRoute(req, res) {
  return res.render('about');
}

function topPaddockRoute(req, res) {
  return res.render('top-paddock');
}

function bandSomeRoute(req, res) {
  return res.render('band-some');
}

module.exports = {
  home: homeRoute,
  about: aboutRoute,
  topPaddock: topPaddockRoute,
  bandSome: bandSomeRoute
};
