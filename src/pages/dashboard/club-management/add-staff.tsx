import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
import React, { useState } from 'react';
import { Text, Box, Spacer, VStack, Stack, Center, Button, SimpleGrid } from '@chakra-ui/react';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import { useRouter } from 'next/router';
import Steps from '@/components/Team/Steps';
import BlankTeam from '@/components/Team/BlankTeam';
import Confirmation from '@/components/Team/Modal/Confirmation';
import PlayerCard from '@/components/Team/PlayerCard';
import NewStaff from '@/components/Team/Modal/NewStaff';
import { RootStateOrAny, useSelector } from 'react-redux';
import ExistingStaff from '@/components/Team/Modal/ExistingStaff';

const AddStaff = () => {
    const { currentTeam }: { currentTeam: any } = useSelector(
        (state: RootStateOrAny) => state.team
    );
    const [create, setCreate] = useState<boolean>(false);
    const [existing, setExisting] = useState<boolean>(false);
    const [select, setSelected] = useState<boolean>(false);
    const [finish, setFinish] = useState<boolean>(false);
    const router = useRouter();
    const handleCreate = () => {
        setCreate(true);
    };
    const handleExist = () => {
        setExisting(true);
    };
    const handleFinish = () => {
        setFinish(true);
    };
    const continueToTeamList = () => {
        router.push('/dashboard/club-management');
        setFinish(false);
    };

    return (
        <>
            <DashboardDesktopNav hasArrow />
            <Box color="white" py={{ base: 8, md: 8 }} px={{ base: 4, md: 8 }}>
                <Text fontSize="3xl" fontWeight="medium">
                    Create Team
                </Text>
                <Steps current={3} />
            </Box>
            <Box px={{ base: 8, md: 8 }} color="white">
                <Text fontSize="md" fontWeight="medium">
                    Create or add existing Staffs
                </Text>
                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    py={{ base: 8, md: 8 }}
                    w="80%"
                    spacing={{ base: 1, md: 4 }}>
                    <Button fontSize="xs" variant="action" onClick={handleCreate} w="full">
                        ADD A STAFF
                    </Button>
                    <Spacer />
                    <Button fontSize="xs" variant="outline" onClick={handleExist} w="full">
                        ADD EXISTING STAFF
                    </Button>
                    <Spacer />
                    <Button px={6} bg="grey" color="white" fontSize="xs" ml="8" w="83">
                        {currentTeam?.staff?.length}/5
                    </Button>
                </Stack>

                {currentTeam?.staff?.length > 0 ? (
                    <SimpleGrid
                        // minChildWidth={{ base: '100%', md: '166px' }}
                        columns={{ base: 1, sm: 2, lg: 4 }}
                        width="min(90%, 1200px)"
                        spacing={{ base: '14px', md: '40px' }}
                        mt={8}
                        mb={8}>
                        {currentTeam?.staff?.map((staff: any) => (
                            <PlayerCard
                                key={staff?.user_id}
                                position={staff?.position}
                                image={staff?.user?.photo}
                                status="Pending Invite"
                                name={`${staff?.user?.first_name} ${staff?.user?.last_name}`}
                                team={staff?.team}
                            />
                        ))}
                    </SimpleGrid>
                ) : (
                    <BlankTeam image="/images/image/jersy.png" title="No Players created yet" />
                )}

                <Center>
                    <VStack
                        mb={10}
                        w={{ base: '40%', md: '40%' }}
                        spacing={4}
                        mx={{ base: 8, md: 12 }}>
                        <Button
                            fontSize="sm"
                            variant="action"
                            px={{ base: '80%', md: '50%' }}
                            onClick={handleFinish}>
                            Finish Team Creation
                        </Button>
                        <Text fontSize="sm" onClick={() => router.back()} cursor="pointer">
                            PREVIOUS STEP
                        </Text>
                    </VStack>
                </Center>

                <ExistingStaff
                    title="Add Existing Staff"
                    buttonTitle="Add Staff"
                    isOpen={existing}
                    onClose={setExisting}
                    setSelected={setSelected}
                />

                <NewStaff isOpen={create} onClose={setCreate} />

                <Confirmation
                    jersyPng="/images/image/jersy.png"
                    isOpen={select}
                    onClose={setSelected}
                    playerName="Kareem Benzema"
                    title="Striker"
                />

                <Confirmation
                    jersyPng="/images/image/confirmation.png"
                    isOpen={finish}
                    onClose={continueToTeamList}
                    playerName="Team Created!"
                    body="Sonalysis will notify those that you have newly invited via email"
                    buttonTitle="GO TO TEAM LIST"
                />
            </Box>
        </>
    );
};

export default authenticatedRoute(AddStaff);
