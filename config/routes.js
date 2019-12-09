const router = require('express').Router();
const pages  = require('../controllers/pages');

router.get('/', (req, res) => res.render(`home`));

router.route('/home')
  .get(pages.home);

router.route('/about')
  .get(pages.about);

router.route('/resorts')
  .get(pages.resorts);

router.route('/grouparty')
  .get(pages.grouparty);

router.route('/palm-trees')
  .get(pages.palmtrees);

router.route('/rdt')
  .get(pages.rdt);

router.route('/ads')
  .get(pages.ads);

router.all('*', (req, res) => res.render(`home`));
// router.all('*', (req, res) => res.notFound());

module.exports = router;
