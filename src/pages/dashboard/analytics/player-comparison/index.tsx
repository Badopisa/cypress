import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import { VStack, Tabs, TabList, Tab, Text, Spacer } from '@chakra-ui/react';
import React, { useState } from 'react';
import PlayerVideo from './player-video';
import PlayerVsPlayer from './player-vs-player';

const PlayerComparison = () => {
    const [tab, setTab] = useState(1);
    const TabSelectedStyle = {
        color: 'white',
        bg: 'primary',
        rounded: '5px'
    };

    return (
        <>
            <DashboardDesktopNav hasArrow />

            <>
                <VStack color="white" align={{ base: 'left', lg: 'flex-start' }}>
                    <Text fontSize={'3xl'} mb={4}>
                        Comparison
                    </Text>
                    <Tabs
                        variant="unstyled"
                        mt={{ base: 8, md: 4 }}
                        alignContent="center"
                        // px={8}
                        w={{ base: '80%', md: '50%' }}>
                        <TabList
                            bg="dark"
                            color="white"
                            w={{ base: '100%', md: '100%' }}
                            rounded={5}
                            // p={{ base: '0', md: '8px 16px' }}
                        >
                            <Tab _selected={TabSelectedStyle} onClick={() => setTab(1)}>
                                Player Comparison
                            </Tab>
                            <Spacer />
                            <Tab _selected={TabSelectedStyle} onClick={() => setTab(2)}>
                                Video Comparison
                            </Tab>
                        </TabList>
                    </Tabs>
                    {tab === 1 && <PlayerVsPlayer />}
                    {tab === 2 && <PlayerVideo />}
                </VStack>
            </>
        </>
    );
};

export default authenticatedRoute(PlayerComparison);
