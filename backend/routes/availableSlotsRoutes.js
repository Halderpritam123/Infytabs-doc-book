// availableSlotsRoutes.js
const express = require('express');
const router = express.Router();
const availableSlotsController = require('../controllers/availableSlotsController');
const { authenticateDoctor } = require('../middleware/authMiddleware');

// Routes for managing available slots
router.post('/', availableSlotsController.createSlot);
router.get('/', availableSlotsController.getAllSlots);
router.get('/:id', availableSlotsController.getSlotById);
router.get('/by-date/:date', availableSlotsController.getSlotsByDate);
router.patch('/:id', availableSlotsController.editSlot);

router.delete('/:id', availableSlotsController.deleteSlot);

module.exports = router;
