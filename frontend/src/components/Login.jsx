import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Spinner, useToast } from '@chakra-ui/react';
import axios from 'axios';

const Login = () => {
  const history = useNavigate();
  const toast = useToast(); // Initialize the useToast hook
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [token, setToken] = useState(''); // Token state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      // Send a POST request to your login endpoint with Axios
      const response = await axios.post('http://localhost:8080/api/auth/login', formData);

      if (response.status === 200) {
        // Login successful
        // Display a success toast message
        toast({
          title: 'Login successful!',
          status: 'success',
          position: 'top-right',
          duration: 3000,
          isClosable: true,
        });

        // Save the token in session storage
        // console.log(response.data)
        const { token,isDoctor } = response.data;

        sessionStorage.setItem('token', `Bearer ${token}`);
        sessionStorage.setItem('isDoctor',isDoctor);
        // Redirect to the relevant dashboard
        if (response.data.isDoctor) {
          history('/doctor-dashboard');
        } else {
          history('/patient-dashboard');
        }
        window.location.reload();
      }
    } catch (error) {
      // Handle login errors
      // Display an error toast message
      toast({
        title: 'Login failed',
        description: 'Please check your credentials.',
        status: 'error',
        position: 'top-right',
        duration: 3000,
        isClosable: true,
      });

      console.error('Login error:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <FormControl>
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
        <Button type="submit" mt={4} colorScheme="teal">
          {isLoading ? <Spinner size="sm" color="teal.500" /> : 'Login'}
        </Button>
      </form>
    </Box>
  );
};

export default Login;
