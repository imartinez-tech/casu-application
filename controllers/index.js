const router = require('express').Router();
const rockpaperscissors = require('./rockpaperscissorsRoute')

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/rps', rockpaperscissors)
module.exports = router;
