const PatientAppointment = require('../models/patientAppointment');

// Create a new patient appointment (accessible to both doctors and patients)
const createPatientAppointment = async (req, res) => {
  try {
    const { date } = req.body;
    const { doctorName, doctorId } = req.doctor; // Doctor info from doctorAuthMiddleware
    const { username: patientName, _id: patientId } = req.patient; // Patient info from patientAuthMiddleware

    const appointment = new PatientAppointment({
      doctor: doctorId,
      doctorName,
      patientId,
      patientName,
      date,
    });

    await appointment.save();

    res.status(201).json({ message: 'Patient appointment created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a patient appointment by ID (accessible to both doctors and patients)
const updatePatientAppointmentById = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { date } = req.body;
    const { doctorId } = req.doctor; // Doctor info from doctorAuthMiddleware
    const { _id: patientId } = req.patient; // Patient info from patientAuthMiddleware

    const appointment = await PatientAppointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Patient appointment not found' });
    }

    // Ensure that the doctor or patient can only update their own appointments
    if (appointment.doctor.toString() !== doctorId.toString() && appointment.patientId.toString() !== patientId.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    appointment.date = date;

    await appointment.save();

    res.json({ message: 'Patient appointment updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all patient appointments (accessible to patients only)
const getAllPatientAppointments = async (req, res) => {
  try {
    const { _id: patientId } = req.patient; // Patient info from patientAuthMiddleware

    const appointments = await PatientAppointment.find({ patientId });

    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get patient appointments by date (accessible to patients only)
const getPatientAppointmentsByDate = async (req, res) => {
  try {
    const { _id: patientId } = req.patient; // Patient info from patientAuthMiddleware
    const { date } = req.params;

    const appointments = await PatientAppointment.find({
      patientId,
      date: new Date(date),
    });

    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a patient appointment by ID (accessible to patients only)
const deletePatientAppointmentById = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { _id: patientId } = req.patient; // Patient info from patientAuthMiddleware

    const appointment = await PatientAppointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Patient appointment not found' });
    }

    // Ensure that the patient can only delete their own appointments
    if (appointment.patientId.toString() !== patientId.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await appointment.remove();

    res.json({ message: 'Patient appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPatientAppointment,
  updatePatientAppointmentById,
  getAllPatientAppointments,
  getPatientAppointmentsByDate,
  deletePatientAppointmentById,
};
