import React from 'react';
import {
  Box,
  Button,
  chakra,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';

const PricingCard = ({ title, price, description, buttonText }) => {
  return (
    <Box
      bg="white"
      border="1px"
      borderColor="gray.200"
      rounded="lg"
      overflow="hidden"
    >
      <Box p={6} style={{backgroundColor:"rgb(129, 212, 250)"}}>
        <Flex justifyContent="space-between" alignItems="center">
          <chakra.span
            fontSize="sm"
            color="gray.600"
            fontWeight="semibold"
            textTransform="uppercase"
            
          >
            {title}
          </chakra.span>
          <chakra.span
            bg="indigo.600"
            color="white"
            rounded="full"
            px={3}
            py={1}
            fontSize="xs"
            fontWeight="semibold"
            letterSpacing="wide"
            textTransform="uppercase"
          >
            {price}
          </chakra.span>
        </Flex>

        <Box mt={4}>
          <Text fontSize="2xl" fontWeight="semibold" lineHeight="short">
            {description}
          </Text>
        </Box>

        <Stack
          direction="row"
          mt={6}
          spacing={4}
          align="center"
          justify="center"
        >
          <Button
            w="full"
            bg="indigo.600"
            color="white"
            rounded="md"
            _hover={{ bg: 'indigo.700' }}
          >
            {buttonText}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default PricingCard;
