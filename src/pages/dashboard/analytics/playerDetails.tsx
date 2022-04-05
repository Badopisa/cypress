import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import { allEventsData, chatData } from '@/data/AnalyticsData';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  HStack,
  Img,
  Select,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const PlayerDetails = () => {
  const percentage = 65;
  return (
    <>
      <DashboardDesktopNav hasArrow />
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={'14rem'} color='white'>
        <Stack spacing={20}>
          <Flex justify='space-between'>
            {' '}
            <Avatar src='/images/imgs/player.svg' size={'2xl'} />
            <Stack spacing={4}>
              <Button variant='action'>Send Message</Button>
              <Button variant='actionOutline'>Share Stats</Button>
            </Stack>
          </Flex>
          <Stack>
            <Flex justify='space-between'>
              {' '}
              <Heading>09. Harry Styles</Heading>
              <Img src='/icons/more_vert.svg' alt='more' />
            </Flex>
            <Wrap w={'80%'}>
              <Text fontSize={'sm'} p={1} color='white' bg='dark'>
                Wolves B Team
              </Text>
              <Text fontSize={'sm'} p={1} color='white' bg='dark'>
                Forward
              </Text>
              <Text p={1} color='white' bg='dark'>
                23years
              </Text>
              <Text fontSize={'sm'} p={1} color='white' bg='dark'>
                United States
              </Text>
            </Wrap>
          </Stack>
          <Box bg='dark' borderRadius={'lg'} p={4}>
            <SimpleGrid columns={3} spacing={4}>
              <Box bg='ash' borderRadius={'lg'} textAlign={'center'} p={2}>
                <Text>35</Text>
                <Text>Goals</Text>
              </Box>
              <Box bg='ash' borderRadius={'lg'} textAlign={'center'} p={2}>
                <Text>4</Text>
                <Text>F.Kicks</Text>
              </Box>
              <Box bg='ash' borderRadius={'lg'} textAlign={'center'} p={2}>
                <Text>30</Text>
                <Text>Penalty</Text>
              </Box>
              <Box bg='ash' borderRadius={'lg'} textAlign={'center'} p={2}>
                <Text>35</Text>
                <Text>Goals Att.</Text>
              </Box>
              <Box bg='ash' borderRadius={'lg'} textAlign={'center'} p={2}>
                <Flex justify='center'>
                  <Text>8</Text>
                  <Img src='/icons/yellow-card.svg' alt='yellow card' />
                </Flex>
                <Text>Yellow Card</Text>
              </Box>
              <Box bg='ash' borderRadius={'lg'} textAlign={'center'} p={2}>
                <Flex justify='center'>
                  <Text>2</Text>
                  <Img src='/icons/red-card.svg' alt='red card' />
                </Flex>
                <Text>Red Card</Text>
              </Box>
            </SimpleGrid>
            <Flex mt='3rem' gap={6}>
              <Stack>
                <Box>
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    strokeWidth={10}
                    styles={buildStyles({
                      textSize: '20px',
                      textColor: '#fff',
                      pathColor: '#47DC40',
                    })}
                  />
                </Box>
                <Text>Ball Possession</Text>
              </Stack>
              <Stack>
                <Box>
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    strokeWidth={10}
                    styles={buildStyles({
                      textSize: '20px',
                      textColor: '#fff',
                      pathColor: '#47DC40',
                    })}
                  />
                </Box>
                <Text>Long Pass Acc</Text>
              </Stack>
              <Stack>
                <Box>
                  {' '}
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    strokeWidth={10}
                    styles={buildStyles({
                      textSize: '20px',
                      textColor: '#fff',
                      pathColor: '#47DC40',
                    })}
                  />
                </Box>
                <Text>Short Pass Acc</Text>
              </Stack>
            </Flex>
          </Box>
          <Box>
            <Img src='/images/imgs/graph.svg' alt='grpah' />
          </Box>
        </Stack>
        <Box>
          <Box bg='dark' borderRadius='lg' w={'100%'} p={3}>
            <Text fontSize={'xl'} mb={'2rem'}>
              Other Players
            </Text>
            <FormControl w={'80%'} bg={'ash'} borderRadius={'lg'} px={8}>
              <HStack>
                <Img src='/images/imgs/manu.svg' w={'30px'} />
                <Select outline='none' border={'none'} placeholder=''>
                  <option value='option1' selected>
                    Manchester United vs{' '}
                  </option>
                  <option value='option2'>Option 2</option>
                  <option value='option3'>Option 3</option>
                </Select>
              </HStack>
            </FormControl>
            {allEventsData
              .map((data, index) => (
                <>
                  <HStack key={index} py={4}>
                    <Box>
                      {' '}
                      <Avatar src={data.file} />
                    </Box>
                    <Box w='100%'>
                      <VStack w='100%' alignItems='left'>
                        <Flex>
                          {' '}
                          <Box>
                            <VStack align='left'>
                              <Text>{data.playerName} </Text>
                              <Text>
                                {data.playerPosition}. {data.jerseyNo}
                              </Text>
                            </VStack>
                          </Box>
                          <Spacer />
                        </Flex>
                      </VStack>
                    </Box>
                  </HStack>
                </>
              ))
              .slice(0, 4)}
          </Box>
        </Box>
      </SimpleGrid>
    </>
  );
};

export default authenticatedRoute(PlayerDetails);
