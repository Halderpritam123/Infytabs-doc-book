// config/passport-setup.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/oAuthUser');
const dotenv = require('dotenv');

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
    // Your Google OAuth credentials (clientID, clientSecret, and callbackURL)
    // process.env.GOOGLE_CLIENT_ID,
    // process.env.GOOGLE_CLIENT_SECRET,
    // process.env.GOOGLE_REDIRECT_URI
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  }, (accessToken, refreshToken, profile, done) => {
    // Check if the user already exists in your database, and create if not
    User.findOne({ oauthId: profile.id }).then(existingUser => {
      if (existingUser) {
        done(null, existingUser);
      } else {
        new User({
          oauthId: profile.id,
          username: profile.displayName,
        }).save().then(newUser => {
          done(null, newUser);
        });
      }
    });
  })
);
