const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');
const path = require('path');
router.get('/rps', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
    }
    res.redirect('/rps')
});
router.get('/racing', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
    }
    res.sendFile(path.join(__dirname, '../public/racing/index.html'))
});
module.exports = router;