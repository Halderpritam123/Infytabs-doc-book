const express = require('express');
const DoctorController = require('../controllers/doctorController');

const router = express.Router();

router.post('/register', DoctorController.registerDoctor);
router.post('/login', DoctorController.loginDoctor);

module.exports = router;
