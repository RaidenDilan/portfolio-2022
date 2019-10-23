const router = require('express').Router();
const pages  = require('../controllers/pages');

router.get('/', (req, res) => res.render(`home`));

router.route('/home')
  .get(pages.home);

router.route('/about')
  .get(pages.about);

router.route('/top-paddock')
  .get(pages.topPaddock);

router.route('/band-some')
  .get(pages.bandSome);

router.all('*', (req, res) => res.notFound());

module.exports = router;
