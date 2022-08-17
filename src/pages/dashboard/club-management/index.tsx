import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
import React, { useEffect, useState } from 'react';
import {
    Text,
    Box,
    SimpleGrid,
    VStack,
    Flex,
    Spacer,
    Center,
    Button,
    Tabs,
    Tab,
    TabList,
    InputGroup,
    InputLeftElement,
    Input,
    Spinner
} from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import { useRouter } from 'next/router';
import BlankTeam from '@/components/Team/BlankTeam';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { fetchTeams, filterTeam, getAllPlayers, setCurrentTeam } from '@/store/actions/teamActions';
import { TeamDataType } from '@/types/TeamDataType';
import TeamCard from '@/components/Team/TeamCard';
import { UserDataType } from '@/types/AuthDataType';
import { getAllStaffs } from '@/store/actions/staffActions';
import AllPlayers from './AllPlayers';
import AllStaffs from './AllStaffs';

const boxStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    textShadow: '0 0 120px black',
    px: 4,
    background: `url("/images/image/coach.jpg") center/cover no-repeat`
};

const TabSelectedStyle = {
    color: 'white',
    bg: 'primary',
    rounded: '5px'
};

// const socket = io('http://192.168.1.181:9000');
// const socket = io('ws://105.112.210.202:9000');
// const socket = io('http://105.112.210.202:9000');

const ClubManagement = () => {
    const {
        filteredData,
        teams,
        allPlayers,
        allStaffs
    }: {
        filteredData: TeamDataType[] | [];
        teams: TeamDataType[] | [];
        currentTeam: TeamDataType | null;
        allPlayers: any;
        allStaffs: any;
    } = useSelector((state: RootStateOrAny) => state.team);
    const { user }: { user: UserDataType } = useSelector((state: RootStateOrAny) => state.auth);
    const { isLoading } = useSelector((state: RootStateOrAny) => state.msg);
    const [searchText, setSearchText] = useState('');
    const [tab, setTab] = useState(1);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleCreateTeam = () => {
        router.push('/dashboard/club-management/create-team');
    };
    console.log('filteredData is', filteredData);

    // useEffect(() => socketInitializer(), []);
    //
    // const socketInitializer = async () => {
    //     console.log('socket connection started');
    //     await fetch('/api/socket');
    //     socket = io();
    //
    //     socket.on('connect', () => {
    //         console.log('connected');
    //     });
    //
    //     socket.on('message', (msg: any) => {
    //         console.log('message');
    //         console.log('backend message', msg);
    //     });
    //     console.log('socket connection ended');
    // };

    useEffect(() => {
        console.log('called');
        dispatch(getAllPlayers(user?.clubs[0]?.id));
        dispatch(getAllStaffs(user?.clubs[0]?.id));
    }, []);

    useEffect(() => {
        if (filteredData.length < 1) {
            console.log('No team', user?.clubs[0]?.id);
            console.log('Clubs are eam', user?.clubs);

            dispatch(fetchTeams(user?.clubs[0]?.id));
        }
    }, []);
    console.log('Clubs are eam', user);

    const handleTeamSearch = (e: React.FormEvent<HTMLInputElement>) => {
        const text = e.currentTarget.value;
        setSearchText(text);
        if (text.length < 1 || text.length > 2) {
            dispatch(filterTeam(text));
        }
    };
    const handleTeamSelect = (team: TeamDataType) => {
        dispatch(setCurrentTeam(team));
        router.push('/dashboard/club-management/TeamManagement');
    };

    return (
        <>
            <DashboardDesktopNav />
            <Box
                mt={8}
                w={{ base: '100%', md: '90%' }}
                h={{ base: 'auto', md: '270px' }}
                sx={boxStyles}
                borderRadius="15">
                <VStack>
                    <Text
                        fontSize={{ base: '3xl', md: '5xl' }}
                        fontWeight="bold"
                        w="80%"
                        pt={{ base: 8 }}>
                        Build your own Football Gaints
                    </Text>
                    <Text fontSize="md" pb={{ base: 8 }}>
                        Create your own football club and build your team{' '}
                    </Text>
                </VStack>
            </Box>

            <Box color="white" mt={6} w={{ base: '100%', md: '90%' }} p={{ base: '4px' }}>
                <Text fontSize="lg" fontWeight="semibold">
                    Club Management
                </Text>
                <Flex mb={12} direction={{ base: 'column-reverse', md: 'row' }}>
                    <Tabs
                        variant="unstyled"
                        mt={{ base: 8, md: 4 }}
                        alignContent="center"
                        w={{ base: '100%', md: '50%' }}>
                        <TabList
                            bg="dark"
                            color="white"
                            w={{ base: '100%', md: '371px' }}
                            rounded={5}
                            p={{ base: '0', md: '8px 16px' }}>
                            <Tab _selected={TabSelectedStyle} onClick={() => setTab(1)}>
                                Teams
                            </Tab>
                            <Spacer />
                            <Tab _selected={TabSelectedStyle} onClick={() => setTab(2)}>
                                All Players
                            </Tab>
                            <Spacer />
                            <Tab _selected={TabSelectedStyle} onClick={() => setTab(3)}>
                                Staff
                            </Tab>
                        </TabList>
                    </Tabs>

                    <Spacer />
                    <Flex direction="row" mt={6}>
                        <InputGroup w="279px">
                            <InputLeftElement pointerEvents="none">
                                <BsSearch color="grey" />
                            </InputLeftElement>
                            <Input
                                type="tel"
                                placeholder="Search for your team"
                                value={searchText}
                                onChange={handleTeamSearch}
                            />
                        </InputGroup>
                        <Button
                            bg="grey"
                            _hover={{ color: 'white' }}
                            color="white"
                            fontSize="sm"
                            ml="8px">
                            Search
                        </Button>
                    </Flex>
                </Flex>
                <Spacer />
                {tab === 1 && (
                    <>
                        <Flex direction="row">
                            <Button
                                w="116px"
                                fontSize="xs"
                                fontWeight="semibold"
                                variant="outline"
                                _hover={{
                                    bg: 'white',
                                    color: 'dark',
                                    fontWeight: 'bold'
                                }}
                                onClick={handleCreateTeam}>
                                CREATE A TEAM
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
                                {teams.length}/100
                            </Button>
                        </Flex>
                        <Box>
                            {!isLoading ? (
                                <Center my="16">
                                    <input
                                        type="file"
                                        accept={'all'}
                                        onChange={async (e: any) => {
                                            if (e.target.files.length > 0) {
                                                // Update UI to show file is uploading
                                                const file = e.target.files[0];
                                                const userId = 'user';

                                                console.log('file', file);
                                                // Create FormData and pass picked file with other necessary details
                                                const formData = new FormData();
                                                formData.append('file', file);
                                                formData.append('id', userId);
                                                try {
                                                    const uploadFileRes = await fetch(
                                                        '/api/digital-ocean/uploader',
                                                        {
                                                            method: 'POST',
                                                            body: formData
                                                        }
                                                    );
                                                    const uploadFileData =
                                                        await uploadFileRes.json();
                                                    // Retrieve url and show it to user?
                                                    // Update UI to show file has been uploaded
                                                    console.log('uploadFileData', uploadFileData);
                                                } catch (e) {
                                                    console.log('upload error', e);
                                                    // Update UI to show file upload failed
                                                }
                                            }
                                        }}
                                    />
                                    {/*<Spinner size="xl" />*/}
                                </Center>
                            ) : filteredData.length > 0 ? (
                                <SimpleGrid
                                    columns={{ base: 1, sm: 2, lg: 4 }}
                                    width="min(90%, 1200px)"
                                    spacing={{ base: '14px', md: '40px' }}
                                    mt={8}
                                    mb={8}>
                                    {filteredData.map((team: TeamDataType) => (
                                        <TeamCard
                                            image={team?.photo}
                                            noOfPlayers={team?.players?.length}
                                            noOfStaff={team?.staff?.length}
                                            key={team.id}
                                            name={team.name}
                                            click={() => handleTeamSelect(team)}
                                        />
                                    ))}
                                </SimpleGrid>
                            ) : (
                                <BlankTeam
                                    image="/images/image/jersy.png"
                                    title="No team created yet"
                                />
                            )}
                        </Box>
                    </>
                )}
                {tab === 2 && <AllPlayers allPlayers={allPlayers} isLoading={isLoading} />}
                {tab === 3 && <AllStaffs allStaffs={allStaffs?.data} isLoading={isLoading} />}
            </Box>
        </>
    );
};

export default authenticatedRoute(ClubManagement);
