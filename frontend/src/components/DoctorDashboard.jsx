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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast, // Import useToast from Chakra UI
} from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const addSlotToCalendar = async (formData) => {
  try {
    const apiUrl = 'https://infytabs.onrender.com/api/available-slots';

    const response = await axios.post(apiUrl, formData, {
      headers: {
        Authorization:sessionStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};
 export function formatDateTime(inputString) {
  const dateObj = new Date(inputString);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Add 1 because months are 0-indexed
  const day = dateObj.getDate().toString().padStart(2, '0');
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const ampm = dateObj.getHours() < 12 ? 'am' : 'pm';

  const formattedString = `${year}-${month}-${day}, ${hours}:${minutes} ${ampm}`;
  return formattedString;
}

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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    date: '',
    doctorFullName: '',
    doctorEmail: '',
    doctorGender: '',
    availableStatus: false,
  });

  // Toast configuration
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSlot = async () => {
    setIsLoading(true);
    setMessage('');

    // Check for required fields
    if (!formData.date || !formData.doctorFullName || !formData.doctorEmail || !formData.doctorGender) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all required fields.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await addSlotToCalendar(formData);

      if (response.status === 201) {
        setMessage('Slot added successfully');
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
      const apiUrl = `https://infytabs.onrender.com/api/available-slots/${slotId}`;

      const response = await axios.delete(apiUrl, {
        headers: {
          Authorization: sessionStorage.getItem('token')
        },
      });
      setMessage('Slot deleted successfully');

      setSlots(slots.filter((slot) => slot._id !== slotId));
      await fetchSlots();
    } catch (error) {
      setMessage('Error deleting slot');
    }
  };

  const fetchSlots = async () => {
    try {
      const response = await axios.get('https://infytabs.onrender.com/api/available-slots');
      setSlots(response.data);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  const handleOpenEditModal = (slot) => {
    setEditedData(slot);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSaveEditedData = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.patch(`https://infytabs.onrender.com/api/available-slots/${editedData._id}`, editedData, {
        headers: {
          Authorization: sessionStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setMessage('Slot updated successfully');
        setIsEditModalOpen(false);
        await fetchSlots();
      } else {
        setMessage('Failed to update slot');
      }
    } catch (error) {
      setMessage('Error updating slot');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  return (
    <Box p={4}>
      <Center>
        <Box w="50%">
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input
              type="datetime-local"
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
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {slots.map((slot) => (
              <Tr key={slot._id}>
                <Td>{formatDateTime(slot.date)}</Td>
                <Td>{slot.doctorFullName}</Td>
                <Td>{slot.doctorEmail}</Td>
                <Td>{slot.doctorGender}</Td>
                <Td>{slot.availableStatus ? 'Available' : 'Not Available'}</Td>
                <Td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaEdit style={{ cursor: 'pointer', marginRight: '8px' }} onClick={() => handleOpenEditModal(slot)} />
                    <FaTrash style={{ cursor: 'pointer' }} onClick={() => handleDeleteSlot(slot._id)} />
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* Edit Modal */}
        <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Slot</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Date</FormLabel>
                <Input
                  type="datetime-local"
                  name="date"
                  value={editedData.date}
                  onChange={handleEditFormChange}
                  required
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Doctor Full Name</FormLabel>
                <Input
                  type="text"
                  name="doctorFullName"
                  value={editedData.doctorFullName}
                  onChange={handleEditFormChange}
                  required
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Doctor Email</FormLabel>
                <Input
                  type="email"
                  name="doctorEmail"
                  value={editedData.doctorEmail}
                  onChange={handleEditFormChange}
                  required
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Doctor Gender</FormLabel>
                <Select
                  name="doctorGender"
                  value={editedData.doctorGender}
                  onChange={handleEditFormChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Availability</FormLabel>
                <Select
                  name="availableStatus"
                  value={editedData.availableStatus}
                  onChange={handleEditFormChange}
                  required
                >
                  <option value={true}>Available</option>
                  <option value={false}>Not Available</option>
                </Select>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSaveEditedData}>
                Save
              </Button>
              <Button onClick={handleCloseEditModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Center>
    </Box>
  );
};

export default DoctorDashboard;
