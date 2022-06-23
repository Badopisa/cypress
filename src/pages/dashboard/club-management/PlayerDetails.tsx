import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import PlayerCard from '@/components/Team/PlayerCard';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Img,
  Tag,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import EditPlayerDetails from '@/components/Team/Modal/EditPlayerDetails';
import Confirmation from '@/components/Team/Modal/Confirmation';

import BlankTeam from '@/components/Team/BlankTeam';

import PlayerVideos from './PlayerVideos';
import PlayerStatistics from './PlayerStatistics';

const PlayerDetails = () => {
  const [editPlayer, setEditPlayer] = useState<boolean>(false);
  const [select, setSelected] = useState<boolean>(false);
  const [isVideosAvailable, setIsVideosAvailable] = useState(true);
  const [display, setDisplay] = useState(1);

  const handleEditPlayer = () => {
    setEditPlayer(true);
  };

  return (
    <>
      <DashboardDesktopNav hasArrow />
      <Box>
        <Text fontSize={'xl'} fontWeight='semibold'>
          Club management
        </Text>
        <Flex
          gap={10}
          w={'100%'}
          my={8}
          direction={{ base: 'column', md: 'row' }}
        >
          <VStack>
            <Avatar
              bg='ash'
              boxSize={{ base: '5rem', md: '7.5rem' }}
              src={'/images/imgs/player.svg'}
            />
            <Text fontSize={'l'} fontWeight='semibold'>
              09. Edison Cavani
            </Text>
          </VStack>

          <Wrap w={'35%'} alignSelf={{ base: 'self-start', md: 'self-end' }}>
            <Tag fontSize={'sm'} p={2} color='white' bg='dark'>
              Wolves B Team
            </Tag>
            <Tag fontSize={'sm'} p={2} color='white' bg='dark'>
              Forward
            </Tag>
            <Tag p={2} color='white' bg='dark'>
              23yrs
            </Tag>
            <Tag fontSize={'sm'} p={2} color='white' bg='dark'>
              United States
            </Tag>
            <Tag fontSize={'sm'} p={2} color='white' bg='dark'>
              Invite Pending
            </Tag>
          </Wrap>

          <Button variant={'action'} alignSelf={'self-end'} px={8}>
            SEND MESSAGE
          </Button>
          <Button
            variant={'outline'}
            onClick={handleEditPlayer}
            alignSelf={'self-end'}
            px={8}
            fontSize={'sm'}
          >
            <Img src={'/icons/edit-pen.svg'} alt={'Edit'} mr={2} />
            EDIT PROFILE
          </Button>
        </Flex>
        {!isVideosAvailable && (
          <BlankTeam
            image='/images/image/jersy.png'
            title='No videos available for this player'
          />
        )}
        {isVideosAvailable && display === 1 && (
          <PlayerVideos setDisplay={setDisplay} />
        )}
        {isVideosAvailable && display === 2 && <PlayerStatistics />}
      </Box>
      <EditPlayerDetails
        isOpen={editPlayer}
        onClose={setEditPlayer}
        setSelected={setSelected}
      />
      <Confirmation
        jersyPng={'/images/imgs/success.svg'}
        isOpen={select}
        onClose={setSelected}
        body={'Sonalysis will notify this player of the changes made'}
        title='Changes Saved'
        buttonTitle={'OKAY, THANK YOU'}
      />
    </>
  );
};

export default authenticatedRoute(PlayerDetails);
