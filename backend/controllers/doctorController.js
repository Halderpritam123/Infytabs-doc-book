const Doctor = require('../models/doctor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const registerDoctor = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const doctor = await Doctor.findOne({ username });

    if (doctor) {
      return res.status(400).json({ message: 'Doctor username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = new Doctor({
      username,
      password: hashedPassword,
      email,
    });

    await newDoctor.save();

    res.status(201).json({ message: 'Doctor registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginDoctor = async (req, res) => {
  try {
    const { username, password } = req.body;

    const doctor = await Doctor.findOne({ username });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      const payload = { id: doctor.id, username: doctor.username };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      return res.json({ token });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerDoctor, loginDoctor };
