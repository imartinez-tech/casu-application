const router = require('express').Router();
const { Game, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all games and JOIN with user data
    const gameData = await Game.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const games = gameData.map((game) => game.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      games, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/game/:id', async (req, res) => {
  try {
    const gameData = await Game.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const game = gameData.get({ plain: true });
    console.log(game)
    res.render('game', {
      ...game,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/game/save', async (req, res) => {
  try{
    const gameData = await Game.create({...req.body, user_id: req.session.user_id});
  
    if(gameData){
      res
      .status(200)
      .json({gameData})
      return;
    }
    
    res
    .status(400)
    .json({message: 'Failed to save game data. Please try again.'})
  }
  catch(error){
    res.status(500).json(err);
  }
});


// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Game }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
