// Create a new bookedData record
const { google } = require('googleapis');
const BookedData = require('../models/bookedDataModel');
const dotenv = require('dotenv');
dotenv.config();

// Create a new bookedData record and add it to Google Calendar
exports.createBookedData = async (req, res) => {
  try {
    const { doctorEmail, patientEmail, ...eventData } = req.body; // Extract doctorEmail and patientEmail, and collect the rest in eventData
    const bookedData = new BookedData(req.body);

    // Save to MongoDB
    await bookedData.save();

    // Extract the time from the postData
    const timeString = req.body.date; // Assuming the time is in the 'date' field of the postData
    const timeParts = timeString.split('T')[1].split(':');
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);

    // Add event to Google Calendar
    const calendar = google.calendar('v3');
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    auth.setCredentials(req.user.googleTokens);
    // '/auth/google/callback'
    // Set the doctor's email address as the organizer
    const organizerEmail = doctorEmail;

    // Set the patient's email address as an attendee
    const attendeeEmail = patientEmail;

    // Set the date and time for the event with India Standard Time (IST) timezone
    const startDate = new Date(bookedData.date);
    startDate.setHours(hours);
    startDate.setMinutes(minutes);

    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1); // Set end time 1 hour later

    // Include all relevant data from req.body in the event
    const event = {
      ...eventData, // Include summary, description, and other fields
      start: {
        dateTime: startDate.toISOString(),
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: 'Asia/Kolkata',
      },
      organizer: {
        email: organizerEmail,
      },
      attendees: [
        {
          email: attendeeEmail,
        },
      ],
    };

    // Insert the event to the Google Calendar
    const calendarResponse = await calendar.events.insert({
      auth,
      calendarId: 'primary',
      resource: event,
    });

    res.status(201).json({ bookedData, calendarResponse });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Unable to create bookedData record' });
  }
};


// Get all bookedData records
exports.getAllBookedData = async (req, res) => {
  try {
    const bookedData = await BookedData.find();
    res.status(200).json(bookedData);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch bookedData records' });
  }
};

// Delete a bookedData record by ID
exports.deleteBookedDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBookedData = await BookedData.findByIdAndDelete(id);
    if (!deletedBookedData) {
      return res.status(404).json({ error: 'BookedData record not found' });
    }
    res.status(200).json(deletedBookedData);
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete bookedData record' });
  }
};
