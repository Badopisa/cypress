import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    HStack,
    Img,
    Input,
    InputGroup,
    InputLeftElement,
    Progress,
    SimpleGrid,
    Spacer,
    Spinner,
    Tab,
    Table,
    TabList,
    Tabs,
    Tbody,
    Td,
    Text,
    Tr,
    useDisclosure,
    useToast,
    VStack
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { TeamDataType } from '@/types/TeamDataType';
import TeamCard from '@/components/Team/TeamCard';
import BlankTeam from '@/components/Team/BlankTeam';
import AllPlayers from '@/pages/dashboard/club-management/AllPlayers';
import AllStaffs from '@/pages/dashboard/club-management/AllStaffs';
import NewPlayer from '@/components/Team/Modal/NewPlayer';
import NewStaff from '@/components/Team/Modal/NewStaff';
import React, { useEffect, useState } from 'react';
import { UserDataType } from '@/types/AuthDataType';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { getUserRole } from '@/utils/locaStorageActions';
import Video from '@/components/Analytics/Video';
import AllVideoAnalytics from '@/components/Analytics/AllVideoAnalytics';
import CompletedVideoAnalytics from '@/components/Analytics/CompletedAnalytics';
import { getAnalytics } from '@/store/actions/analyticsAction';
import IncompleteVideoAnalytics from '@/components/Analytics/IncompleteAnalytics';
import UploadVideoModal from '@/components/Analytics/UploadVideoModal';

const TabSelectedStyle = {
    color: 'purple',
    bg: '',
    fontWeight: '400',
    fontSize: '16px',
    borderBottom: '2px solid',
    borderBottomColor: 'purple'
};

const Analytics = () => {
    const { user }: { user: UserDataType } = useSelector((state: RootStateOrAny) => state.auth);
    const role = getUserRole();
    const { isLoading } = useSelector((state: RootStateOrAny) => state.msg);
    const [searchText, setSearchText] = useState('');
    const [createPlayer, setCreatePlayer] = useState<boolean>(false);
    const [createStaff, setCreateStaff] = useState<boolean>(false);
    const [tab, setTab] = useState(1);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const toast = useToast();

    useEffect(() => {
        const payload = {
            league: 4,
            season: 4
        };
        dispatch(getAnalytics(payload, toast));
    }, [dispatch, toast]);

    return (
        <>
            <DashboardDesktopNav />
            <Box color="black2" w={'100%'} p={{ base: '4px' }}>
                <Text fontSize={'40px'} fontWeight="700" color={'black2'}>
                    Video analytics
                </Text>
                <Flex alignItems={'center'} direction={{ base: 'column-reverse', md: 'row' }}>
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
                                All
                            </Tab>
                            <Spacer />
                            <Tab
                                _focus={{
                                    border: 'none'
                                }}
                                _selected={TabSelectedStyle}
                                onClick={() => setTab(2)}>
                                Complete
                            </Tab>
                            <Spacer />
                            <Tab
                                _focus={{
                                    border: 'none'
                                }}
                                _selected={TabSelectedStyle}
                                onClick={() => setTab(3)}>
                                Incomplete
                            </Tab>
                        </TabList>
                    </Tabs>

                    <Spacer />
                    <Button onClick={onOpen} size={'lg'}>
                        Upload a video
                    </Button>
                </Flex>
                <Box mb={'20px'} w={'100%'} borderColor={'grey6'} borderWidth={'1px'} h={'1px'} />
                <Spacer />
                {tab === 1 && <AllVideoAnalytics />}
                {tab === 2 && <CompletedVideoAnalytics />}
                {tab === 3 && <IncompleteVideoAnalytics />}
            </Box>
            <UploadVideoModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};
export default authenticatedRoute(Analytics);
