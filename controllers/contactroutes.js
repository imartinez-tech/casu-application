const router = require('express').Router();
router.get('/', async (req, res) => {
    try {
      res.render('contact')
    } catch (error) {res.status(500).json(err);
    }
  });

  module.exports = router;
