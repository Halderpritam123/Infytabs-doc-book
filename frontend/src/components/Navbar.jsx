import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Spacer,
  IconButton,
  Button,
  VStack,
  HStack,
  useDisclosure,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Navbar = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    // Perform logout logic here
    // Clear session storage or token
    sessionStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <Box> {/* Logo */}
            <Link to="/">
              <Heading style={{borderRadius:"50%",backgroundColor:"white",padding:"7px"}}>PH</Heading>
            </Link>
          </Box>
        </HStack>
        <Spacer />
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ base: 'block', md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <Flex align="center" display={{ base: 'none', md: 'flex' }}>
        <HStack spacing={4}>
              <Link to="/doctor-dashboard">Doctor Dashboard</Link>
              <Link to="/patient-dashboard">Patient Dashboard</Link>
          {isAuthenticated ? (
            <Button onClick={handleLogout} colorScheme="teal">
              Logout
            </Button>
          ) : (
              <>
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
              </>
          )}
            </HStack>
        </Flex>
      </Flex>
      {isOpen ? (
        <VStack spacing={4} display={{ md: 'none' }}>
            <VStack>
                          <Link to="/doctor-dashboard">Doctor Dashboard</Link>
              <Link to="/patient-dashboard">Patient Dashboard</Link>
          {isAuthenticated ? (
            <Button onClick={handleLogout} colorScheme="teal">
              Logout
            </Button>
          ) : (<>
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
              </>)}
              </VStack>
        </VStack>
      ) : null}
    </Box>
  );
};

export default Navbar;
