const express = require('express');
const patientAppointmentController = require('../controllers/patientAppointmentController');
const patientAuthMiddleware = require('../middleware/patientAuthMiddleware');
const doctorAuthMiddleware = require('../middleware/doctorAuthMiddleware');

const router = express.Router();

// Protect all routes with patientAuthMiddleware
router.use(patientAuthMiddleware);

// Create a new patient appointment (accessible to both doctors and patients)
router.post('/', doctorAuthMiddleware, patientAppointmentController.createPatientAppointment);

// Update a patient appointment by ID (accessible to both doctors and patients)
router.patch('/:id', doctorAuthMiddleware, patientAppointmentController.updatePatientAppointmentById);

// Get all patient appointments (accessible to patients only)
router.get('/', patientAppointmentController.getAllPatientAppointments);

// Get patient appointments by date (accessible to patients only)
router.get('/date/:date', patientAppointmentController.getPatientAppointmentsByDate);

// Delete a patient appointment by ID (accessible to patients only)
router.delete('/:id', patientAppointmentController.deletePatientAppointmentById);

module.exports = router;
