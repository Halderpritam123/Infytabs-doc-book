// src/routes/bookedDataRoutes.js
const express = require('express');
const bookedDataController = require('../controllers/bookedDataController');

const router = express.Router();

// Create a new bookedData record
router.post('/booked-data', bookedDataController.createBookedData);

// Get all bookedData records
router.get('/booked-data', bookedDataController.getAllBookedData);

// Delete a bookedData record by ID
router.delete('/booked-data/:id', bookedDataController.deleteBookedDataById);

module.exports = router;
