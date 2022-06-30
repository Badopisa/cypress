import AllEvents from '@/components/Analytics/AllEvents';
import LineUp from '@/components/Analytics/LineUp';
import MatchStats from '@/components/Analytics/MatchStats';
import Video from '@/components/Analytics/Video';
import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import { chatData, matchAnalyticsType, uploadedVideosData } from '@/data/AnalyticsData';
import {
    AspectRatio,
    Avatar,
    Box,
    Button,
    Divider,
    Flex,
    FormControl,
    Grid,
    GridItem,
    HStack,
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

                                <AllEvents />
                                <Text fontSize={'xl'}>Mini map Birds Eye View</Text>
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

                <GridItem>
                    <VStack spacing={8} w={'100%'}>
                        <Box bg="dark" borderRadius="lg" w={'100%'} p={8}>
                            <VStack alignItems="left">
                                <Text fontSize="xl">Other analyzed videos</Text>
                                <Button
                                    variant="actionOutline"
                                    fontSize={'xs'}
                                    p={0}
                                    alignSelf="left"
                                    data-testid="upload-and-analyze">
                                    Upload & Analyse Videos
                                </Button>

                                {uploadedVideosData.map((data, index) => (
                                    <>
                                        <HStack key={index} w={{ sm: '100%', md: '100%' }} py={4}>
                                            <Flex flex={1}>
                                                <Video data={data} />
                                            </Flex>
                                            <Stack flex={1} flexDirection="column">
                                                <Text fontSize={'sm'} fontFamily={'body'}>
                                                    {data.players}
                                                </Text>

                                                <Text>{data.time}</Text>
                                                <Button variant="outline" fontSize={'xs'}>
                                                    VIEW ANALYTICS
                                                </Button>
                                            </Stack>
                                        </HStack>
                                        <Divider />
                                    </>
                                ))}
                            </VStack>
                        </Box>

                        <Box bg="dark" borderRadius="lg" w={'100%'} p={3}>
                            <Text fontSize={'xl'}>Recent Chats</Text>

                            {chatData.map((data, index) => (
                                <>
                                    <HStack key={index} py={4}>
                                        <Box>
                                            {' '}
                                            <Avatar src="/images/imgs/avatar.svg" />
                                        </Box>
                                        <Box w="100%">
                                            <VStack w="100%" alignItems="left">
                                                <Flex>
                                                    {' '}
                                                    <Box>
                                                        <VStack align="left">
                                                            <Text>{data.userName} </Text>
                                                            <Text>{data.message}</Text>
                                                        </VStack>
                                                    </Box>
                                                    <Spacer />
                                                    <Box>
                                                        <VStack>
                                                            <Text>{data.status} </Text>
                                                            <Text
                                                                borderRadius="50%"
                                                                w="20px"
                                                                h="20px"
                                                                bg="primary"
                                                                align="center">
                                                                {data.noOfUnreadChats}
                                                            </Text>
                                                        </VStack>
                                                    </Box>{' '}
                                                </Flex>
                                                <Divider />
                                            </VStack>
                                        </Box>
                                    </HStack>
                                </>
                            ))}
                        </Box>
                    </VStack>
                </GridItem>
            </Grid>
        </>
    );
};

export default authenticatedRoute(Highlights);
