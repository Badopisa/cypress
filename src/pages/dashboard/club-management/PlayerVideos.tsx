import Video from '@/components/Analytics/Video';
import { uploadedVideosData } from '@/data/AnalyticsData';
import { Box, Button, Img, Table, Tbody, Td, Tr } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

type displayType = {
  setDisplay: (value: number) => void;
};

const PlayerVideos = ({ setDisplay }: displayType) => {
  const router = useRouter();

  const handleOpenPlayerStatistics = () => {
    setDisplay(2);
  };

  return (
    <Box overflowX={'auto'} w={'85%'}>
      <Table mt={8}>
        <Tbody>
          {uploadedVideosData
            .map((data, key) => (
              <>
                <Tr
                  bg='dark'
                  borderRadius='lg'
                  key={key}
                  onClick={handleOpenPlayerStatistics}
                  _hover={{ border: ' 1px solid #811AFF' }}
                  cursor={'pointer'}
                  // h={'2%'}
                >
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
                    <Button variant='outline' fontSize={'2xs'}>
                      VIEW ANALYTICS
                    </Button>
                  </Td>
                  <Td border={'none'}>
                    <Img src='/icons/share.svg' alt='share a video' />
                  </Td>
                  <Td border={'none'}>
                    <Img src='/icons/delete.svg' alt='delete a video' />
                  </Td>
                </Tr>
                <Box bg='transparent' p={4}></Box>
              </>
            ))
            .slice(0, 4)}
        </Tbody>
      </Table>
    </Box>
  );
};

export default PlayerVideos;
