import Video from '@/components/Analytics/Video';
import { Box, Button, Img, Table, Tbody, Td, Tr } from '@chakra-ui/react';
import React from 'react';

type displayType = {
    setDisplay: any;
    player: any;
    setStats: any;
};

const PlayerVideos = ({ setDisplay, player, setStats }: displayType) => {
    const handleOpenPlayerStatistics = (data: any) => {
        setStats(data);
        setDisplay(2);
    };

    return (
        <Box overflowX={'auto'} w={'85%'}>
            <Table mt={8}>
                <Tbody>
                    {player?.player?.videos.map((data: any) => (
                        <>
                            <Tr
                                bg="dark"
                                borderRadius="lg"
                                key={data?.id}
                                onClick={() => handleOpenPlayerStatistics(data)}
                                _hover={{ border: ' 1px solid #811AFF' }}
                                cursor={'pointer'}
                                // h={'2%'}
                            >
                                <Td border={'none'} w={''}>
                                    <Video data={data?.video?.last_media_url} />
                                </Td>
                                <Td border={'none'} fontSize={'xs'}>
                                    {data?.team_name}
                                </Td>
                                <Td border="none" fontSize={'xs'}>
                                    {data?.video?.video_length}
                                </Td>
                                <Td border={'none'}>
                                    <Button variant="outline" fontSize={'2xs'}>
                                        VIEW ANALYTICS
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
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default PlayerVideos;
