import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const PrivetRouterPai = ({ children }) => {
  const isAuth = sessionStorage.getItem('token');
  const isDoctor = sessionStorage.getItem('isDoctor');
  const location = useLocation();
  const toast = useToast(); // Initialize the toast hook

  if (!isAuth) {
    // Display a toast message if not authenticated
    toast({
      title: 'Access Denied',
      description: 'Please log in to access this page.',
      status: 'error',
      position: 'top-right',
      duration: 3000,
      isClosable: true,
    });
    return <Navigate to="/login" state={location.pathname} replace />;
  } else if (isAuth && isDoctor === 'true') {
    // Display a toast message if logged in as a doctor
    toast({
      title: 'Access Denied',
      description: 'Please log in as a patient to access this page.',
      status: 'error',
      position: 'top-right',
      duration: 3000,
      isClosable: true,
    });
    return <Navigate to="/login" state={location.pathname} replace />;
  } else {
    // Allow access if authenticated and not logged in as a doctor
    return children;
  }
};

export default PrivetRouterPai;
