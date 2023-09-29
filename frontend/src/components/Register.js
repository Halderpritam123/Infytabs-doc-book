import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import axios from 'axios';

const Register = () => {
  const history = useNavigate();
  const toast = useToast(); // Initialize the toast hook
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    isDoctor: false,
  });
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      // Send a POST request to your registration endpoint with Axios
      const response = await axios.post('http://localhost:8080/api/auth/register', formData);

      if (response.status === 201) {
        // Registration successful
        // Clear any previous error toast messages
        toast.closeAll({ position: 'top-right', status: 'error' });

        // Display a success toast message
        toast({
          title: 'Registration successful!',
          status: 'success',
          position: 'top-right',
          duration: 3000,
          isClosable: true,
        });

        // Redirect to the login page
        history('/login');
      }
    } catch (error) {
      // Handle registration errors
      // Display an error toast message
      toast({
        title: 'Registration failed',
        description: 'Please check your registration details.',
        status: 'error',
        position: 'top-right',
        duration: 3000,
        isClosable: true,
      });

      console.error('Registration error:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Full Name</FormLabel>
          <Input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Are you a doctor?</FormLabel>
          <Checkbox
            name="isDoctor"
            isChecked={formData.isDoctor}
            onChange={handleChange}
          >
            I am a doctor
          </Checkbox>
        </FormControl>
        <Button type="submit" mt={4} colorScheme="teal" disabled={isLoading}>
          {isLoading ? <Spinner size="sm" color="teal.500" /> : 'Register'}
        </Button>
      </form>
    </Box>
  );
};

export default Register;
