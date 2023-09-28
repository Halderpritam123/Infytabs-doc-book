const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user');

dotenv.config();

const patientAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const patient = await User.findById(decoded.id);

    if (!patient) {
      throw new Error();
    }

    req.patient = patient; // Attach patient's information to the request
    next();
  } catch (error) {
    res.status(401).json({ error: 'Access denied' });
  }
};

module.exports = patientAuthMiddleware;

