const express = require('express');
const passport = require('passport');
const router = express.Router();

// Login route
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    console.log('hello')
  res.redirect('/profile');
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
