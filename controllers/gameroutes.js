const router = require('express').Router();
const { Project, User, Game } = require('../models');
const withAuth = require('../utils/auth');
const path = require('path');
router.get('/rps', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }
    res.sendFile(path.join(__dirname, '../public/rps/index.html'))
  });
router.get('/racing', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }
    res.sendFile(path.join(__dirname, '../public/racing/index.html'))
  });

router.post('/save', withAuth,  async (req, res) => {
    try{
      const gameData = await Game.create({...req.body.results, user_id: req.session.user_id});
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
      res.status(500).json(error);
    }
  });

router.post('/score', withAuth, async(req, res)=>{
  try{
    const gameScores = await Game.findAll({
      where: {
        user_id: req.session.user_id
      }
    })
    if(gameScores.length > 0){
      // Filter out score between players
      const userWins = gameScores.filter(game => game.outcome === 1).length;
      const computerWins = gameScores.filter(game => game.outcome === 2).length;
      res
      .status(200)
      .json({userWins, computerWins, gameScores});
      return;
    }
    
    // If no scores exist return inital values
    res
      .status(200)
      .json({userWins: 0, computerWins: 0, gameScores});
  }
  catch(error){
    res.status(500).json(err);
  }
})
  module.exports = router;