import Video from '@/components/Analytics/Video';
import { uploadedVideosData } from '@/data/AnalyticsData';
import { Box, Button, Img, Table, Tbody, Td, Tr } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

const UploadedVideos = () => {
    const router = useRouter();

    const handleOpenVideoAnalytics = () => {
        router.push('/dashboard/analytics/highlights');
    };

    return (
        <Box overflowX={'auto'}>
            <Table mt={8}>
                <Tbody>
                    {uploadedVideosData
                        .map((data: any, key) => (
                            <>
                                <Tr
                                    bg="dark"
                                    borderRadius="lg"
                                    key={key}
                                    onClick={handleOpenVideoAnalytics}
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
                                    <Td border="none" fontSize={'xs'}>
                                        {data.time}
                                    </Td>
                                    <Td border={'none'}>
                                        <Button variant="outline" fontSize={'2xs'}>
                                            ANALYZING
                                        </Button>
                                    </Td>
                                    <Td border={'none'}>
                                        <Img src="/icons/share.svg" alt="share a video" />
                                    </Td>
                                    <Td border={'none'}>
                                        <Img src="/icons/delete.svg" alt="delete a video" />
                                    </Td>
                                </Tr>
                                <Box bg="transparent" p={4} />
                            </>
                        ))
                        .slice(0, 4)}
                </Tbody>
            </Table>
        </Box>
    );
};

export default UploadedVideos;
