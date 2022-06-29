import BlankTeam from '@/components/Team/BlankTeam';
import NewPlayer from '@/components/Team/Modal/NewPlayer';
import PlayerCard from '@/components/Team/PlayerCard';
import TeamCard from '@/components/Team/TeamCard';
import { teams } from '@/data/TeamData';
import { TeamDataType } from '@/types/TeamDataType';
import {
  Box,
  Button,
  Center,
  Flex,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const AllPlayers = ({ allPlayers, isLoading }: any) => {
  const [searchText, setSearchText] = useState('');
  const [create, setCreate] = useState<boolean>(false);
  const router = useRouter();
  const handleCreatePlayer = () => {
    setCreate(true);
  };
  const handleViewPlayerDetails = () => {
    router.push('/dashboard/club-management/PlayerDetails');
  };
  return (
    <>
      <Flex direction='row'>
        <Button
          w='116px'
          fontSize='xs'
          fontWeight='semibold'
          variant='outline'
          _hover={{ bg: 'white', color: 'dark', fontWeight: 'bold' }}
          onClick={handleCreatePlayer}
        >
          CREATE A PLAYER
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
          {teams?.length}/100
        </Button>
      </Flex>
      <Box>
        {isLoading ? (
          <Center my='16'>
            <Spinner size='xl' />
          </Center>
        ) : allPlayers?.length > 0 ? (
          <SimpleGrid
            columns={{ base: 1, sm: 2, lg: 4 }}
            width='min(90%, 1200px)'
            spacing={{ base: '14px', md: '40px' }}
            mt={8}
            mb={8}
          >
            {allPlayers.map((player: any) => (
              <PlayerCard
                image={player?.photo}
                key={player.id}
                name={'JANE'}
                position={'WINNER'}
                team={'EE'}
                click={() => handleViewPlayerDetails()}
              />
            ))}
          </SimpleGrid>
        ) : (
          <BlankTeam
            image='/images/image/jersy.png'
            title='No player created yet'
          />
        )}
      </Box>
      <NewPlayer isOpen={create} onClose={setCreate} />
    </>
  );
};

export default AllPlayers;
