const mongoose = require('mongoose');

// Define a user schema
const oAuthUserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  // Add more fields as needed
});

module.exports = mongoose.model('oAuthUser', oAuthUserSchema);
