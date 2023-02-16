import BlankTeam from '@/components/Team/BlankTeam';
import NewPlayer from '@/components/Team/Modal/NewPlayer';
import PlayerCard from '@/components/Team/PlayerCard';
import {
    Box,
    Button,
    Center,
    Flex, Img,
    Input,
    InputGroup,
    InputLeftElement,
    SimpleGrid,
    Spinner,
    useToast
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPlayerDetails } from '@/store/actions/playerActions';
import { BsSearch } from 'react-icons/bs';

const AllPlayers = ({ allPlayers, isLoading, setCreate }: any) => {
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
            <Box>
                {isLoading ? (
                    <Center my="16">
                        <Spinner size="xl" />
                    </Center>
                ) : allPlayers?.length > 0 ? (
                    <>
                        <InputGroup w="379px">
                            <InputLeftElement pointerEvents="none">
                                <Img
                                    mt={'10px'}
                                    src={'/images/icons/search-normal.svg'}
                                    alt={'search'}
                                />
                            </InputLeftElement>
                            <Input
                                type="text"
                                placeholder="Search player"
                                // value={searchText}
                                // onChange={handleTeamSearch}
                                focusBorderColor="purple"
                                borderColor={'grey5'}
                                size={'lg'}
                                borderRadius={'6px'}
                                _placeholder={{
                                    opacity: 1,
                                    color: 'inputText',
                                    fontSize: '16px',
                                    fontWeight: '400'
                                }}
                            />
                        </InputGroup>
                        <SimpleGrid
                            columns={{ base: 1, sm: 2, lg: 6 }}
                            // width="min(90%, 1200px)"
                            spacingX={{ base: '14px', md: '10px' }}
                            spacingY={{ base: '14px', md: '20px' }}
                            mt={8}
                            mb={8}>
                            {allPlayers.map((player: any) => (
                                <PlayerCard
                                    image={player?.photo}
                                    key={player.id}
                                    number={player.jersey_number}
                                    name={`${player?.first_name} ${player?.last_name}`}
                                    position={player?.position}
                                    team={player?.team_name}
                                    click={() => handleViewPlayerDetails(player)}
                                />
                            ))}
                        </SimpleGrid>
                    </>
                ) : (
                    <BlankTeam image="/images/image/jersy.png" title="No player created yet" />
                )}
            </Box>
        </>
    );
};

export default AllPlayers;
