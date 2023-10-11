import React from 'react';
import {
  Box,
  Button,
  chakra,
  Container,
  Heading,
  Text,
  SimpleGrid,
} from '@chakra-ui/react';
import PricingCard from './PricingCard.jsx'; // Import the PricingCard component

const Home = () => {
  return (
    <Box style={{backgroundColor:"rgb(129, 212, 250)"}}>
      <Box
        bg="indigo.50"
        py={{ base: 8, lg: 10 }}
        px={{ base: 6, lg: 8 }}
        position="relative"
      >
        <Container maxW="7xl" mx="auto" padding="0">
          <Box textAlign="center">
            <Heading
              fontSize={{ base: '2xl', sm: '3xl', lg: '4xl' }}
              fontWeight="extrabold"
              color="gray.900"
              letterSpacing="tight"
              lineHeight="shorter"
            >
              Book Doctor Appointments Online
            </Heading>
            <Text
              mt={6}
              fontSize={{ base: 'lg', sm: 'xl', lg: '2xl' }}
              color="gray.600"
            >
              Easily schedule and manage doctor appointments online. Connect with
              healthcare professionals in just a few clicks.
            </Text>
          </Box>
        </Container>
      </Box>

      <Box bg="indigo.600" py={{ base: 10, lg: 32 }} px={{ base: 6, lg: 8 }}>
        <Container maxW="7xl" mx="auto">
          <chakra.div textAlign="center">
            <Heading
              fontSize="lg"
              fontWeight="semibold"
              color="indigo.200"
            >
              Efficient appointment management
            </Heading>
            <Heading
              mt={2}
              fontSize={{ base: '3xl', sm: '4xl', lg: '5xl' }}
              fontWeight="extrabold"
              color="white"
              lineHeight="shorter"
            >
              Features for seamless doctor-patient appointment booking
            </Heading>
            <Text mt={6} fontSize="xl" color="indigo.200">
              Feature section description
            </Text>
          </chakra.div>
        </Container>
      </Box>

      <Box bg="white" py={{ base: 24, sm: 32 }} px={{ base: 6, lg: 8 }}>
        <Container maxW="7xl" mx="auto">
          <chakra.div textAlign="center">
            <Heading
              fontSize={{ base: 'xl', sm: '2xl' }}
              fontWeight="semibold"
              color="indigo.600"
            >
              Choose the perfect plan for your needs
            </Heading>
            <Heading
              mt={2}
              fontSize={{ base: '4xl', sm: '5xl', lg: '6xl' }}
              fontWeight="extrabold"
              color="gray.900"
              lineHeight="shorter"
            >
              Pricing
            </Heading>
            <Text
              mt={6}
              fontSize={{ base: 'lg', lg: 'xl' }}
              color="gray.600"
              textAlign="center"
            >
              Select from our flexible pricing plans to suit your requirements.
            </Text>

            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={{ base: 6, lg: 8 }}
              mt={12}
            >
              {/* Add your pricing plan cards here */}
              <PricingCard
                title="Basic Plan"
                price="29"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                buttonText="Select Plan"
              />
              <PricingCard
                title="Standard Plan"
                price="49"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                buttonText="Select Plan"
              />
              <PricingCard
                title="Premium Plan"
                price="79"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                buttonText="Select Plan"
              />
            </SimpleGrid>
          </chakra.div>
        </Container>
      </Box>
      <Box style={{height:"52px"}}>

      </Box>
    </Box>
  );
};

export default Home;
