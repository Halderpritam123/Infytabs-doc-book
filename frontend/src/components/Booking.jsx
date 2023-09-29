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
  Spinner,
  useToast,
  Heading,
} from '@chakra-ui/react';

const Booking = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const toast = useToast();

  useEffect(() => {
    // Make a GET request to fetch booked data
    axios.get('http://localhost:8080/api/booked-data')
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching booked data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleCancelBooking = (bookingId) => {
    // Make a DELETE request to cancel the booking
    axios.delete(`http://localhost:8080/api/booked-data/${bookingId}`)
      .then((response) => {
        if (response.status === 200) {
          // Successfully canceled the booking
          toast({
            title: 'Booking canceled successfully',
            status: 'success',
            position: 'top-right',
            duration: 3000,
            isClosable: true,
          });

          // Remove the canceled booking from the state
          setBookings(bookings.filter((booking) => booking._id !== bookingId));
        } else {
          toast({
            title: 'Failed to cancel booking',
            status: 'error',
            position: 'top-right',
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        console.error('Error canceling booking:', error);
        toast({
          title: 'Error canceling booking',
          status: 'error',
          position: 'top-right',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Box p={4}>
      <Heading>Booked Data</Heading>
      {isLoading ? (
        <Spinner size="lg" />
      ) : (
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Doctor Name</Th>
              <Th>Doctor Email</Th>
              <Th>Doctor Gender</Th>
              <Th>Patient Name</Th>
              <Th>Patient Email</Th>
              <Th>Patient Gender</Th>
              <Th>Patient Age</Th>
              <Th>Cancel</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bookings.map((booking) => (
              <Tr key={booking._id}>
                <Td>{booking.date}</Td>
                <Td>{booking.doctorFullName}</Td>
                <Td>{booking.doctorEmail}</Td>
                <Td>{booking.doctorGender}</Td>
                <Td>{booking.patientName}</Td>
                <Td>{booking.patientEmail}</Td>
                <Td>{booking.patientGender}</Td>
                <Td>{booking.patientAge}</Td>
                <Td>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleCancelBooking(booking._id)}
                  >
                    Cancel
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default Booking;
