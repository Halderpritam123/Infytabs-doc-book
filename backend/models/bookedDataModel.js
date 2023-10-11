// src/models/bookedDataModel.js
const mongoose = require('mongoose');

const bookedDataSchema = new mongoose.Schema({
  date: String,
  doctorFullName: String,
  doctorEmail: String,
  doctorGender: String,
  patientName: String,
  patientEmail: String,
  patientGender: String,
  patientAge: Number,
});

module.exports = mongoose.model('BookedData', bookedDataSchema);
