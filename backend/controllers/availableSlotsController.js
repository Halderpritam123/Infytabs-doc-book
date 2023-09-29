const AvailableSlot = require('../models/availableSlotsModel');

// Controller methods for managing available slots

// Create a new available slot
const createSlot = async (req, res) => {
  try {
    // Extract data from the request body
    const { date, doctorFullName, doctorEmail, doctorGender } = req.body;

    // Create a new available slot
    const newSlot = new AvailableSlot({
      date,
      doctorFullName,
      doctorEmail,
      doctorGender,
    });

    // Save the new slot to the database
    await newSlot.save();

    res.status(201).json({ message: 'Available slot created successfully', slot: newSlot });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all available slots
const getAllSlots = async (req, res) => {
  try {
    // Fetch all available slots from the database
    const slots = await AvailableSlot.find();

    res.status(200).json(slots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a slot by ID
const getSlotById = async (req, res) => {
  try {
    const slotId = req.params.id;

    // Find the slot by ID in the database
    const slot = await AvailableSlot.findById(slotId);

    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    res.status(200).json(slot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get slots by date
const getSlotsByDate = async (req, res) => {
  try {
    const date = new Date(req.params.date);

    // Find slots by date in the database
    const slots = await AvailableSlot.find({ date });

    res.status(200).json(slots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Edit an available slot
const editSlot = async (req, res) => {
  try {
    const slotId = req.params.id;
    const updates = req.body;

    // Find and update the slot in the database
    const updatedSlot = await AvailableSlot.findByIdAndUpdate(slotId, updates, { new: true });

    if (!updatedSlot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    res.status(200).json({ message: 'Slot updated successfully', slot: updatedSlot });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an available slot
const deleteSlot = async (req, res) => {
  try {
    const slotId = req.params.id;

    // Find and remove the slot from the database
    const deletedSlot = await AvailableSlot.findByIdAndRemove(slotId);

    if (!deletedSlot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    res.status(200).json({ message: 'Slot deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createSlot,
  getAllSlots,
  getSlotById,
  getSlotsByDate,
  editSlot,
  deleteSlot,
};
