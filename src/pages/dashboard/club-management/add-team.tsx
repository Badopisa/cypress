import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
import React, { useEffect, useState } from 'react';
import {
    Text,
    Box,
    Spacer,
    VStack,
    Stack,
    Center,
    Button,
    SimpleGrid,
    useToast,
    Spinner,
    HStack
} from '@chakra-ui/react';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import { useRouter } from 'next/router';
import Steps from '@/components/Team/Steps';
import BlankTeam from '@/components/Team/BlankTeam';
import NewPlayer from '@/components/Team/Modal/NewPlayer';
import ExistingPlayer from '@/components/Team/Modal/ExistingPlayer';
import Confirmation from '@/components/Team/Modal/Confirmation';
import PlayerCard from '@/components/Team/PlayerCard';

import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import useUploadToS3 from '@/hooks/useUploadToS3';
import { createMultiplePlayers } from '@/store/actions/playerActions';

const AddTeam = () => {
    const { currentTeam }: { currentTeam: any } = useSelector(
        (state: RootStateOrAny) => state.team
    );
    const { isLoading } = useSelector((state: RootStateOrAny) => state.msg);
    const [csv, setCSV] = React.useState<null | File>(null);
    const { s3URL, s3Error } = useUploadToS3(csv, false);
    const [create, setCreate] = useState<boolean>(false);
    const [existing, setExisting] = useState<boolean>(false);
    const [select, setSelected] = useState<boolean>(false);
    const dispatch = useDispatch();
    const toast = useToast();
    const handleCreate = () => {
        setCreate(true);
    };
    const handleExist = () => {
        setExisting(true);
    };

    useEffect(() => {
        if (s3Error) {
            toast({
                title: 'Error',
                description: 'Error uploading image, please try again or remove image',
                status: 'error',
                duration: 9000,
                isClosable: true
            });
        }
        if (s3URL !== '') {
            dispatch(
                createMultiplePlayers(s3URL, 'PLAYER', currentTeam?.club_id, toast, setExisting)
            );
        }
    }, [s3URL]);

    const handleChange = (event: any) => {
        const file = event.target.files[0];
        setCSV(file);
        console.log('file', file);
    };

    const hiddenFileInput: any = React.useRef(null);

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    const router = useRouter();

    return (
        <>
            <DashboardDesktopNav hasArrow />
            <HStack
                color="black2"
                alignItems={'baseline'}
                py={{ base: 8, md: 8 }}
                px={{ base: 4, md: 8 }}>
                <Text fontSize="40px" fontWeight="700">
                    Add players
                </Text>
                <Text
                    onClick={() => router.push('/dashboard/club-management/add-staff')}
                    cursor={'pointer'}
                    as={'u'}
                    color="green">
                    Skip this step
                </Text>
            </HStack>
            <Box mx={'auto'} color="black2" maxW={{ base: 4, md: '1200px' }}>
                <Box mx={'auto'} maxW={'320px'} mb={'38px'}>
                    <Steps current={2} />
                </Box>
                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    py={{ base: 8, md: 8 }}
                    w="100%"
                    spacing={{ base: 1, md: 4 }}>
                    <Button size="lg" onClick={handleCreate} w="full">
                        Create new player
                    </Button>
                    <Spacer />
                    <Button size="lg" variant="action2" onClick={handleExist} w="full">
                        Add existion player
                    </Button>
                    <Spacer />
                    <Spacer />
                    <>
                        <Button size="lg" onClick={handleClick} variant="action2" w="full">
                            Upload CSV
                        </Button>
                        <input
                            type="file"
                            id="file"
                            ref={hiddenFileInput}
                            accept=".csv"
                            style={{ display: 'none' }}
                            onChange={handleChange}
                        />
                    </>
                </Stack>
                <SimpleGrid
                    // minChildWidth={{ base: '100%', md: '250px' }}
                    spacing={{ base: '14px', md: '40px' }}
                    columns={{ base: 1, md: 3 }}
                    mt={8}
                    mb={8}>
                    {isLoading ? (
                        <Center my="16">
                            <Spinner size="xl" />
                        </Center>
                    ) : currentTeam?.players?.length > 0 ? (
                        currentTeam?.players?.map((player: any) => (
                            <PlayerCard
                                key={player?.id}
                                position={player?.position}
                                image={player?.photo}
                                status="Pending Invite"
                                name={`${player.first_name} ${player.last_name}`}
                            />
                        ))
                    ) : (
                        <BlankTeam
                            image="/images/image/jersy.png"
                            title="Added players will appear here"
                        />
                    )}
                </SimpleGrid>
                <Center>
                    <VStack
                        mb={10}
                        w={{ base: '40%', md: '40%' }}
                        spacing={4}
                        mx={{ base: 8, md: 12 }}>
                        <Button
                            size="lg"
                            px={{ base: '80%', md: '50%' }}
                            disabled={!currentTeam?.players?.length}
                            onClick={() => router.push('/dashboard/club-management/add-staff')}>
                            Continue
                        </Button>
                    </VStack>
                </Center>

                <ExistingPlayer isOpen={existing} onClose={setExisting} setSelected={setSelected} />

                <NewPlayer isOpen={create} onClose={setCreate} />

                <Confirmation
                    jersyPng="/images/image/jersy.png"
                    isOpen={select}
                    onClose={setSelected}
                    playerName="Kareem Benzema"
                    title="Striker"
                />
            </Box>
        </>
    );
};

export default authenticatedRoute(AddTeam);
