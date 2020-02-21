const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    return res.render('index');
  });

router.route('/about')
  .get((req, res) => {
    return res.render('about');
  });

router.route('/resorts')
  .get((req, res) => {
    return res.render('resorts');
  });

router.route('/grouparty')
  .get((req, res) => {
    return res.render('grouparty');
  });

router.route('/palm-trees')
  .get((req, res) => {
    return res.render('palm-trees');
  });

router.route('/rdt')
  .get((req, res) => {
    return res.render('rdt');
  });

router.route('/ads')
  .get((req, res) => {
    return res.render('ads');
  });

router.all('*', (req, res) => res.notFound());

module.exports = router;
