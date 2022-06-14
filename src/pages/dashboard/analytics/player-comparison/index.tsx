import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import {
  Center,
  VStack,
  Tabs,
  TabList,
  Tab,
  Text,
  Spacer,
  Heading,
  Container,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import PlayerVideo from './player-video';
import PlayerVsPlayer from './player-vs-player';

const PlayerComparison = () => {
  const [tab, setTab] = useState(1);
  const TabSelectedStyle = {
    color: 'white',
    bg: 'primary',
    rounded: '5px',
  };

  return (
    <>
      <DashboardDesktopNav hasArrow />

      <Container maxW='2xl'>
        <VStack color='white' align={{ base: 'center', lg: 'flex-start' }}>
          <Text fontSize={'3xl'} mb={4}>
            Player Comparison
          </Text>
          <Tabs
            variant='unstyled'
            mt={{ base: 8, md: 4 }}
            alignContent='center'
            w={{ base: '100%', md: '100%' }}
          >
            <TabList
              bg='dark'
              color='white'
              w={{ base: '100%', md: '100%' }}
              rounded={5}
              p={{ base: '0', md: '8px 16px' }}
            >
              <Tab _selected={TabSelectedStyle} onClick={() => setTab(1)}>
                Player vs Player
              </Tab>
              <Spacer />
              <Tab _selected={TabSelectedStyle} onClick={() => setTab(2)}>
                Player Video
              </Tab>
            </TabList>
          </Tabs>
          {tab === 1 && <PlayerVsPlayer />}
          {tab === 2 && <PlayerVideo />}
        </VStack>
      </Container>
    </>
  );
};

export default authenticatedRoute(PlayerComparison);
