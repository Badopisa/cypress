import {authenticatedRoute} from '@/components/Layout/AuthenticatedRoute';
import React, {useState} from 'react';
import {
    Text,
    Box,
    Spacer,
    VStack,
    Stack,
    Center,
    Button,
    SimpleGrid,
} from '@chakra-ui/react';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import {useRouter} from 'next/router';
import Steps from '@/components/Team/Steps';
import BlankTeam from '@/components/Team/BlankTeam';
import NewPlayer from '@/components/Team/Modal/NewPlayer';
import ExistingPlayer from '@/components/Team/Modal/ExistingPlayer';
import Confirmation from '@/components/Team/Modal/Confirmation';
import PlayerCard from '@/components/Team/PlayerCard';

import {RootStateOrAny, useSelector} from 'react-redux';

const AddTeam = () => {
    const {currentTeam}: { currentTeam: any } = useSelector(
        (state: RootStateOrAny) => state.team
    );
    const [create, setCreate] = useState<boolean>(false);
    const [existing, setExisting] = useState<boolean>(false);
    const [select, setSelected] = useState<boolean>(false);
    const handleCreate = () => {
        setCreate(true);
    };
    const handleExist = () => {
        setExisting(true);
    };

    const router = useRouter();

    return (
        <>
            <DashboardDesktopNav hasArrow />
            <Box color='white' py={{base: 8, md: 8}} px={{base: 4, md: 8}}>
                <Text fontSize='3xl' fontWeight='medium'>
                    Create Team
                </Text>
                <Steps current={2} />
            </Box>
            <Box px={{base: 8, md: 8}} color='white'>
                <Text fontSize='md' fontWeight='medium'>
                    Create or add existing players
                </Text>
                <Stack
                    direction={{base: 'column', md: 'row'}}
                    py={{base: 8, md: 8}}
                    w='100%'
                    spacing={{base: 1, md: 4}}
                >
                    <Button
                        fontSize='xs'
                        variant='action'
                        onClick={handleCreate}
                        w='full'
                    >
                        ADD A PLAYER
                    </Button>
                    <Spacer />
                    <Button
                        fontSize='xs'
                        variant='outline'
                        onClick={handleExist}
                        w='full'
                    >
                        ADD EXISTING PLAYER
                    </Button>
                    <Spacer />
                    <Button px={6} bg='grey' color='white' fontSize='xs' ml='8' w='83'>
                        {currentTeam?.players?.length}/100
                    </Button>
                    <Spacer />
                    <Button fontSize='xs' variant='outline' w='full'>
                        UPLOAD CSV FILE
                    </Button>
                </Stack>
                <SimpleGrid
                    minChildWidth={{base: '100%', md: '166px'}}
                    spacing={{base: '14px', md: '40px'}}
                    mt={8}
                    mb={8}
                >
                    {currentTeam?.players?.length > 0 ? (
                        currentTeam?.players?.map((player: any) => (
                            <PlayerCard
                                key={player?.id}
                                position={player?.position}
                                image={'/images/image/jersy.png'}
                                status='Pending Invite'
                                name={`${player.first_name} ${player.last_name}`}
                            />
                        ))
                    ) : (
                        <BlankTeam
                            image='/images/image/jersy.png'
                            title='No team created yet'
                        />
                    )}
                </SimpleGrid>
                <Center>
                    <VStack
                        mb={10}
                        w={{base: '40%', md: '40%'}}
                        spacing={4}
                        mx={{base: 8, md: 12}}
                    >
                        <Button
                            fontSize='sm'
                            variant='action'
                            px={{base: '80%', md: '50%'}}
                            onClick={() =>
                                router.push('/dashboard/club-management/add-staff')
                            }
                        >
                            NEXT
                        </Button>
                        <Text fontSize='sm' onClick={() => router.back()} cursor='pointer'>
                            PREVIOUS STEP
                        </Text>
                    </VStack>
                </Center>

                <ExistingPlayer
                    isOpen={existing}
                    onClose={setExisting}
                    setSelected={setSelected}
                />

                <NewPlayer isOpen={create} onClose={setCreate} />

                <Confirmation
                    jersyPng='/images/image/jersy.png'
                    isOpen={select}
                    onClose={setSelected}
                    playerName='Kareem Benzema'
                    title='Striker'
                />
            </Box>
        </>
    );
};

export default authenticatedRoute(AddTeam);
