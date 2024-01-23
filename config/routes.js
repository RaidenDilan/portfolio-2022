const router = require('express').Router();

router
  .route('/')
  .get((req, res) => res.render('/public/index.html'));
  
router
  .route('/about')
  .get((req, res) => res.render('/public/about.html'));
  
router
  .route('/resorts')
  .get((req, res) => res.render('/public/resorts.html'));
  
router
  .route('/grouparty')
  .get((req, res) => res.render('/public/grouparty.html'));
  
router
  .route('/palm-trees')
  .get((req, res) => res.render('/public/palm-trees.html'));
  
router
  .route('/rdt')
  .get((req, res) => res.render('/public/rdt.html'));

// router.all('*', (req, res) => res.render('/public/404.html'));

module.exports = router;
