import { uploadedVideosData } from '@/data/AnalyticsData';
import { Button, Img, Table, Tbody, Td, Tr } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

const UploadedVideos = () => {
  const router = useRouter();

  const handleOpenVideoAnalytics = () => {
    router.push('/dashboard/analytics/highlights');
  };
  return (
    <Table
      mt={8}
      // bor   border-collapse: separate
      // border-spacing: 0 15px;
    >
      <Tbody>
        {uploadedVideosData.map((data, key) => (
          <Tr
            bg='dark'
            borderRadius='lg'
            key={key}
            onClick={handleOpenVideoAnalytics}
          >
            <Td>
              <Img boxSize='50px' src={data.file} alt='empty file' />
            </Td>
            <Td>{data.players}</Td>
            <Td>{data.time}</Td>
            <Td>
              <Button variant='outline'>ANALYZING</Button>
            </Td>
            <Td>
              <Img src='/icons/share.svg' alt='share a video' />
            </Td>
            <Td>
              <Img src='/icons/delete.svg' alt='delete a video' />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default UploadedVideos;
