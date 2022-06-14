import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import PlayerCard from '@/components/Team/PlayerCard';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Img,
  Input,
  SimpleGrid,
  Spacer,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { allEventsData } from '@/data/AnalyticsData';
import React, { useState } from 'react';
import EditPlayerModal from '@/components/Team/Modal/EditPlayerModal';
import NewPlayer from '@/components/Team/Modal/NewPlayer';
import EditStaffModal from '@/components/Team/Modal/EditStaffModal';
import EditTeamInfo from '@/components/Team/Modal/EditTeamInfo';
import { staffData } from '@/data/StaffData';
const TeamManagement = () => {
  const [tab, setTab] = useState<number>(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [create, setCreate] = useState<boolean>(false);
  const [openStaff, setOpenStaff] = useState<boolean>(false);
  const [openTeam, setOpenTeam] = useState<boolean>(false);

  const handleCreate = () => {
    setCreate(true);
  };
  const handleEditTeam = () => {
    setOpenTeam(true);
  };
  const handleStaffModal = () => {
    setOpenStaff(true);
  };

  const TabSelectedStyle = {
    color: 'white',
    bg: 'primary',
    rounded: '5px',
  };
  return (
    <>
      <DashboardDesktopNav hasArrow />
      <Box>
        <Text fontSize={'xl'} fontWeight='semibold'>
          Club management
        </Text>
        <Flex justify='space-between' w={'70%'} my={8}>
          <VStack>
            <Avatar
              bg='ash'
              boxSize={{ base: '5rem', md: '7.5rem' }}
              src={'/icons/team-icon.svg'}
            />
            <Text fontSize={'xl'} fontWeight='semibold'>
              Wolves FC B
            </Text>
          </VStack>

          <Wrap w={'45%'} alignSelf={'self-end'}>
            <Text fontSize={'sm'} p={1} color='white' bg='dark'>
              23 Players
            </Text>
            <Text fontSize={'sm'} p={1} color='white' bg='dark'>
              6 Backroom Staffs
            </Text>
            <Text p={1} color='white' bg='dark'>
              United Kingdom
            </Text>
            <Text fontSize={'sm'} p={1} color='white' bg='dark'>
              1920-2022
            </Text>
          </Wrap>

          <Button
            variant={'action'}
            onClick={handleEditTeam}
            alignSelf={'self-end'}
            px={8}
          >
            EDIT TEAM INFO
          </Button>
        </Flex>

        <Tabs
          variant='unstyled'
          my={{ base: 8, md: 4 }}
          alignContent='center'
          w={'50%'}
        >
          <TabList
            bg='dark'
            color='white'
            w={{ base: '100%', md: '100%' }}
            rounded={5}
            p={{ base: '0', md: '8px 16px' }}
          >
            <Tab _selected={TabSelectedStyle} onClick={() => setTab(1)}>
              All Players
            </Tab>
            <Spacer />
            <Tab _selected={TabSelectedStyle} onClick={() => setTab(2)}>
              Staff
            </Tab>
          </TabList>
        </Tabs>

        <Input
          id='search'
          name='search'
          type='text'
          placeholder='Search for team'
          bg={'ash'}
          w={'50%'}
          mb={'6'}
        />
        {tab === 1 && (
          <>
            <Flex direction='row'>
              <Button
                w='116px'
                fontSize='xs'
                fontWeight='semibold'
                variant='outline'
                _hover={{ bg: 'white', color: 'dark', fontWeight: 'bold' }}
                onClick={handleCreate}
              >
                ADD NEW PLAYER
              </Button>
              <Button
                bg='grey'
                color='white'
                fontSize='sm'
                ml='8'
                w='83'
                _hover={{
                  bg: 'primary',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                0/150
              </Button>
            </Flex>
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} mt={8} spacing={8}>
              {allEventsData
                .map((player, index) => (
                  <PlayerCard
                    image='/images/imgs/player.svg'
                    key={index}
                    name={player.playerName}
                    team='Wolves'
                    click={onOpen}
                  />
                ))
                .slice(0, 6)}
            </SimpleGrid>
          </>
        )}
        {tab === 2 && (
          <>
            <Flex direction='row'>
              <Button
                w='116px'
                fontSize='xs'
                fontWeight='semibold'
                variant='outline'
                _hover={{ bg: 'white', color: 'dark', fontWeight: 'bold' }}
              >
                ADD NEW STAFF
              </Button>
              <Button
                bg='grey'
                color='white'
                fontSize='sm'
                ml='8'
                w='83'
                _hover={{
                  bg: 'primary',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                5/150
              </Button>
            </Flex>
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} mt={8} spacing={8}>
              {staffData
                .map((staff, index) => (
                  <PlayerCard
                    image={staff.file}
                    key={index}
                    name={staff.staffName}
                    position={staff.staffPosition}
                    click={handleStaffModal}
                  />
                ))
                .slice(0, 6)}
            </SimpleGrid>
          </>
        )}
        <NewPlayer isOpen={create} onClose={setCreate} />
        <EditTeamInfo isOpen={openTeam} onClose={setOpenTeam} />
        <EditPlayerModal isOpen={isOpen} onClose={onClose} />
        <EditStaffModal isOpen={openStaff} onClose={setOpenStaff} />
      </Box>
    </>
  );
};

export default authenticatedRoute(TeamManagement);
