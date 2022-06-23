import React, { useState } from 'react';
import { uploadedVideosData } from '@/data/AnalyticsData';
import Video from '@/components/Analytics/Video';
import {
  Table,
  Tbody,
  Tr,
  Td,
  Button,
  Img,
  Box,
  CircularProgress,
  Flex,
  SimpleGrid,
  Stack,
  CircularProgressLabel,
  Text,
} from '@chakra-ui/react';

const PlayerStatistics = () => {
  const [progress, setProgress] = useState(10);

  const data = uploadedVideosData[0];

  const percentage = 65;
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Box w={'80%'}>
      <Table>
        <Tbody>
          <Tr bg='dark' borderRadius='lg'>
            <Td border={'none'} w={''}>
              <Video data={data} />
            </Td>
            <Td border={'none'} fontSize={'xs'}>
              {data.players}
            </Td>
            <Td border='none' fontSize={'xs'}>
              {data.time}
            </Td>

            <Td border={'none'}>
              <Img src='/icons/share.svg' alt='share a video' />
            </Td>
            <Td border={'none'}>
              <Img src='/icons/delete.svg' alt='delete a video' />
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justifyContent={'space-between'}
        w='90%'
        mt={4}
      >
        <Box bg='dark' borderRadius={'lg'} p={8}>
          <Flex justifyContent={'space-between'} mb={8}>
            <Text fontSize={'sm'}>Video Analytics</Text>
            <Button
              variant={'outline'}
              alignSelf={'self-end'}
              px={8}
              fontSize={'sm'}
            >
              SHARE STATS
            </Button>
          </Flex>
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
              <Box alignSelf={'center'}>
                <CircularProgress
                  value={percentage}
                  color='green.400'
                  thickness={'10px'}
                >
                  <CircularProgressLabel>{`${percentage}%`}</CircularProgressLabel>
                </CircularProgress>
              </Box>
              <Text>Ball Possession</Text>
            </Stack>
            <Stack>
              <Box alignSelf={'center'}>
                <CircularProgress
                  value={percentage}
                  color='green.400'
                  thickness={'10px'}
                >
                  <CircularProgressLabel>{`${percentage}%`}</CircularProgressLabel>
                </CircularProgress>
              </Box>
              <Text>Long Pass Acc</Text>
            </Stack>
            <Stack>
              <Box alignSelf={'center'}>
                <CircularProgress
                  value={percentage}
                  color='green.400'
                  thickness={'10px'}
                >
                  <CircularProgressLabel>{`${percentage}%`}</CircularProgressLabel>
                </CircularProgress>
              </Box>
              <Text>Short Pass Acc</Text>
            </Stack>
          </Flex>
        </Box>
        <Box>
          <Img src='/images/imgs/graph.svg' alt='grpah' />
        </Box>
      </Flex>
    </Box>
  );
};

export default PlayerStatistics;
