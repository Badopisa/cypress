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
    WrapItem
} from '@chakra-ui/react';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const TabSelectedStyle = {
    color: 'white',
    bg: 'primary',
    rounded: '5px'
};

const Highlights = () => {
    const [tab, setTab] = useState<number>(1);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [showControl, setShowControl] = useState<boolean>(false);
    const [check] = useState<boolean>(false);
    console.log(check);
    return (
        <>
            <DashboardDesktopNav hasArrow />
            <Text color="white">Video Analytics</Text>

            <Grid
                templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
                gap={4}
                color="white">
                <GridItem colSpan={{ md: 2, base: 1 }}>
                    <VStack alignItems="left" w={{ base: '100%', md: '100%' }} spacing={4}>
                        <Tabs
                            variant="unstyled"
                            mt={{ base: 8, md: 4 }}
                            alignContent="center"
                            w={{ base: '100%', md: '100%' }}>
                            <TabList
                                bg="dark"
                                color="white"
                                w={{ base: '100%', md: '100%' }}
                                rounded={5}
                                p={{ base: '0', md: '8px 16px' }}>
                                <Tab _selected={TabSelectedStyle} onClick={() => setTab(1)}>
                                    Highlights
                                </Tab>
                                <Spacer />
                                <Tab _selected={TabSelectedStyle} onClick={() => setTab(2)}>
                                    Match Stats
                                </Tab>
                                <Spacer />
                                <Tab _selected={TabSelectedStyle} onClick={() => setTab(3)}>
                                    Line Up
                                </Tab>
                            </TabList>
                        </Tabs>
                        {tab === 1 && (
                            <>
                                <FormControl w="50%">
                                    <Select bg="ash" outline="none" placeholder="">
                                        <option value="option1" selected>
                                            {' '}
                                            Manchester United vs{' '}
                                        </option>
                                        <option value="option2">Option 2</option>
                                        <option value="option3">Option 3</option>
                                    </Select>
                                </FormControl>
                                <Wrap spacing={2} w="100%">
                                    {matchAnalyticsType.map((data, index) => (
                                        <WrapItem key={index}>
                                            <Button variant="actionOutline" fontSize="xs">
                                                {data}
                                            </Button>
                                        </WrapItem>
                                    ))}
                                </Wrap>
                                <Box objectFit="cover" position={'relative'}>
                                    <AspectRatio
                                        maxW="560px"
                                        ratio={3 / 2}
                                        onMouseEnter={() => setShowControl(!showControl)}>
                                        <>
                                            {' '}
                                            <ReactPlayer
                                                className="react-player"
                                                url="/manu-match.mp4"
                                                width="100%"
                                                height="100%"
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
                                                        src={'/icons/play.svg'}
                                                        alt={'play button'}
                                                    />
                                                </Button>
                                            </Box>
                                        </>
                                    </AspectRatio>
                                </Box>

                                <Text
                                    bg="dark"
                                    p={2}
                                    borderRadius="lg"
                                    w={{ base: '100%', md: '50%' }}>
                                    <span color="black"> Teams:</span>Manchester vs Chelsea
                                </Text>

                                <Text
                                    bg="dark"
                                    p={2}
                                    borderRadius="lg"
                                    w={{ base: '100%', md: '50%' }}>
                                    Competion: Premier League
                                </Text>

                                <Spacer />

                                <Text fontSize={'xm'}>Mini map (Bird&#39;s eye view)</Text>
                                <Box>
                                    <Img src="/images/imgs/mini-map.svg" w="100%" />
                                </Box>
                            </>
                        )}
                        {tab === 2 && <MatchStats />}
                        {tab === 3 && <LineUp />}
                    </VStack>
                </GridItem>
                {/* @nd flex */}

                {tab === 1 && (
                    <GridItem>
                        <VStack spacing={8} w={'100%'}>
                            <Text fontSize="xl" align={'left'}>
                                All Events
                            </Text>
                            {allEventsData
                                .map((data: any, key) => (
                                    <Stack
                                        borderRadius="lg"
                                        w={{ sm: '100%', md: '19rem' }}
                                        h={{ sm: '10rem', md: '10rem' }}
                                        direction={{ base: 'row', md: 'row' }}
                                        bg="dark"
                                        p={2}
                                        key={key}>
                                        <Flex flex={1} w="40%">
                                            <Video data={data} />
                                        </Flex>
                                        <Stack flex={1} flexDirection="column" p={1} pt={2}>
                                            <Text fontSize={'md'} fontFamily={'body'}>
                                                {data.playerName}
                                            </Text>
                                            <Stack
                                                direction={'row'}
                                                spacing={2}
                                                fontSize={'sm'}
                                                alignItems="center">
                                                <Text>{data.playerPosition}</Text>
                                                <Text bg="ash" borderRadius="lg" p={1}>
                                                    {data.eventType}
                                                </Text>
                                            </Stack>
                                            <Stack direction={'row'} spacing={2} fontSize={'sm'}>
                                                <Text>36</Text>
                                                <Flex gap={1} cursor={'pointer'}>
                                                    {' '}
                                                    <Img src="/icons/share.svg" alt="share" w="3" />
                                                    <Text>Share</Text>
                                                </Flex>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                ))
                                .slice(0, 4)}
                            <Center>
                                <Text borderBottom="1px solid white" cursor={'pointer'}>
                                    Load more events
                                </Text>
                            </Center>
                        </VStack>
                    </GridItem>
                )}
            </Grid>
        </>
    );
};

export default authenticatedRoute(Highlights);
