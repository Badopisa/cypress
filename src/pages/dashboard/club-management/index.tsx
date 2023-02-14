import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
import React, { useEffect, useState } from 'react';
import {
    Text,
    Box,
    SimpleGrid,
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
import { getUserRole } from '@/utils/locaStorageActions';
import NewPlayer from '@/components/Team/Modal/NewPlayer';
import NewStaff from '@/components/Team/Modal/NewStaff';

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
    color: 'purple',
    bg: '',
    fontWeight: '400',
    fontSize: '16px',
    borderBottom: '2px solid',
    borderBottomColor: 'purple'
};

// const socket = io('http://192.168.1.181:9000');
// const socket = io('ws://105.112.210.202:9000');
// const socket = io('http://105.112.210.202:9000');

const ClubManagement = () => {
    const role = getUserRole();
    console.log('rrole', role);
    // const r = 'player';

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
    const [createPlayer, setCreatePlayer] = useState<boolean>(false);
    const [createStaff, setCreateStaff] = useState<boolean>(false);
    const [tab, setTab] = useState(1);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleCreateTeam = () => {
        router.push('/dashboard/club-management/create-team');
    };
    console.log('filteredData is', filteredData);
    console.log('teams');

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
    }, [dispatch, filteredData.length, user?.clubs]);
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
    const createButton = () => {
        if (tab === 1) return <Button onClick={handleCreateTeam}>Create new team</Button>;
        if (tab === 2) return <Button onClick={() => setCreatePlayer(true)}>Add new player</Button>;
        if (tab === 3) return <Button onClick={() => setCreateStaff(true)}>Add new staff</Button>;
    };

    return (
        <>
            <DashboardDesktopNav hasArrow />
            <Box color="black2" mt={6} w={{ base: '100%', md: '90%' }} p={{ base: '4px' }}>
                <Text fontSize={'40px'} fontWeight="semibold">
                    Club Management
                </Text>
                <Flex alignItems={'center'} direction={{ base: 'column-reverse', md: 'row' }}>
                    <Tabs
                        mt={{ base: 8, md: 4 }}
                        // borderBottomColor={'grey6'}
                        alignContent="center"
                        w={{ base: '100%', md: '50%' }}>
                        <TabList
                            w={{ base: '100%', md: '371px' }}
                            p={{ base: '0', md: '8px 16px' }}>
                            <Tab _selected={TabSelectedStyle} onClick={() => setTab(1)}>
                                Teams
                            </Tab>
                            <Spacer />
                            <Tab _selected={TabSelectedStyle} onClick={() => setTab(2)}>
                                Players
                            </Tab>
                            <Spacer />
                            {role !== 'staff' && (
                                <Tab _selected={TabSelectedStyle} onClick={() => setTab(3)}>
                                    Staff
                                </Tab>
                            )}
                        </TabList>
                    </Tabs>

                    <Spacer />
                    {createButton()}
                </Flex>
                <Box mb={12} w={'100%'} borderColor={'grey6'} borderWidth={'1px'} h={'1px'} />
                <Spacer />
                {tab === 1 && (
                    <>
                        <Box>
                            {isLoading ? (
                                <Center my="16">
                                    <Spinner size="xl" />
                                </Center>
                            ) : filteredData.length > 0 ? (
                                <>
                                    <Flex direction="row" mt={6}>
                                        <InputGroup w="279px">
                                            <InputLeftElement pointerEvents="none">
                                                <BsSearch color="grey" />
                                            </InputLeftElement>
                                            <Input
                                                type="text"
                                                placeholder="Search for your team"
                                                value={searchText}
                                                onChange={handleTeamSearch}
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
                                    </Flex>
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
                                                name={team.team_name}
                                                click={() => handleTeamSelect(team)}
                                            />
                                        ))}
                                    </SimpleGrid>
                                </>
                            ) : (
                                <BlankTeam
                                    image="/images/image/jersy.png"
                                    title="Added teams will appear here"
                                />
                            )}
                        </Box>
                    </>
                )}
                {tab === 2 && (
                    <AllPlayers
                        allPlayers={allPlayers}
                        setCreate={setCreatePlayer}
                        isLoading={isLoading}
                    />
                )}
                {tab === 3 && (
                    <AllStaffs
                        allStaffs={allStaffs?.data}
                        setCreateStaff={setCreateStaff}
                        isLoading={isLoading}
                    />
                )}
            </Box>
            <NewPlayer isOpen={createPlayer} onClose={setCreatePlayer} />
            <NewStaff isOpen={createStaff} onClose={setCreateStaff} useCurrentTeamID={false} />
        </>
    );
};

export default authenticatedRoute(ClubManagement);
