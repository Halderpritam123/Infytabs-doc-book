const mongoose = require('mongoose');

const availableSlotsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  doctorFullName: {
    type: String,
    required: true,
  },
  doctorEmail: {
    type: String,
    required: true,
  },
  doctorGender: {
    type: String,
    enum: ['Male', 'Female', 'Other'], // You can customize the options
    required: true,
  },
  availableStatus: {
    type: Boolean,
    default: true, // Default to true
  },
});

const AvailableSlot = mongoose.model('AvailableSlot', availableSlotsSchema);

module.exports = AvailableSlot;
