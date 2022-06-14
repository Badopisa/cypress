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

  const handleOpenPlayerComparison = () => {
    router.push('/dashboard/analytics/player-comparison');
  };
  return (
    <>
      <DashboardDesktopNav />
      <Box w={'100%'}>
        <Flex
          color='white'
          align='center'
          justify='space-between'
          direction={{ base: 'column', md: 'row' }}
        >
          <Flex
            w={{ base: '100%', md: '45%' }}
            h='581px'
            bgImage="url('/images/imgs/data-analytics.svg')"
            bgSize='cover'
            bgRepeat='no-repeat'
            borderRadius='lg'
            opacity='0.8'
            alignItems='center'
          >
            <VStack spacing={6}>
              <Text>VIDEO</Text>
              <Heading data-testid='heading'>Analytics</Heading>
              <Text textAlign='center'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor,
                nullam id aliquam.
              </Text>
              <Spacer />
              <Spacer />
              <Spacer />
              <Spacer />
              <Spacer />
              <Button
                bg='lightAsh'
                variant='action'
                px={12}
                fontSize={'xl'}
                onClick={handleOpenAllVideos}
                data-testid='open-video-analytics'
              >
                OPEN
              </Button>
            </VStack>
          </Flex>

          <Flex
            // w='420px'
            w={{ base: '100%', md: '45%' }}
            h='581px'
            bgImage="url('/images/imgs/comparison.svg')"
            bgSize='cover'
            bgRepeat='no-repeat'
            borderRadius='lg'
            opacity='0.8'
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
              <Spacer />
              <Spacer />
              <Spacer />
              <Spacer />
              <Button
                bg='lightAsh'
                variant='action'
                px={12}
                fontSize={'xl'}
                onClick={handleOpenPlayerComparison}
                data-testid='open-player-analytics'
              >
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
