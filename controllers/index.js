const router = require('express').Router();
const rockpaperscissors = require('./rockpaperscissorsRoute')

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const leaderboardRoutes = require('./leaderboardroutes');
const signupRoutes = require('./signupRoutes');
const contactRoutes = require('./contactroutes');
const gameRoutes = require('./gameroutes')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

router.use('/leaderboard', leaderboardRoutes);
router.use('/signup', signupRoutes);
router.use('/contact', contactRoutes);
router.use('/game', gameRoutes)

router.use('/rps', rockpaperscissors)

module.exports = router;
