import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Center,
  Spinner,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  Heading,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from './DoctorDashboard';

const apiUrl = 'https://infytabs.onrender.com/api/available-slots';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [slots, setSlots] = useState([]);
  const [isCheckBookingsVisible, setIsCheckBookingsVisible] = useState(true);
  const [delId, setDelId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    doctorFullName: '',
    doctorEmail: '',
    doctorGender: '',
    patientName: '',
    patientEmail: '',
    patientGender: '',
    patientAge: '',
  });

  const toast = useToast(); // Import useToast

  const bookSlot = async (slotId) => {
    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post(
        `${apiUrl}/${slotId}/book`,
        {},
        {
          headers: {
            Authorization: sessionStorage.getItem('token') // Replace with your JWT token
          },
        }
      );

      if (response.status === 200) {
        setMessage('Slot booked successfully');
        await fetchSlots();
        const updatedSlots = slots.map((slot) =>
          slot._id === slotId ? { ...slot, availableStatus: false } : slot
        );
        setSlots(updatedSlots);
      } else {
        setMessage('Failed to book slot');
      }
    } catch (error) {
      setMessage('Error booking slot');
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (slot) => {
    setDelId(slot._id);
    setFormData({
      date: slot.date,
      doctorFullName: slot.doctorFullName,
      doctorEmail: slot.doctorEmail,
      doctorGender: slot.doctorGender,
      patientName: '',
      patientEmail: '',
      patientGender: '',
      patientAge: '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Validation function to check if required fields are filled
  const validateForm = () => {
    if (
      !formData.patientName ||
      !formData.patientEmail ||
      !formData.patientGender ||
      !formData.patientAge
    ) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all required patient information fields.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  const saveForm = async () => {
    setIsLoading(true);
    setMessage('');

    // Check if the form is valid before submitting
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const bookedDataResponse = await axios.post(
        'https://infytabs.onrender.com/api/booked-data',
        {
          date: formData.date,
          doctorFullName: formData.doctorFullName,
          doctorEmail: formData.doctorEmail,
          doctorGender: formData.doctorGender,
          patientName: formData.patientName,
          patientEmail: formData.patientEmail,
          patientGender: formData.patientGender,
          patientAge: formData.patientAge,
        },
        {
          headers: {
            Authorization: sessionStorage.getItem('token') // Replace with your JWT token
          },
        }
      );

      // Successfully booked the slot, now update the availability
      const patchResponse = await axios.patch(
        `${apiUrl}/${delId}`, // Replace with the correct slotId
        { availableStatus: false }, // Update availableStatus to false
        {
          headers: {
            Authorization: sessionStorage.getItem('token') // Replace with your JWT token
          },
        }
      );
      setMessage('Slot booked successfully');
      fetchSlots();
      closeModal();
    } catch (error) {
      setMessage('Error booking slot');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSlots = async () => {
    try {
      const response = await axios.get(apiUrl);
      setSlots(response.data);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  return (
    <Box p={4} position="relative">
      <Center>
        <Box w="80%">
          <Box mb={4}>
            <Heading>Patient Dashboard</Heading>
          </Box>
          {message && (
            <Alert status={message === 'Slot booked successfully' ? 'success' : 'error'} mb={4}>
              <AlertIcon />
              <AlertTitle mr={2}>{message}</AlertTitle>
              <CloseButton position="absolute" right="8px" top="8px" onClick={() => setMessage('')} />
            </Alert>
          )}
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Doctor Name</Th>
                <Th>Doctor Email</Th>
                <Th>Gender</Th>
                <Th>Availability</Th>
                <Th>Action</Th>
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
                    {slot.availableStatus ? (
                      <Button
                        colorScheme="teal"
                        onClick={() => openModal(slot)}
                        isLoading={isLoading}
                      >
                        Book
                      </Button>
                    ) : (
                      'N/A'
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Center>
      {isCheckBookingsVisible && (
        <Flex
          position="fixed"
          bottom="20px"
          right="20px"
          bg="teal.500"
          p={4}
          borderRadius="full"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          _hover={{ bg: 'teal.600' }}
          onClick={() => {
            // Handle the "Check Bookings" button click event
            navigate("/booking");
          }}
        >
          <Text color="white" fontWeight="bold">
            Check Bookings
          </Text>
        </Flex>
      )}

      {/* Booking Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Book Slot</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Date</FormLabel>
              <Input type="text" value={formatDateTime(formData.date)} isReadOnly />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Doctor Full Name</FormLabel>
              <Input type="text" value={formData.doctorFullName} isReadOnly />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Doctor Email</FormLabel>
              <Input type="email" value={formData.doctorEmail} isReadOnly />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Doctor Gender</FormLabel>
              <Input type="text" value={formData.doctorGender} isReadOnly />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Patient Name</FormLabel>
              <Input
                type="text"
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Patient Email</FormLabel>
              <Input
                type="email"
                value={formData.patientEmail}
                onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Patient Gender</FormLabel>
              <Select
                value={formData.patientGender}
                onChange={(e) => setFormData({ ...formData, patientGender: e.target.value })}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Patient Age</FormLabel>
              <Input
                type="number"
                value={formData.patientAge}
                onChange={(e) => setFormData({ ...formData, patientAge: e.target.value })}
              />
            </FormControl>
            <Button colorScheme="teal" onClick={saveForm}>
              Save
            </Button>
            <Button colorScheme="red" ml={2} onClick={closeModal}>
              Cancel
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PatientDashboard;
