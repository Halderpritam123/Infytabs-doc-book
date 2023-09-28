const DoctorAppointment = require('../models/DoctorAppointment');
// Create a new doctor appointment
const createDoctorAppointment = async (req, res) => {
  try {
    const { date, patientName, patientId } = req.body;
    const { doctorName, doctorId } = req.doctor; // Doctor info from middleware

    const appointment = new DoctorAppointment({
      doctor: doctorId,
      doctorName,
      date,
      patientName,
      patientId,
    });

    await appointment.save();

    res.status(201).json({ message: 'Doctor appointment created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a doctor appointment by ID
const updateDoctorAppointmentById = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { date, patientName, patientId } = req.body;
    const { doctorName, doctorId } = req.doctor; // Doctor info from middleware

    const appointment = await DoctorAppointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Doctor appointment not found' });
    }

    // Ensure the doctor can only update their own appointments
    if (appointment.doctor.toString() !== doctorId.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    appointment.date = date;
    appointment.patientName = patientName;
    appointment.patientId = patientId;

    await appointment.save();

    res.json({ message: 'Doctor appointment updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all doctor appointments
const getAllDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.doctor; // Doctor info from middleware

    const appointments = await DoctorAppointment.find({ doctor: doctorId });

    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a doctor appointment by ID
const deleteDoctorAppointmentById = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { doctorId } = req.doctor; // Doctor info from middleware

    const appointment = await DoctorAppointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Doctor appointment not found' });
    }

    // Ensure the doctor can only delete their own appointments
    if (appointment.doctor.toString() !== doctorId.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await appointment.remove();

    res.json({ message: 'Doctor appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get doctor appointments by date
const getDoctorAppointmentsByDate = async (req, res) => {
  try {
    const { doctorId } = req.doctor; // Doctor info from middleware
    const { date } = req.params;

    const appointments = await DoctorAppointment.find({
      doctor: doctorId,
      date: new Date(date),
    });

    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDoctorAppointment,
  updateDoctorAppointmentById,
  getAllDoctorAppointments,
  deleteDoctorAppointmentById,
  getDoctorAppointmentsByDate,
};
