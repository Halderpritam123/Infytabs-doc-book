const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Doctor = require('../models/doctor');

dotenv.config();

const doctorAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const doctor = await Doctor.findOne({ _id: decoded.id });

    if (!doctor) {
      throw new Error();
    }

    req.doctor = doctor; // Attach doctor's information to the request
    next();
  } catch (error) {
    res.status(401).json({ error: 'Access denied' });
  }
};

module.exports = doctorAuthMiddleware;
