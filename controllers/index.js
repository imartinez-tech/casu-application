const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const gameRoutes = require('./gameroutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/games', gameRoutes);

module.exports = router;
