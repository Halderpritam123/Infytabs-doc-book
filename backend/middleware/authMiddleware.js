// authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');

dotenv.config();
const JWT_SECRET=process.env.JWT_SECRET
const authenticateDoctor = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const doctor = await User.findOne({ _id: decodedToken.userId });

    if (!doctor || !doctor.isDoctor) {
      return res.status(401).json({ message: 'Unauthorized: Only doctors are allowed' });
    }

    req.doctor = doctor; // Attach the doctor object to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = { authenticateDoctor };
