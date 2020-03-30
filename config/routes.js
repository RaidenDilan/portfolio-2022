const router = require('express').Router();

router
  .route('/')
  .get((req, res) => res.render('index.html'));

router
  .route('/about')
  .get((req, res) => res.render('about.html'));

router
  .route('/resorts')
  .get((req, res) => res.render('resorts.html'));

router
  .route('/grouparty')
  .get((req, res) => res.render('grouparty.html'));

router
  .route('/palm-trees')
  .get((req, res) => res.render('palm-trees.html'));

router
  .route('/rdt')
  .get((req, res) => res.render('rdt.html'));

router
  .route('/ads')
  .get((req, res) => res.render('ads.html'));

// router
//   .route('/404')
//   .get((req, res) => res.render('404.html'));

// router.all('*', (req, res) => res.render('404.html'));

module.exports = router;
