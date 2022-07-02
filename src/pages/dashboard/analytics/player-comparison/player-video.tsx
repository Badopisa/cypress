import { uploadedVideosData } from '@/data/AnalyticsData';
import { SearchIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Img,
    Input,
    Select,
    SimpleGrid,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    VStack
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Video from '@/components/Analytics/Video';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { getAllPlayers } from '@/store/actions/teamActions';
import { UserDataType } from '@/types/AuthDataType';
import { getPlayerVideos } from '@/store/actions/comaprisonAction';

const PlayerVideo = () => {
    const {
        allPlayers
    }: {
        allPlayers: any;
    } = useSelector((state: RootStateOrAny) => state.team);
    const { user }: { user: UserDataType } = useSelector((state: RootStateOrAny) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();

    const [selected] = useState(false);
    const [isCompare] = useState(true);

    useEffect(() => {
        dispatch(getAllPlayers(user?.clubs[0]?.id));
    }, []);

    const handleSelectedPlayer = (e: any) => {
        const playerId = e.target.value;
        dispatch(getPlayerVideos(playerId));
    };
    const handleOpenComparisonResult = () => {
        router.push('/dashboard/analytics/player-comparison/video-comparison-result');
    };
    return (
        <>
            <VStack spacing={8} align="left" w={'80%'}>
                <FormControl w={{ base: '100%', md: '50%' }}>
                    <FormLabel>Choose Player</FormLabel>
                    <Select onChange={handleSelectedPlayer}>
                        {allPlayers.map((player: any) => (
                            <option key={player.id} value={player.id}>
                                {' '}
                                {`${player.first_name} ${player.last_name}`}
                            </option>
                        ))}
                    </Select>
                </FormControl>
                <Text fontSize={'xl'}>Selected Videos</Text>
                <Box bg="dark" p={4} w={{ base: '100%', md: '40%' }}>
                    {selected ? (
                        <>
                            <Flex gap={5}>
                                <Img src="/images/imgs/football-match.svg" w={'60px'} />
                                <Text>ManchesterUnited vs Chelsea</Text>
                            </Flex>
                        </>
                    ) : (
                        <>
                            {' '}
                            <Text color={'textGray'}>
                                The videos that you select will be shown right here
                            </Text>
                            <Text>Note: You can select more videos for comparison</Text>
                        </>
                    )}
                </Box>
                {isCompare ? (
                    <>
                        {' '}
                        <Button
                            variant="action"
                            w={{ base: '100%', md: '40%' }}
                            onClick={handleOpenComparisonResult}>
                            COMPARE
                        </Button>
                        <Text fontSize={'xl'}>Video Uploads</Text>
                        <Flex
                            direction={{ base: 'column', md: 'row' }}
                            justify={'space-between'}
                            alignItems={'center'}
                            w={'100%'}
                            mb="4rem">
                            <Box my={{ base: 4, md: 0 }}>
                                <Stack
                                    direction={'row'}
                                    as={'form'}
                                    spacing={'12px'}
                                    align="center"
                                    justify="center">
                                    <FormControl
                                        p="0.5em"
                                        bg="lightAsh"
                                        display="flex"
                                        borderRadius="lg">
                                        <SearchIcon alignSelf="center" ml={2} />
                                        <Input
                                            variant={'solid'}
                                            bg="transparent"
                                            id={'text'}
                                            type={'text'}
                                            placeholder={'Search for your videos'}
                                            aria-label={'Search for Videos'}
                                        />
                                    </FormControl>

                                    <Img
                                        src="/icons/search-icon.svg"
                                        alt="search"
                                        bg={'lightAsh'}
                                        p={5}
                                        borderRadius={'lg'}
                                    />
                                </Stack>
                            </Box>
                        </Flex>
                        <SimpleGrid columns={[1, 2, 3]} spacing={12}>
                            {uploadedVideosData.map((data, index) => (
                                <Box key={index}>
                                    <Box>
                                        {' '}
                                        <Img
                                            src={'/icons/checked.svg'}
                                            alt="checked"
                                            w={5}
                                            h={5}
                                            color="primary"
                                            position={'absolute'}
                                            zIndex={3}
                                        />
                                        <Video data={data} />
                                    </Box>
                                    <Text bg={'dark'} my={2}>
                                        Teams:{data.players}
                                    </Text>
                                    <Text bg={'dark'}>Competition:{data.competition}</Text>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </>
                ) : (
                    <>
                        <TableContainer
                            overflow={'auto'}
                            width={'90%'}
                            bg={'dark'}
                            borderRadius={'lg'}
                            mt={8}>
                            <Table p={8}>
                                <Thead p={8}>
                                    <Tr>
                                        <Th borderBottom={'none'} />
                                        <Th borderBottom={'none'} width={'4px'}>
                                            Goals Scored
                                        </Th>
                                        <Th borderBottom={'none'}>Shots Attempts</Th>
                                        <Th borderBottom={'none'}>Ball Possession</Th>
                                        <Th borderBottom={'none'}>Long Pass Acc.</Th>
                                        <Th borderBottom={'none'}>Short Pass Acc.</Th>
                                        <Th borderBottom={'none'}>Speed</Th>
                                        <Th borderBottom={'none'}>Free Kicks</Th>
                                        <Th borderBottom={'none'}>Penalties</Th>
                                        <Th borderBottom={'none'}>Yellow Cards</Th>
                                        <Th borderBottom={'none'}>Red Cards</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {/* {playersStats?.map((stat: any) => (
                                        <Tr key={stat.id}>
                                            <Td>{`${stat.player.first_name} ${stat.player.last_name}`}</Td>
                                            <Td>{stat.goal}</Td>
                                            <Td>{`${70}%`}</Td>
                                            <Td>{`${50}%`}</Td>
                                            <Td>{`${stat.long_pass}%`}</Td>
                                            <Td>{`${stat.short_pass}%`}</Td>
                                            <Td>{`${stat.speed}%`}</Td>
                                            <Td>{stat.free_kick}</Td>
                                            <Td>{stat.penalty}</Td>
                                            <Td>{stat.yellow_card}</Td>
                                            <Td>{stat.red_card}</Td>
                                        </Tr>
                                    ))} */}
                                </Tbody>
                            </Table>
                        </TableContainer>
                        <Text>Welcome</Text>
                    </>
                )}
            </VStack>
        </>
    );
};

export default PlayerVideo;
