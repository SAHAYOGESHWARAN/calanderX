require('dotenv').config();
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// Configure Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URI,
  },
  function(accessToken, refreshToken, profile, done) {
    // Handle the authentication result
    return done(null, profile);
  }
));

app.use(passport.initialize());

// Route to initiate authentication
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Callback route after authentication
app.get('/auth/callback', passport.authenticate('google', {
  failureRedirect: '/',
}), function(req, res) {
  // Successful authentication
  res.redirect('/dashboard');
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running at http://localhost:${process.env.SERVER_PORT}`);
});
