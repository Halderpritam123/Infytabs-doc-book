// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/oAuthController');

const router = express.Router();

// Authentication route
router.get('/auth/google', authController.authenticate);

// OAuth callback route
router.get('/auth/google/callback', authController.callback);

// Logout route
router.get('/auth/logout', authController.logout);

module.exports = router;
