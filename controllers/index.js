const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const leaderboardRoutes = require('./leaderboardroutes');
const signupRoutes = require('./signupRoutes');
const contactRoutes = require('./contactroutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/leaderboard', leaderboardRoutes);
router.use('/signup', signupRoutes);
router.use('/contact', contactRoutes);

module.exports = router;
