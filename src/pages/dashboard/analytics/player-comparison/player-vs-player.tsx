import { matchStatsData, playerStatsData } from '@/data/AnalyticsData';
import {
  VStack,
  HStack,
  FormControl,
  Img,
  Select,
  Text,
  Box,
  Avatar,
  Link,
  Spacer,
  Flex,
  Stack,
  Center,
  Button,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const PlayerVsPlayer = () => {
  const [selectedClub, setSelectedClub] = useState(false);
  return (
    <>
      <HStack>
        {' '}
        <FormControl
          w={'80%'}
          bg={'lightAsh'}
          borderRadius={'lg'}
          px={8}
          my={8}
        >
          <HStack>
            <Img src='/images/imgs/manu.svg' w={'30px'} />
            <Select outline='none' border={'none'}>
              <option value='option1' selected>
                Choose team
              </option>
              <option value='option2'>Manchester United</option>
              <option value='option3'>Option 3</option>
            </Select>
          </HStack>
        </FormControl>
        <FormControl w={'80%'} bg={'lightAsh'} borderRadius={'lg'} px={8}>
          <HStack>
            <Img src='/images/imgs/manu.svg' w={'30px'} />
            <Select outline='none' border={'none'}>
              <option value='option1' selected>
                Choose team{' '}
              </option>
              <option value='option2'> Chelsea</option>
              <option value='option3'>Option 3</option>
            </Select>
          </HStack>
        </FormControl>
      </HStack>
      <Stack>
        <HStack spacing={{ base: '2', md: '12' }}>
          <Box>
            <FormControl id='choosePlayer1'>
              <FormLabel>Choose Player1</FormLabel>
              <Select>
                <option value='option1' selected>
                  Select
                </option>
                <option value='option2'>Manchester United</option>
                <option value='option3'>Option 3</option>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl id='choosesPlayer2'>
              <FormLabel>Choose Player 2</FormLabel>
              <Select placeholder=''>
                <option value='option1' selected>
                  Select
                </option>
                <option value='option2'>Manchester United</option>
                <option value='option3'>Option 3</option>
              </Select>
            </FormControl>
          </Box>
        </HStack>
        <Button variant='actionBare' w={'50%'}>
          COMPARE
        </Button>
      </Stack>
      <Box bg='dark' borderRadius='lg' marginTop={'3.5rem'} w={'100%'} p={6}>
        <HStack>
          <VStack>
            <Avatar bg='ash' boxSize={{ base: '5rem', md: '7.5rem' }} />
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
            <Avatar bg='ash' boxSize={{ base: '5rem', md: '7.5rem' }} />
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
        <Text align={'center'} fontSize='xl' my={12}>
          Comparison Stats
        </Text>
        {playerStatsData.map((data, index) => (
          <Flex px={{ base: 2, md: 6 }} mb={6} key={index}>
            <Stack>
              <Box h='100px' w='100px'>
                <CircularProgressbar
                  value={data.player1Stats}
                  text={`${data.player1Stats}%`}
                  strokeWidth={10}
                  styles={buildStyles({
                    textSize: '20px',
                    textColor: '#fff',
                    pathColor: '#47DC40',
                  })}
                />
              </Box>
              <Text>{data.statsType}</Text>
            </Stack>
            <Spacer />
            <Stack>
              <Box h='100px' w='100px'>
                <CircularProgressbar
                  value={data.player2Stats}
                  text={`${data.player2Stats}%`}
                  strokeWidth={10}
                  styles={buildStyles({
                    textSize: '20px',
                    textColor: '#fff',
                    pathColor: '#47DC40',
                  })}
                />
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
      </Box>{' '}
      <Button variant='actionOutline' alignSelf='center' mt={16}>
        BACK TO TOP
      </Button>
    </>
  );
};

export default PlayerVsPlayer;
