import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import { matchStatsData, playerStatsData } from '@/data/AnalyticsData';
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Center,
  Container,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  HStack,
  Img,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

const VideoComparisonResult = () => {
  return (
    <>
      <DashboardDesktopNav hasArrow />
      <Container maxW={'2xl'} color='white'>
        <Text fontSize='xl' mb={'8'}>
          Player Video Comparison results
        </Text>
        <Box
          bg='dark'
          borderRadius={'lg'}
          textAlign={'center'}
          p={{ base: 3, md: 12 }}
        >
          <Center my={6}>
            <VStack>
              <Img src={'/images/imgs/player.svg'} />
              <Text>PlayerName</Text>
              <Text>CAM</Text>
              <Text>No 18</Text>
            </VStack>
          </Center>
          <HStack p={8}>
            <VStack>
              <Img src={'/images/imgs/football-match.svg'} boxSize='8.5rem' />
              <Text fontSize='m' fontWeight='medium'>
                Player 1
              </Text>
              <Text fontSize='sm' fontWeight='medium'>
                Position
              </Text>
              <Text fontSize='sm' fontWeight='medium'>
                JerseyNo
              </Text>
            </VStack>
            <Spacer />
            <Text>Vs</Text>
            <Spacer />
            <VStack>
              <Img src={'/images/imgs/football-match.svg'} boxSize='8.5rem' />
              <AspectRatio maxW='560px' ratio={1} bg={'white'}>
                <iframe
                  title='naruto'
                  src='https://www.youtube.com/embed/QhBnZ6NPOY0'
                  allowFullScreen
                />
              </AspectRatio>
              <Text fontSize='m' fontWeight='medium'>
                Player 2
              </Text>
              <Text fontSize='sm' fontWeight='medium'>
                Position
              </Text>
              <Text fontSize='sm' fontWeight='medium'>
                JerseyNo
              </Text>
            </VStack>
          </HStack>
          <Text textAlign={'center'} fontSize={'2xl'}>
            Comparison Stats
          </Text>

          {playerStatsData.map((data, index) => (
            <Flex px={6} mb={6} key={index}>
              <Stack>
                <Box h='100px' w='100px'>
                  <CircularProgress
                    value={data.player1Stats}
                    color='green.400'
                    thickness={'10px'}
                  >
                    <CircularProgressLabel>{`${data.player1Stats}%`}</CircularProgressLabel>
                  </CircularProgress>
                </Box>
                <Text>{data.statsType}</Text>
              </Stack>
              <Spacer />
              <Stack>
                <Box h='100px' w='100px'>
                  <CircularProgress
                    value={data.player2Stats}
                    color='green.400'
                    thickness={'10px'}
                  >
                    <CircularProgressLabel>{`${data.player2Stats}%`}</CircularProgressLabel>
                  </CircularProgress>
                </Box>
                <Text>{data.statsType}</Text>
              </Stack>
            </Flex>
          ))}
          {matchStatsData.map((data, index) => (
            <>
              <Flex key={index} bg='black' borderRadius='lg' px={6} mb={6}>
                <Box p='2'>
                  <Text>{data.team1Stats}</Text>
                </Box>
                <Spacer />
                <Box p='2'>
                  <Text>{data.statsType}</Text>
                </Box>
                <Spacer />
                <Box p='2'>
                  <Text>{data.team2Stats}</Text>
                </Box>
              </Flex>
              <Spacer />
            </>
          ))}
        </Box>
        <Center>
          {' '}
          <Button variant='actionOutline' alignSelf='center' mt={16}>
            BACK TO TOP
          </Button>
        </Center>
      </Container>
    </>
  );
};

export default authenticatedRoute(VideoComparisonResult);
