import { SearchIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Center,
    Checkbox,
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
    Tag,
    TagCloseButton,
    TagLabel,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    VStack
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import Video from '@/components/Analytics/Video';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { getAllPlayers } from '@/store/actions/teamActions';
import { UserDataType } from '@/types/AuthDataType';
import { getPlayerVideos, getPlayerVideosStats } from '@/store/actions/comaprisonAction';
import PlayVideoModal from '@/components/Team/Modal/PlayVideoModal';

const PlayerVideo = () => {
    const {
        allPlayers
    }: {
        allPlayers: any;
    } = useSelector((state: RootStateOrAny) => state.team);
    const { user }: { user: UserDataType } = useSelector((state: RootStateOrAny) => state.auth);
    const playerVideos: any = useSelector((state: any) => state.playersStatistics.playerVideos);
    const playerVideosStatistics: any = useSelector(
        (state: any) => state.playersStatistics.playerVideosStatistics.data
    );
    const dispatch = useDispatch();

    const [selected] = useState(true);
    const [selectedPlayerVideos, setSelectedPlayerVideos] = useState<any>([]);
    const [isCompare, setIsCompare] = useState(false);
    const [isVideosAvailable, setIsVideosAvailable] = useState(false);
    const [viewSelectedVideo, setViewSelectedVideo] = useState<boolean>(false);
    const [toBePlayedVideo, setToBePlayedVideo] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');

    useEffect(() => {
        dispatch(getAllPlayers(user?.clubs[0]?.id));
    }, []);

    const handleSelectedPlayer = (e: any) => {
        const playerId = e.target.value;
        dispatch(getPlayerVideos(playerId));
        setIsVideosAvailable(true);
    };
    const handleSelectedVideo = (video: any) => {
        console.log('We are checking');
        console.log('selected video videoId', video.video_ids);
        console.log('selected video playerId', video.player_id);
        console.log('selected video clubId', video.club_id);
        console.log('selected video', video);
        const videos = selectedPlayerVideos.filter((video: any) => video);
        setSelectedPlayerVideos([...videos, video]);
        console.log('vvvvv', selectedPlayerVideos);
    };

    const handleRemoveSelectedPlayerVideo = (fileName: string) => {
        const videos = selectedPlayerVideos.filter(
            (video: any) => video.video?.filename != fileName
        );
        setSelectedPlayerVideos(videos);
    };
    const fetchPlayerVideosStatistics = () => {
        setIsCompare(true);
        const videoIds = selectedPlayerVideos.map((video: any) => {
            console.log('ssids', video.video.id);
            return video.video.id;
        });
        const clubId = selectedPlayerVideos[0]?.club_id;
        const playerId = selectedPlayerVideos[0]?.player_id;
        console.log('videoIdsss', videoIds);
        console.log('clubId', clubId);
        console.log('playerId', playerId);

        dispatch(getPlayerVideosStats(videoIds, playerId, clubId));
    };
    const playSelectedVideo = (video: any, filename: string) => {
        setViewSelectedVideo(true);
        setToBePlayedVideo(video);
        setFileName(filename);
    };

    return (
        <>
            <VStack align="left" w={'90%'}>
                <FormControl my={4} w={{ base: '50%', md: '30%' }}>
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
                <Text fontSize={'md'}>Selected Videos</Text>

                {selected || isCompare ? (
                    <>
                        <Flex gap={5}>
                            {selectedPlayerVideos.length > 0 &&
                                selectedPlayerVideos.map((videos: any) => {
                                    console.log('vidddee', videos);
                                    return (
                                        <Tag
                                            size={'lg'}
                                            p={4}
                                            key={videos.id}
                                            borderRadius={'lg'}
                                            variant="solid"
                                            bg={'dark'}
                                            mb={2}>
                                            <Img
                                                src="/images/imgs/football-match.svg"
                                                w={'60px'}
                                                mr={4}
                                            />
                                            <TagLabel>{videos.video?.filename}</TagLabel>
                                            <TagCloseButton
                                                onClick={() =>
                                                    handleRemoveSelectedPlayerVideo(
                                                        videos.video?.filename
                                                    )
                                                }
                                            />
                                        </Tag>
                                    );
                                })}
                        </Flex>
                    </>
                ) : (
                    <>
                        {' '}
                        <Box bg="dark" p={4} w={{ base: '100%', md: '40%' }}>
                            <Text color={'textGray'}>
                                The videos that you select will be shown right here
                            </Text>
                            <Text>Note: You can select more videos for comparison</Text>
                        </Box>
                    </>
                )}

                {!isCompare ? (
                    <>
                        {' '}
                        <Button
                            variant="action"
                            w={{ base: '100%', md: '40%' }}
                            onClick={fetchPlayerVideosStatistics}>
                            COMPARE
                        </Button>
                        <Text fontSize={'xl'}>Video Uploads</Text>
                        {isVideosAvailable && (
                            <>
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
                                <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={12}>
                                    {playerVideos.map((video: any) => (
                                        <Box key={video.id}>
                                            <Box
                                                onClick={() =>
                                                    playSelectedVideo(
                                                        video.video.full_video,
                                                        video.video.filename
                                                    )
                                                }>
                                                <Video
                                                    data={video.video?.full_video}
                                                    canPlay={false}
                                                />
                                            </Box>
                                            <Tag
                                                size={'lg'}
                                                p={4}
                                                variant="solid"
                                                bg={'dark'}
                                                mb={2}>
                                                <TagLabel>Teams: {video.video.filename}</TagLabel>
                                            </Tag>
                                            <Tag
                                                size={'lg'}
                                                p={4}
                                                variant="solid"
                                                bg={'dark'}
                                                mb={2}>
                                                <TagLabel>Competition: {'Premier League'}</TagLabel>
                                            </Tag>

                                            <Checkbox
                                                size="md"
                                                mx={4}
                                                colorScheme="green"
                                                value={video.video?.filename}
                                                onChange={() => handleSelectedVideo(video)}
                                            />
                                        </Box>
                                    ))}
                                </SimpleGrid>
                            </>
                        )}
                        {!isVideosAvailable && (
                            <Flex textAlign="center" mt={12} direction="column">
                                <Center mt="24px" mb="24px">
                                    <Img src={'/icons/video.svg'} alt="video" h="66px" />
                                </Center>
                                <Text fontSize="18px" fontWeight="500" mb={4}>
                                    {'Uploaded videos will appear here'}
                                </Text>
                            </Flex>
                        )}
                    </>
                ) : (
                    <>
                        <Text fontWeight={'bold'} mb={'24px'}>
                            Player stats
                        </Text>
                        <TableContainer
                            overflow={'auto'}
                            width={'100%'}
                            bg={'dark'}
                            borderRadius={'lg'}
                            mt={12}>
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

                                        <Th borderBottom={'none'}>
                                            Yellow Cards{' '}
                                            <Img
                                                src={'/icons/yellow-card.svg'}
                                                alt={'Yellow Cards'}
                                            />
                                        </Th>
                                        <Th borderBottom={'none'}>
                                            Red Cards
                                            <Img src={'/icons/red-card.svg'} alt={'Yellow Cards'} />
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {playerVideosStatistics?.map((stat: any) => (
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
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </>
                )}
            </VStack>

            <PlayVideoModal
                isOpen={viewSelectedVideo}
                onClose={setViewSelectedVideo}
                url={toBePlayedVideo}
                fileName={fileName}
            />
        </>
    );
};

export default PlayerVideo;
