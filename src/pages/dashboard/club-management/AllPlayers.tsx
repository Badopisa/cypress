import BlankTeam from '@/components/Team/BlankTeam';
import NewPlayer from '@/components/Team/Modal/NewPlayer';
import PlayerCard from '@/components/Team/PlayerCard';
import { Box, Button, Center, Flex, SimpleGrid, Spinner, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPlayerDetails } from '@/store/actions/playerActions';

const AllPlayers = ({ allPlayers, isLoading }: any) => {
    const [create, setCreate] = useState<boolean>(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const toast = useToast();
    const handleCreatePlayer = () => {
        setCreate(true);
    };
    const handleViewPlayerDetails = (player: any) => {
        dispatch(getPlayerDetails(player?.id, router, toast));
    };
    return (
        <>
            <Flex direction="row">
                <Button
                    w="116px"
                    fontSize="xs"
                    fontWeight="semibold"
                    variant="outline"
                    _hover={{ bg: 'white', color: 'dark', fontWeight: 'bold' }}
                    onClick={handleCreatePlayer}>
                    CREATE A PLAYER
                </Button>
                <Button
                    bg="grey"
                    color="white"
                    fontSize="sm"
                    ml="8"
                    w="83"
                    _hover={{
                        bg: 'primary',
                        color: 'white',
                        fontWeight: 'bold'
                    }}>
                    {allPlayers?.length}/100
                </Button>
            </Flex>
            <Box>
                {isLoading ? (
                    <Center my="16">
                        <Spinner size="xl" />
                    </Center>
                ) : allPlayers.length > 0 ? (
                    <SimpleGrid
                        columns={{ base: 1, sm: 2, lg: 4 }}
                        width="min(90%, 1200px)"
                        spacing={{ base: '14px', md: '40px' }}
                        mt={8}
                        mb={8}>
                        {allPlayers.map((player: any) => (
                            <PlayerCard
                                image={player?.photo}
                                key={player.id}
                                name={`${player?.first_name} ${player?.last_name}`}
                                position={player?.position}
                                team={player?.team_name}
                                click={() => handleViewPlayerDetails(player)}
                            />
                        ))}
                    </SimpleGrid>
                ) : (
                    <BlankTeam image="/images/image/jersy.png" title="No player created yet" />
                )}
            </Box>
            <NewPlayer isOpen={create} onClose={setCreate} />
        </>
    );
};

export default AllPlayers;
