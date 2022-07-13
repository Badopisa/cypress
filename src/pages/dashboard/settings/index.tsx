import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import { Tabs, TabList, Tab, Spacer, Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import Language from './Language';
import Notifications from './Notifications';
import PersonalInformation from './PersonalInformation';
import Security from './Security';

const TabSelectedStyle = {
    color: 'white',
    bg: 'primary',
    rounded: '5px'
};

const Settings = () => {
    const [tab, setTab] = useState<number>(1);

    return (
        <Box>
            <DashboardDesktopNav />
            <Tabs
                variant="unstyled"
                my={{ base: 8, md: 4 }}
                alignContent="center"
                w={{ base: '100%', md: '90%', lg: '80%' }}>
                <TabList
                    bg="dark"
                    color="white"
                    w={{ base: '100%', md: '100%' }}
                    rounded={5}
                    p={{ base: '0', md: '8px 16px' }}>
                    <Tab _selected={TabSelectedStyle} onClick={() => setTab(1)}>
                        Peronal Information
                    </Tab>
                    <Spacer />
                    <Tab _selected={TabSelectedStyle} onClick={() => setTab(2)}>
                        Language
                    </Tab>
                    <Spacer />
                    <Tab _selected={TabSelectedStyle} onClick={() => setTab(3)}>
                        Notifications
                    </Tab>
                    <Spacer />
                    <Tab _selected={TabSelectedStyle} onClick={() => setTab(4)}>
                        Security
                    </Tab>
                    <Spacer />
                    <Tab _selected={TabSelectedStyle} onClick={() => setTab(5)}>
                        Help
                    </Tab>
                </TabList>
            </Tabs>
            {tab === 1 && <PersonalInformation />}
            {tab === 2 && <Language />}

            {tab === 3 && <Notifications />}
            {tab === 4 && <Security />}
        </Box>
    );
};

export default authenticatedRoute(Settings);
