import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
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
import { useRouter } from 'next/router';

const Analytics = () => {
  const router = useRouter();

  const handleOpenAllVideos = () => {
    router.push('/dashboard/analytics/all-videos');
  };
  return (
    <>
      <DashboardDesktopNav />
      <Box h='100vh'>
        <Flex
          color='white'
          align='center'
          justify='space-between'
          direction={{ base: 'column', md: 'row' }}
        >
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
              <Button
                bg='lightAsh'
                variant='action'
                onClick={handleOpenAllVideos}
              >
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
              <Button bg='lightAsh' variant='action'>
                OPEN
              </Button>
            </VStack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
export default authenticatedRoute(Analytics);
