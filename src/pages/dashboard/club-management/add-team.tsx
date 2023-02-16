import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
import React, { useState } from 'react';
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
import { uploadFileAndCreateMultiplePlayers } from '@/store/actions/teamActions';

const AddTeam = () => {
    const { currentTeam }: { currentTeam: any } = useSelector(
        (state: RootStateOrAny) => state.team
    );
    const { msg, isLoading } = useSelector((state: RootStateOrAny) => state.msg);
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

    const handleChange = (event: any) => {
        const file = event.target.files[0];
        dispatch(
            uploadFileAndCreateMultiplePlayers(file, toast, currentTeam?.club_id, setExisting)
        );
    };

    const hiddenFileInput: any = React.useRef(null);

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    const router = useRouter();

    return (
        <>
            <DashboardDesktopNav hasArrow />
            <HStack mb={'40px'} color="black2" alignItems={'baseline'}>
                <Text mr={'20px'} fontSize="40px" fontWeight="700">
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
            <Box px={{ base: 8, md: 8 }} color="white">
                <Box mx={'auto'} maxW={'320px'} mb={'20px'}>
                    <Steps current={2} />
                </Box>
                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    mx={'auto'}
                    py={{ base: 8, md: 8 }}
                    w="640px"
                    spacing={{ base: 1, md: '20px' }}>
                    <Button
                        fontSize={'16px'}
                        fontWeight={'400'}
                        size={'lg'}
                        onClick={handleCreate}
                        w="full">
                        Create new player
                    </Button>
                    <Spacer />
                    <Button
                        fontSize={'16px'}
                        fontWeight={'400'}
                        size="lg"
                        variant="action2"
                        onClick={handleExist}
                        w="full">
                        Add existing player
                    </Button>
                    <Spacer />
                    <Spacer />
                    <>
                        <Button
                            fontSize={'16px'}
                            fontWeight={'400'}
                            disabled
                            size="lg"
                            onClick={handleClick}
                            variant="action2"
                            w="full">
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
                {isLoading ? (
                    <Center h={'340px'} w={'100%'}>
                        <Spinner size="xl" />
                        <Text ml={4} fontSize={'20px'}>
                            {msg}
                        </Text>
                    </Center>
                ) : (
                    <SimpleGrid
                        // minChildWidth={{ base: '100%', md: '250px' }}
                        columns={{ base: 1, sm: 2, lg: 6 }}
                        // width="min(90%, 1200px)"
                        spacingX={{ base: '14px', md: '10px' }}
                        spacingY={{ base: '14px', md: '20px' }}
                        mt={8}
                        mb={8}>
                        {currentTeam?.players?.length > 0 ? (
                            currentTeam?.players?.map((player: any) => (
                                <PlayerCard
                                    key={player?.id}
                                    id={player?.id}
                                    hasMenu
                                    player={player}
                                    teamId={currentTeam?.id}
                                    clubId={currentTeam?.club_id}
                                    position={player?.position}
                                    number={player?.jersey_number}
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
                )}
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
