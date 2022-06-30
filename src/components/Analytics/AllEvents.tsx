import { allEventsData, matchAnalyticsType } from '@/data/AnalyticsData';
import {
    AspectRatio,
    Box,
    Button,
    Center,
    Divider,
    Flex,
    Grid,
    Heading,
    Img,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue,
    VStack
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import Video from './Video';

const AllEvents = () => {
    return (
        <>
            <Text fontSize="xl">All Events</Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {allEventsData
                    .map((data, key) => (
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
            </SimpleGrid>

            <Center>
                <Text borderBottom="1px solid white" cursor={'pointer'}>
                    Load More Events
                </Text>
            </Center>
        </>
    );
};

export default AllEvents;
