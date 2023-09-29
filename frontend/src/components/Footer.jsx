import React from 'react';
import { Box, Center, chakra, Container, Link, Text, VStack, HStack, Icon } from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
  return (
    <Box bg="rgb(129, 212, 250)" py={6}>
      <Container maxW="7xl" mx="auto">
        <Center>
          <VStack spacing={2}>
            <chakra.div textAlign="center">
              <Text fontSize="sm" color="black">
                &copy; {new Date().getFullYear()} My Web. All rights reserved.
              </Text>
              <Text fontSize="sm" color="black" mt={2}>
                Made with ❤️ by{' '}
                <Link color="black" href="#" target="_blank" rel="noopener noreferrer">
                  Pritam Halder
                </Link>
              </Text>
            </chakra.div>
            <HStack spacing={4}>
              <Link href="https://github.com/Halderpritam123" target="_blank" rel="noopener noreferrer">
                <Icon as={FaGithub} boxSize={5} color="black" />
              </Link>
              <Link href="https://www.linkedin.com/in/pritamhalder62/" target="_blank" rel="noopener noreferrer">
                <Icon as={FaLinkedin} boxSize={5} color="black" />
              </Link>
              <Link href="pritampritamhalder@gmail.com" target="_blank" rel="noopener noreferrer">
                <Icon as={MdEmail} boxSize={5} color="black" />
              </Link>
            </HStack>
            <Text fontSize="sm" color="black" mt={4}>
              Check out my{' '}
              <Link
                color="black"
                href="https://drive.google.com/file/d/1Cov_u6s7a0na_lUFae06XkbdcOH5HfaK/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                fontWeight="bold" // Highlighted link
              >
                resume
              </Link>{' '}
              and{' '}
              <Link
                color="black"
                href="https://halderpritam123.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                fontWeight="bold" // Highlighted link
              >
                portfolio
              </Link>{' '}
              to know more about me. I'm open to new opportunities and excited to work with you!
            </Text>
          </VStack>
        </Center>
      </Container>
    </Box>
  );
};

export default Footer;
