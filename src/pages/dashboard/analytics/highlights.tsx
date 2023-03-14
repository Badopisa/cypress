import LineUp from '@/components/Analytics/LineUp';
import MatchStats from '@/components/Analytics/MatchStats';
import Video from '@/components/Analytics/Video';
import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import { allEventsData, matchAnalyticsType } from '@/data/AnalyticsData';
import {
    AspectRatio,
    Box,
    Center,
    Button,
    Flex,
    FormControl,
    Grid,
    GridItem,
    Img,
    Select,
    Spacer,
    Stack,
    Tab,
    TabList,
    Tabs,
    Text,
    VStack,
    Wrap,
    WrapItem,
    HStack,
    Spinner,
    useToast
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import AllVideoAnalytics from '@/components/Analytics/AllVideoAnalytics';
import CompletedVideoAnalytics from '@/components/Analytics/CompletedAnalytics';
import IncompleteVideoAnalytics from '@/components/Analytics/IncompleteAnalytics';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { getVideoAnalytics } from '@/store/actions/analyticsAction';

const TabSelectedStyle = {
    color: 'purple',
    bg: '',
    fontWeight: '400',
    fontSize: '16px',
    borderBottom: '2px solid',
    borderBottomColor: 'purple'
};

const Highlights = () => {
    const [tab, setTab] = useState<number>(1);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    // const [isPlayingMini, setIsPlayingMini] = useState<boolean>(false);
    const [showControl, setShowControl] = useState<boolean>(false);
    const { isLoading } = useSelector((state: RootStateOrAny) => state.msg);
    const { videoAnalyticsDetails, analyticsId } = useSelector(
        (state: RootStateOrAny) => state.analytics
    );
    const [selectedHighlight, setSelectedHighlight] = useState<string>('');
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [check] = useState<boolean>(false);
    const dispatch = useDispatch();
    const toast = useToast();
    console.log(check);

    useEffect(() => {
        console.log('vid');
    }, [videoUrl]);

    useEffect(() => {
        if (videoAnalyticsDetails) {
            setSelectedHighlight(videoAnalyticsDetails?.actions_urls[0]?.name);
        }
        dispatch(getVideoAnalytics(analyticsId, toast));
    }, [analyticsId]);

    // if (isLoading) {
    //     return (
    //         <Center my="16">
    //             <Spinner size="xl" />
    //         </Center>
    //     );
    // }

    return (
        <>
            <DashboardDesktopNav hasArrow />
            <Box color="black2" w={'100%'} p={{ base: '4px' }}>
                <Text fontSize={'40px'} fontWeight="700" color={'black2'}>
                    View analytics
                </Text>
                <Flex alignItems={'center'} direction={{ base: 'column-reverse', md: 'row' }}>
                    <Tabs
                        mt={{ base: 8, md: 4 }}
                        // borderBottomColor={'grey6'}
                        alignContent="center"
                        w={{ base: '100%', md: '50%' }}>
                        <TabList w={{ base: '100%', md: '371px' }} p={{ base: '0', md: '0 16px' }}>
                            <Tab
                                _focus={{
                                    border: 'none'
                                }}
                                _selected={TabSelectedStyle}
                                onClick={() => setTab(1)}>
                                Highlights
                            </Tab>
                            <Spacer />
                            <Tab
                                _focus={{
                                    border: 'none'
                                }}
                                _selected={TabSelectedStyle}
                                onClick={() => setTab(2)}>
                                Match stats
                            </Tab>
                            {/*<Spacer />*/}
                            {/*<Tab*/}
                            {/*    _focus={{*/}
                            {/*        border: 'none'*/}
                            {/*    }}*/}
                            {/*    _selected={TabSelectedStyle}*/}
                            {/*    onClick={() => setTab(3)}>*/}
                            {/*    Line up*/}
                            {/*</Tab>*/}
                        </TabList>
                    </Tabs>
                </Flex>
                <Box mb={'20px'} w={'100%'} borderColor={'grey6'} borderWidth={'1px'} h={'1px'} />
                <Spacer />
                {tab === 1 && (
                    <>
                        {isLoading ? (
                            <Center my="16">
                                <Spinner size="xl" />
                            </Center>
                        ) : (
                            <>
                                <Wrap spacingX={2} w="100%">
                                    {videoAnalyticsDetails.actions_urls?.map(
                                        (data: any, index: any) => (
                                            <WrapItem key={data.name}>
                                                <Button
                                                    onClick={() => {
                                                        setSelectedHighlight(data.name);
                                                        setVideoUrl(data.video_url);
                                                        // setShowControl(true);
                                                    }}
                                                    bg={
                                                        selectedHighlight === data.name
                                                            ? 'black2'
                                                            : 'white'
                                                    }
                                                    color={
                                                        selectedHighlight === data.name
                                                            ? 'white'
                                                            : 'black2'
                                                    }
                                                    borderRadius={'40px'}
                                                    fontSize="xs">
                                                    {data?.name}
                                                </Button>
                                            </WrapItem>
                                        )
                                    )}
                                </Wrap>
                                {/*<VStack*/}
                                {/*    h={'850px'}*/}
                                {/*    justifyContent={'flex-start'}*/}
                                {/*    borderRadius={'20px'}*/}
                                {/*    objectFit="cover"*/}
                                {/*    bg={'red'}*/}
                                {/*    position={'relative'}>*/}
                                <AspectRatio
                                    w="100%"
                                    h={'850px'}
                                    borderRadius={'10px'}
                                    // ratio={3 / 2}
                                    onMouseEnter={() => setShowControl(!showControl)}>
                                    <>
                                        {' '}
                                        <ReactPlayer
                                            className="react-player"
                                            borderRadius={'10px'}
                                            width={'100%'}
                                            height={'100%'}
                                            // height={'850px'}
                                            // url="/manu-match.mp4"
                                            url={videoUrl || videoAnalyticsDetails.full_video}
                                            playing={isPlaying}
                                        />
                                        <Box
                                            position={'absolute'}
                                            top={0}
                                            bottom={0}
                                            right={0}
                                            left={0}
                                            visibility={showControl ? 'visible' : 'hidden'}>
                                            {' '}
                                            <Button
                                                bg={'transparent'}
                                                _hover={{ bg: 'transparent', border: 'none' }}
                                                onClick={() => setIsPlaying(!isPlaying)}>
                                                <Img
                                                    src={'/icons/play-circle.svg'}
                                                    alt={'play button'}
                                                />
                                            </Button>
                                        </Box>
                                    </>
                                </AspectRatio>
                                {/*</VStack>*/}

                                <Text color="black2" fontSize={'16px'} fontWeight={'400'}>
                                    {videoAnalyticsDetails.filename}
                                </Text>

                                <Text color={'grey3'} fontSize={'14px'} fontWeight={'400'}>
                                    {videoAnalyticsDetails.league}
                                </Text>

                                <Box
                                    w={'100%'}
                                    border={'1px solid'}
                                    my={'40px'}
                                    borderColor={'lightWhite'}
                                />

                                <HStack
                                    flexDirection={{ sm: 'column', md: 'row' }}
                                    justifyContent={'flex-start'}
                                    alignItems={'flex-start'}
                                    w={'100%'}>
                                    <VStack
                                        w={'100%'}
                                        alignItems={'flex-start'}
                                        justifyContent={'flex-start'}>
                                        <Text>Minimap</Text>
                                        {/*<Box>*/}
                                        {/*    <Img src="/images/imgs/mini-map.svg" w="700px" h={'100%'} />*/}
                                        {/*</Box>*/}
                                        <AspectRatio
                                            w="100%"
                                            borderRadius={'10px'}
                                            // ratio={3 / 2}
                                            onMouseEnter={() => setShowControl(!showControl)}>
                                            <>
                                                {' '}
                                                <ReactPlayer
                                                    className="react-player"
                                                    borderRadius={'10px'}
                                                    width={'100%'}
                                                    height={'550px'}
                                                    url={videoAnalyticsDetails.minimap}
                                                    // url="https://sonalysis-asset.s3.amazonaws.com/1b091553-463a-4344-b19a-0ff86c77e9c3.mp4"
                                                    playing={isPlaying}
                                                />
                                                {/*<Box*/}
                                                {/*    position={'absolute'}*/}
                                                {/*    top={0}*/}
                                                {/*    bottom={0}*/}
                                                {/*    right={0}*/}
                                                {/*    left={0}*/}
                                                {/*    visibility={showControl ? 'visible' : 'hidden'}>*/}
                                                {/*    {' '}*/}
                                                {/*    <Button*/}
                                                {/*        bg={'transparent'}*/}
                                                {/*        _hover={{ bg: 'transparent', border: 'none' }}*/}
                                                {/*        onClick={() => setIsPlaying(!isPlaying)}>*/}
                                                {/*        <Img src={'/icons/play.svg'} alt={'play button'} />*/}
                                                {/*    </Button>*/}
                                                {/*</Box>*/}
                                            </>
                                        </AspectRatio>
                                    </VStack>
                                    <VStack
                                        w={{ sm: '100%', md: '45%' }}
                                        alignItems={'flex-start'}
                                        justifyContent={'flex-start'}>
                                        <Text>All events</Text>
                                        <VStack
                                            w={'100%'}
                                            alignItems={'flex-start'}
                                            h={'500px'}
                                            overflowY={'scroll'}
                                            justifyContent={'flex-start'}>
                                            {videoAnalyticsDetails.actions?.map((data: any) => (
                                                <Stack
                                                    borderRadius="lg"
                                                    w={'100%'}
                                                    // h={{ sm: '10rem', md: '10rem' }}
                                                    direction={{ base: 'row', md: 'row' }}
                                                    bg="lightWhite"
                                                    justifyContent={'flex-start'}
                                                    p={'20px'}
                                                    key={data?.id}>
                                                    {/*<Flex flex={1} w="100px">*/}
                                                    <Box w={'150px'}>
                                                        <ReactPlayer
                                                            className="react-player"
                                                            // url={data.file}
                                                            url="https://sonalysis-asset.s3.amazonaws.com/1b091553-463a-4344-b19a-0ff86c77e9c3.mp4"
                                                            width={'100%'}
                                                            height={'100%'}
                                                            // playing={isPlaying}
                                                        />
                                                    </Box>
                                                    {/*</Flex>*/}
                                                    <Stack
                                                        flex={1}
                                                        flexDirection="column"
                                                        p={1}
                                                        pt={2}>
                                                        <Text fontSize={'md'} fontFamily={'body'}>
                                                            {data.time_seconds}' {data.player}
                                                        </Text>
                                                        <Stack
                                                            direction={'row'}
                                                            spacing={2}
                                                            fontSize={'sm'}
                                                            alignItems="center">
                                                            <Text borderRadius="lg" p={1}>
                                                                {data.actiontype}
                                                            </Text>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            ))}
                                        </VStack>
                                    </VStack>
                                </HStack>
                            </>
                        )}
                    </>
                )}
                {tab === 2 && <MatchStats />}
                {tab === 3 && <LineUp />}
            </Box>
            <Text color="white">Video Analytics</Text>
            {/*// {tab === 1 && (*/}
            {/*//     <GridItem>*/}
            {/*//         <VStack spacing={8} w={'100%'}>*/}
            {/*//             <Text fontSize="xl" align={'left'}>*/}
            {/*//                 All Events*/}
            {/*//             </Text>*/}
            {/*//             {allEventsData*/}
            {/*//                 .map((data: any, key) => (*/}
            {/*//                     <Stack*/}
            {/*//                         borderRadius="lg"*/}
            {/*//                         w={{ sm: '100%', md: '19rem' }}*/}
            {/*//                         h={{ sm: '10rem', md: '10rem' }}*/}
            {/*//                         direction={{ base: 'row', md: 'row' }}*/}
            {/*//                         bg="dark"*/}
            {/*//                         p={2}*/}
            {/*//                         key={key}>*/}
            {/*//                         <Flex flex={1} w="40%">*/}
            {/*//                             <Video data={data} />*/}
            {/*//                         </Flex>*/}
            {/*//                         <Stack flex={1} flexDirection="column" p={1} pt={2}>*/}
            {/*//                             <Text fontSize={'md'} fontFamily={'body'}>*/}
            {/*//                                 {data.playerName}*/}
            {/*//                             </Text>*/}
            {/*//                             <Stack*/}
            {/*//                                 direction={'row'}*/}
            {/*//                                 spacing={2}*/}
            {/*//                                 fontSize={'sm'}*/}
            {/*//                                 alignItems="center">*/}
            {/*//                                 <Text>{data.playerPosition}</Text>*/}
            {/*//                                 <Text bg="ash" borderRadius="lg" p={1}>*/}
            {/*//                                     {data.eventType}*/}
            {/*//                                 </Text>*/}
            {/*//                             </Stack>*/}
            {/*//                             <Stack direction={'row'} spacing={2} fontSize={'sm'}>*/}
            {/*//                                 <Text>36</Text>*/}
            {/*//                                 <Flex gap={1} cursor={'pointer'}>*/}
            {/*//                                     {' '}*/}
            {/*//                                     <Img src="/icons/share.svg" alt="share" w="3" />*/}
            {/*//                                     <Text>Share</Text>*/}
            {/*//                                 </Flex>*/}
            {/*//                             </Stack>*/}
            {/*//                         </Stack>*/}
            {/*//                     </Stack>*/}
            {/*//                 ))*/}
            {/*//                 .slice(0, 4)}*/}
            {/*//             <Center>*/}
            {/*//                 <Text borderBottom="1px solid white" cursor={'pointer'}>*/}
            {/*//                     Load more events*/}
            {/*//                 </Text>*/}
            {/*//             </Center>*/}
            {/*//         </VStack>*/}
            {/*// )}*/}
        </>
    );
};

export default authenticatedRoute(Highlights);
