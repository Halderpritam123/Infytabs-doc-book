import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  Spinner,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import edit and delete icons

const addSlotToCalendar = async (formData) => {
  try {
    // Replace with your backend API endpoint
    const apiUrl = 'http://localhost:8080/api/available-slots';

    // Make a POST request to add a new slot
    const response = await axios.post(apiUrl, formData, {
      headers: {
        // Include any necessary headers, such as authentication headers
        Authorization: `Bearer <your-jwt-token>`, // Replace with your JWT token
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

const DoctorDashboard = () => {
  const [formData, setFormData] = useState({
    date: '',
    doctorFullName: '',
    doctorEmail: '',
    doctorGender: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [slots, setSlots] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSlot = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      // Make a POST request to add a new slot
      const response = await addSlotToCalendar(formData);

      if (response.status === 201) {
        setMessage('Slot added successfully');
        // Refresh the list of slots after adding
        await fetchSlots();
      } else {
        setMessage('Failed to add slot');
      }
    } catch (error) {
      setMessage('Error adding slot');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSlot = async (slotId) => {
    try {
      const apiUrl = `http://localhost:8080/api/available-slots/${slotId}`;

      // Make a DELETE request to delete the slot
      const response = await axios.delete(apiUrl, {
        headers: {
          // Include any necessary headers, such as authentication headers
          Authorization: `Bearer <your-jwt-token>`, // Replace with your JWT token
        },
      });
      setMessage('Slot deleted successfully');

      // Remove the deleted slot from the state
      setSlots(slots.filter((slot) => slot._id !== slotId));
      await fetchSlots();
    } catch (error) {
      setMessage('Error deleting slot');
    }
  };

  const fetchSlots = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/available-slots');
      setSlots(response.data);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  useEffect(() => {
    // Fetch available slots when the component mounts
    fetchSlots();
  }, []);

  return (
    <Box p={4}>
      <Center>
        <Box w="50%">
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Doctor Full Name</FormLabel>
            <Input
              type="text"
              name="doctorFullName"
              value={formData.doctorFullName}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Doctor Email</FormLabel>
            <Input
              type="email"
              name="doctorEmail"
              value={formData.doctorEmail}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Doctor Gender</FormLabel>
            <Select
              name="doctorGender"
              value={formData.doctorGender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
          </FormControl>
          <Button
            type="submit"
            mt={4}
            colorScheme="teal"
            onClick={handleAddSlot}
          >
            {isLoading ? (
              <Spinner size="sm" />
            ) : (
              'Add Slot'
            )}
          </Button>
          {message && (
            <Alert status={message === 'Slot added successfully' ? 'success' : 'error'} mt={4}>
              <AlertIcon />
              <AlertTitle mr={2}>{message}</AlertTitle>
              <CloseButton position="absolute" right="8px" top="8px" onClick={() => setMessage('')} />
            </Alert>
          )}
        </Box>
      </Center>
      <Center mt={8}>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Doctor Name</Th>
              <Th>Doctor Email</Th>
              <Th>Gender</Th>
              <Th>Availability</Th>
              <Th>Actions</Th> {/* Add a column for actions */}
            </Tr>
          </Thead>
          <Tbody>
            {slots.map((slot) => (
              <Tr key={slot._id}>
                <Td>{slot.date}</Td>
                <Td>{slot.doctorFullName}</Td>
                <Td>{slot.doctorEmail}</Td>
                <Td>{slot.doctorGender}</Td>
                <Td>{slot.availableStatus ? 'Available' : 'Not Available'}</Td> {/* Updated line */}
                <Td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaEdit style={{ cursor: 'pointer', marginRight: '8px' }} />
                    <FaTrash style={{ cursor: 'pointer' }} onClick={() => handleDeleteSlot(slot._id)} />
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Center>
      
    </Box>
  );

};

export default DoctorDashboard;
