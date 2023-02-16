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
    HStack
} from '@chakra-ui/react';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import { useRouter } from 'next/router';
import Steps from '@/components/Team/Steps';
import BlankTeam from '@/components/Team/BlankTeam';
import Confirmation from '@/components/Team/Modal/Confirmation';
import PlayerCard from '@/components/Team/PlayerCard';
import NewStaff from '@/components/Team/Modal/NewStaff';
import { RootStateOrAny, useSelector } from 'react-redux';
import ExistingStaff from '@/components/Team/Modal/ExistingStaff';
import Swal from 'sweetalert2';

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
            <HStack mb={'40px'} color="black2" alignItems={'baseline'}>
                <Text mr={'20px'} fontSize="40px" fontWeight="700">
                    Add staff
                </Text>
                <Text onClick={() => setFinish(true)} cursor={'pointer'} as={'u'} color="green">
                    Skip this step
                </Text>
            </HStack>
            <Box px={{ base: 8, md: 8 }} color="white">
                <Box mx={'auto'} maxW={'320px'} mb={'38px'}>
                    <Steps current={3} />
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
                        size="lg"
                        onClick={handleCreate}
                        w="full">
                        Create new staff
                    </Button>
                    <Spacer />
                    <Button
                        fontSize={'16px'}
                        fontWeight={'400'}
                        size="lg"
                        variant="action2"
                        onClick={handleExist}
                        w="full">
                        Add existing staff
                    </Button>
                    <Spacer />
                    <Spacer />
                    <>
                        <Button
                            fontSize={'16px'}
                            fontWeight={'400'}
                            disabled
                            size="lg"
                            variant="action2"
                            w="full">
                            Upload CSV
                        </Button>
                        <input
                            type="file"
                            id="file"
                            // ref={hiddenFileInput}
                            accept=".csv"
                            style={{ display: 'none' }}
                            // onChange={handleChange}
                        />
                    </>
                </Stack>

                {currentTeam?.staff?.length > 0 ? (
                    <SimpleGrid
                        // minChildWidth={{ base: '100%', md: '166px' }}
                        columns={{ base: 1, sm: 2, lg: 6 }}
                        // width="min(90%, 1200px)"
                        spacingX={{ base: '14px', md: '10px' }}
                        spacingY={{ base: '14px', md: '20px' }}
                        mt={8}
                        mb={8}>
                        {currentTeam?.staff?.map((staff: any) => (
                            <PlayerCard
                                key={staff?.user_id}
                                position={staff?.role}
                                image={staff?.user?.photo}
                                status="Pending Invite"
                                hasMenu
                                player={staff}
                                name={`${staff?.user?.first_name} ${staff?.user?.last_name}`}
                                team={staff?.team}
                            />
                        ))}
                    </SimpleGrid>
                ) : (
                    <BlankTeam image="/images/image/jersy.png" title="No Staffs created yet" />
                )}

                <Center>
                    <VStack
                        mb={10}
                        w={{ base: '40%', md: '40%' }}
                        spacing={4}
                        mx={{ base: 8, md: 12 }}>
                        <Button size="lg" px={{ base: '80%', md: '50%' }} onClick={handleFinish}>
                            Finish team creation
                        </Button>
                    </VStack>
                </Center>

                <ExistingStaff isOpen={existing} onClose={setExisting} setSelected={setSelected} />

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
                    playerName="Team created!"
                    body="Sonalysis will notify those that you have newly invited via email"
                    buttonTitle="Go to team list"
                />
            </Box>
        </>
    );
};

export default authenticatedRoute(AddStaff);
