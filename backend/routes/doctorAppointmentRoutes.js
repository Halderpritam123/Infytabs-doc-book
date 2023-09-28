const express = require('express');
const doctorAppointmentController = require('../controllers/doctorAppointmentController');
const doctorAuthMiddleware = require('../middleware/doctorAuthMiddleware');
const patientAuthMiddleware = require('../middleware/patientAuthMiddleware');
const router = express.Router();

// Protect all routes with doctorAuthMiddleware
router.use(doctorAuthMiddleware);

// Create a new doctor appointment
router.post('/', doctorAppointmentController.createDoctorAppointment);

// Update a doctor appointment by ID
router.patch('/:id',patientAuthMiddleware, doctorAppointmentController.updateDoctorAppointmentById);

// Get all doctor appointments
router.get('/', doctorAppointmentController.getAllDoctorAppointments);

// Delete a doctor appointment by ID
router.delete('/:id', doctorAppointmentController.deleteDoctorAppointmentById);

// Get doctor appointments by date
router.get('/date/:date', doctorAppointmentController.getDoctorAppointmentsByDate);

module.exports = router;
