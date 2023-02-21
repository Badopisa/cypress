import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import PlayerCard from '@/components/Team/PlayerCard';
import {
    Avatar,
    Box,
    Button,
    Flex,
    HStack,
    Img,
    Input,
    InputGroup,
    InputLeftElement,
    SimpleGrid,
    Spacer,
    Tab,
    TabList,
    Tabs,
    Tag,
    Text,
    useToast,
    VStack,
    Wrap
} from '@chakra-ui/react';
import React, { useState } from 'react';
import EditPlayerModal from '@/components/Team/Modal/EditPlayerModal';
import NewPlayer from '@/components/Team/Modal/NewPlayer';
import EditStaffModal from '@/components/Team/Modal/EditStaffModal';
import EditTeamInfo from '@/components/Team/Modal/EditTeamInfo';
import NewStaff from '@/components/Team/Modal/NewStaff';
import ExistingPlayer from '@/components/Team/Modal/ExistingPlayer';
import ExistingStaff from '@/components/Team/Modal/ExistingStaff';
import GlobalErrorModal from '@/components/Team/Modal/GlobalErrorModal';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { getPlayerDetails, saveNewPlayerData } from '@/store/actions/playerActions';
import { saveNewStaffData } from '@/store/actions/staffActions';
import { useRouter } from 'next/router';

const TeamManagement = () => {
    const { currentTeam }: { currentTeam: any } = useSelector(
        (state: RootStateOrAny) => state.team
    );
    const [tab, setTab] = useState<number>(1);
    const [createStaff, setCreateStaff] = useState<boolean>(false);
    const [createPlayer, setCreatePlayer] = useState<boolean>(false);
    const [createExistingPlayer, setCreateExistingPlayer] = useState<boolean>(false);
    const [createExistingStaff, setCreateExistingStaff] = useState<boolean>(false);

    const [openStaff, setOpenStaff] = useState<boolean>(false);
    const [openStaffModal, setOpenStaffModal] = useState<boolean>(false);
    const [openPlayer, setOpenPlayer] = useState<boolean>(false);
    const [openPlayerModal, setOpenPlayerModal] = useState<boolean>(false);
    const [globalError, setGlobalError] = useState<boolean>(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const toast = useToast();

    const [openTeam, setOpenTeam] = useState<boolean>(false);

    // const handleCreate = () => {
    //     setCreate(true);
    // };

    const handleEditTeam = () => {
        setOpenTeam(true);
    };
    const handleStaffModal1 = (staff: any) => {
        dispatch(saveNewStaffData(staff));
        setOpenStaffModal(true);
    };
    const handleStaffModal = () => {
        setOpenStaff(true);
    };
    const handlePlayerModal1 = (player: any) => {
        // dispatch(saveNewPlayerData(player));
        dispatch(getPlayerDetails(player?.id, router, toast));
    };
    const handlePlayerModal = () => {
        setOpenPlayer(true);
    };

    const TabSelectedStyle = {
        color: 'purple',
        bg: '',
        fontWeight: '400',
        fontSize: '16px',
        borderBottom: '2px solid',
        borderBottomColor: 'purple'
    };
    return (
        <>
            <Box h={'100%'} overflowY={'auto'}>
                <Text fontSize={'40px'} fontWeight="700">
                    Club management
                </Text>
                <Flex
                    justify="space-between"
                    w={'100%'}
                    my={8}
                    alignItems={'center'}
                    direction={{ base: 'column', md: 'row' }}>
                    {/*<HStack w={'100%'} alignItems={'center'}>*/}
                    <HStack>
                        <Avatar
                            name={currentTeam?.team_name}
                            boxSize={{ base: '5rem', md: '7.5rem' }}
                            mr={'20px'}
                            src={currentTeam?.photo}
                        />
                        <Text fontSize={'16px'} fontWeight="400" color={'black2'}>
                            {currentTeam?.team_name}
                        </Text>
                    </HStack>
                    <HStack>
                        <VStack mr={'40px'}>
                            <Text fontSize={'14px'} color={'grey3'}>
                                Players
                            </Text>
                            <Text color={'black2'} fontSize={'20px'} fontWeight={'400'}>
                                {currentTeam?.players?.length}
                            </Text>
                        </VStack>
                        <VStack>
                            <Text fontSize={'14px'} color={'grey3'}>
                                Staff
                            </Text>
                            <Text color={'black2'} fontSize={'20px'} fontWeight={'400'}>
                                {currentTeam?.staff?.length}
                            </Text>
                        </VStack>
                    </HStack>
                    <HStack>
                        <Button
                            onClick={handleEditTeam}
                            size={'lg'}
                            mr={'40px'}
                            w={'200px'}
                            fontSize={'16px'}>
                            Edit team info
                        </Button>
                        <Button
                            onClick={handleEditTeam}
                            size={'lg'}
                            color={'red'}
                            w={'200px'}
                            fontSize={'16px'}
                            variant={'text'}>
                            Delete team
                        </Button>
                    </HStack>
                    {/*</HStack>*/}

                    {/*<Wrap w={'45%'} alignSelf={{ base: 'self-start', md: 'self-end' }}>*/}
                    {/*    <Tag fontSize={'sm'} p={1} color="white" bg="dark">*/}
                    {/*        {currentTeam?.players?.length} Players*/}
                    {/*    </Tag>*/}
                    {/*    <Tag fontSize={'sm'} p={1} color="white" bg="dark">*/}
                    {/*        {currentTeam?.staff?.length} Backroom Staffs*/}
                    {/*    </Tag>*/}
                    {/*    <Tag p={1} color="white" bg="dark">*/}
                    {/*        United Kingdom*/}
                    {/*    </Tag>*/}
                    {/*    <Tag fontSize={'sm'} p={1} color="white" bg="dark">*/}
                    {/*        1920-2022*/}
                    {/*    </Tag>*/}
                    {/*</Wrap>*/}
                </Flex>

                <Tabs
                    mt={{ base: 8, md: 4 }}
                    // borderBottomColor={'grey6'}
                    alignContent="center"
                    w={{ base: '100%', md: '50%' }}>
                    <TabList w={{ base: '100%', md: '371px' }} p={{ base: '0', md: '0 16px' }}>
                        <Tab
                            _focus={{
                                border: 'none'
                            }}
                            _selected={TabSelectedStyle}
                            onClick={() => setTab(1)}>
                            Players
                        </Tab>
                        <Box w={'60px'} />
                        <Tab
                            _focus={{
                                border: 'none'
                            }}
                            _selected={TabSelectedStyle}
                            onClick={() => setTab(2)}>
                            Staff
                        </Tab>
                    </TabList>
                </Tabs>
                <Box mb={'20px'} w={'100%'} borderColor={'grey6'} borderWidth={'1px'} h={'1px'} />
                <Spacer />
                {/*<Button onClick={() => setGlobalError(true)}>Error</Button>*/}
                {/*<Input*/}
                {/*    id='search'*/}
                {/*    name='search'*/}
                {/*    type='text'*/}
                {/*    placeholder='Search for team'*/}
                {/*    bg={'ash'}*/}
                {/*    w={'50%'}*/}
                {/*    mb={'6'}*/}
                {/*/>*/}
                {tab === 1 && (
                    <>
                        <HStack w={'100%'} justifyContent="space-between">
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
                            <Button
                                w="200px"
                                fontSize="16px"
                                fontWeight="400"
                                color={'black2'}
                                size={'lg'}
                                py={'13px'}
                                bg={'lightWhite'}
                                onClick={handlePlayerModal}>
                                Add new player
                            </Button>
                        </HStack>
                        <SimpleGrid
                            columns={{ base: 1, sm: 2, lg: 6 }}
                            // width="min(90%, 1200px)"
                            spacingX={{ base: '14px', md: '10px' }}
                            spacingY={{ base: '14px', md: '20px' }}
                            mt={8}
                            mb={8}>
                            {currentTeam?.players?.map((player: any) => (
                                <PlayerCard
                                    image={player?.photo}
                                    key={player.id}
                                    number={player.jersey_number}
                                    name={`${player?.first_name} ${player?.last_name}`}
                                    position={player?.position}
                                    team={player?.team_name}
                                    click={() => handlePlayerModal1(player)}
                                />
                            ))}
                        </SimpleGrid>
                    </>
                )}
                {tab === 2 && (
                    <>
                        <HStack w={'100%'} justifyContent="space-between">
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
                                    placeholder="Search staff"
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
                            <Button
                                w="200px"
                                fontSize="16px"
                                fontWeight="400"
                                color={'black2'}
                                size={'lg'}
                                py={'13px'}
                                bg={'lightWhite'}
                                onClick={handleStaffModal}>
                                Add new staff
                            </Button>
                        </HStack>
                        <SimpleGrid
                            columns={{ base: 1, sm: 2, lg: 6 }}
                            // width="min(90%, 1200px)"
                            spacingX={{ base: '14px', md: '10px' }}
                            spacingY={{ base: '14px', md: '20px' }}
                            mt={8}
                            mb={8}>
                            {currentTeam?.staff?.map((staff: any) => (
                                <PlayerCard
                                    image={staff?.user?.photo}
                                    key={staff?.id}
                                    name={`${staff?.user?.first_name} ${staff?.user?.last_name}`}
                                    position={staff?.role}
                                    team={staff?.user?.team}
                                    click={() => handleStaffModal1(staff)}
                                />
                            ))}
                        </SimpleGrid>
                    </>
                )}
                <NewPlayer isOpen={createPlayer} onClose={setCreatePlayer} />
                <NewStaff isOpen={createStaff} onClose={setCreateStaff} />
                <EditTeamInfo isOpen={openTeam} onClose={setOpenTeam} />
                <EditPlayerModal
                    isOpen={openPlayerModal}
                    onClose={setOpenPlayerModal}
                    edit="Edit Player"
                    // share="Share Player"
                    remove="Remove Player"
                />
                <EditPlayerModal
                    isOpen={openPlayer}
                    onClose={setOpenPlayer}
                    create="Create new player"
                    newPlayerButton
                    existing="Add existing player"
                    setCreatePlayer={setCreatePlayer}
                    setCreateExistingPlayer={setCreateExistingPlayer}
                />
                <EditStaffModal
                    isOpen={openStaffModal}
                    onClose={setOpenStaffModal}
                    edit="Edit staff"
                    // share="Share Staff"
                    remove="Remove staff"
                />
                <EditStaffModal
                    isOpen={openStaff}
                    onClose={setOpenStaff}
                    create="Create new staff"
                    newStaffButton
                    existing="Add existing staff"
                    setCreateStaff={setCreateStaff}
                    setCreateExistingStaff={setCreateExistingStaff}
                />
                <ExistingPlayer isOpen={createExistingPlayer} onClose={setCreateExistingPlayer} />
                <ExistingStaff isOpen={createExistingStaff} onClose={setCreateExistingStaff} />
                <GlobalErrorModal
                    isOpen={globalError}
                    onClose={setGlobalError}
                    globalError={false}
                />
            </Box>
        </>
    );
};

export default authenticatedRoute(TeamManagement);
