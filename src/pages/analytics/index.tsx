import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Link,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
// import Link  from 'next/link';

const Analytics = () => {
  return (
    <Box bgColor='ash' w='100vw' h='100vh' p='20'>
      <Flex color='white' align='center' justify='space-between'>
        <Flex
          w='420px'
          h='581px'
          bgImage="url('/images/imgs/data-analytics.svg')"
          bgSize='cover'
          bgRepeat='no-repeat'
          borderRadius='lg'
          opacity='1'
          alignItems='center'
        >
          <VStack spacing={6}>
            <Text>VIDEO</Text>
            <Heading>Analytics</Heading>
            <Text textAlign='center'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor,
              nullam id aliquam.
            </Text>
            <Spacer />
            <Button bg='lightAsh' variant='outline'>
              OPEN
            </Button>
          </VStack>
        </Flex>

        <Flex
          w='420px'
          h='581px'
          bgImage="url('/images/imgs/comparison.svg')"
          bgSize='cover'
          bgRepeat='no-repeat'
          borderRadius='lg'
          opacity='1'
          alignItems='center'
        >
          <VStack>
            <Text>PLAYERS</Text>
            <Heading>Comparison</Heading>
            <Text textAlign='center'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor,
              nullam id aliquam.
            </Text>
            <Spacer />
            <Button bg='lightAsh' variant='outline'>
              OPEN
            </Button>
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
};
export default Analytics;
