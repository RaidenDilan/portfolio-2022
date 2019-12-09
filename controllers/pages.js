function homeRoute(req, res) {
  return res.render('home');
}

function aboutRoute(req, res) {
  return res.render('about');
}

function resortsRoute(req, res) {
  return res.render('resorts');
}

function groupartyRoute(req, res) {
  return res.render('grouparty');
}

function palmtreesRoute(req, res) {
  return res.render('palm-trees');
}

function rdtRoute(req, res) {
  return res.render('rawand-dilan-therapy');
}

function adsRoute(req, res) {
  return res.render('architectural-design-services');
}

module.exports = {
  home: homeRoute,
  about: aboutRoute,
  resorts: resortsRoute,
  grouparty: groupartyRoute,
  palmtrees: palmtreesRoute,
  rdt: rdtRoute,
  ads: adsRoute
};
