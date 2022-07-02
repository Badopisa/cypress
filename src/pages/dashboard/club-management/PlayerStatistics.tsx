import React, { useState } from 'react';
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
    Text
} from '@chakra-ui/react';

type displayType = {
    setDisplay: any;
    stats: any;
};

const PlayerStatistics = ({ stats, setDisplay }: displayType) => {
    const [progress, setProgress] = useState(10);
    console.log('progress', progress);

    const percentage = 65;
    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);
    return (
        <Box w={'80%'}>
            <Table>
                <Tbody>
                    <Tr
                        onClick={() => setDisplay(1)}
                        cursor={'pointer'}
                        bg="dark"
                        borderRadius="lg">
                        <Td border={'none'} w={''}>
                            <Video data={stats?.video?.full_video} />
                        </Td>
                        <Td border={'none'} fontSize={'xs'}>
                            {stats?.team_name}
                        </Td>
                        <Td border="none" fontSize={'xs'}>
                            {stats?.video?.video_length}
                        </Td>

                        <Td border={'none'}>
                            <Img src="/icons/share.svg" alt="share a video" />
                        </Td>
                        <Td border={'none'}>
                            <Img src="/icons/delete.svg" alt="delete a video" />
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
            <Flex
                direction={{ base: 'column', md: 'row' }}
                justifyContent={'space-between'}
                w="90%"
                mt={4}>
                <Box bg="dark" borderRadius={'lg'} p={8}>
                    <Flex justifyContent={'space-between'} mb={8}>
                        <Text fontSize={'sm'}>Video Analytics</Text>
                        <Button variant={'outline'} alignSelf={'self-end'} px={8} fontSize={'sm'}>
                            SHARE STATS
                        </Button>
                    </Flex>
                    <SimpleGrid columns={3} spacing={4}>
                        <Box bg="ash" borderRadius={'lg'} textAlign={'center'} p={2}>
                            <Text>{stats?.analysis?.analysis?.goals}</Text>
                            <Text>Goals</Text>
                        </Box>
                        <Box bg="ash" borderRadius={'lg'} textAlign={'center'} p={2}>
                            <Text>{stats?.analysis?.analysis?.free_kick}</Text>
                            <Text>F.Kicks</Text>
                        </Box>
                        <Box bg="ash" borderRadius={'lg'} textAlign={'center'} p={2}>
                            <Text>{stats?.analysis?.analysis?.penalty}</Text>
                            <Text>Penalty</Text>
                        </Box>
                        <Box bg="ash" borderRadius={'lg'} textAlign={'center'} p={2}>
                            <Text>2</Text>
                            <Text>Goals Att.</Text>
                        </Box>
                        <Box bg="ash" borderRadius={'lg'} textAlign={'center'} p={2}>
                            <Flex justify="center">
                                <Text>{stats?.analysis?.analysis?.yellow_card}</Text>
                                <Img src="/icons/yellow-card.svg" alt="yellow card" />
                            </Flex>
                            <Text>Yellow Card</Text>
                        </Box>
                        <Box bg="ash" borderRadius={'lg'} textAlign={'center'} p={2}>
                            <Flex justify="center">
                                <Text>{stats?.analysis?.analysis?.red_card}</Text>
                                <Img src="/icons/red-card.svg" alt="red card" />
                            </Flex>
                            <Text>Red Card</Text>
                        </Box>
                    </SimpleGrid>
                    <Flex mt="3rem" gap={6}>
                        <Stack>
                            <Box alignSelf={'center'}>
                                <CircularProgress
                                    value={percentage}
                                    color="green.400"
                                    thickness={'10px'}>
                                    <CircularProgressLabel>{`${percentage}%`}</CircularProgressLabel>
                                </CircularProgress>
                            </Box>
                            <Text>Ball Possession</Text>
                        </Stack>
                        <Stack>
                            <Box alignSelf={'center'}>
                                <CircularProgress
                                    value={percentage}
                                    color="green.400"
                                    thickness={'10px'}>
                                    <CircularProgressLabel>{`${stats?.analysis?.analysis?.long_pass}%`}</CircularProgressLabel>
                                </CircularProgress>
                            </Box>
                            <Text>Long Pass Acc</Text>
                        </Stack>
                        <Stack>
                            <Box alignSelf={'center'}>
                                <CircularProgress
                                    value={percentage}
                                    color="green.400"
                                    thickness={'10px'}>
                                    <CircularProgressLabel>{`${stats?.analysis?.analysis?.short_pass}%`}</CircularProgressLabel>
                                </CircularProgress>
                            </Box>
                            <Text>Short Pass Acc</Text>
                        </Stack>
                    </Flex>
                </Box>
                <Box>
                    <Img src="/images/imgs/graph.svg" alt="grpah" />
                </Box>
            </Flex>
        </Box>
    );
};

export default PlayerStatistics;
