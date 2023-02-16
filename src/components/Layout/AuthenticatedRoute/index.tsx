import React, { useEffect } from 'react';
import { Box, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import SidebarContent from './SidebarContent';
import MobileNav from './MobileNav';
import { retrieveAccessToken, retrieveAdminData } from '@/utils/locaStorageActions';
import { logout, saveAdminData } from '@/store/actions/authActions';
import { useDispatch } from 'react-redux';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';

export const authenticatedRoute = <P extends object>(WrappedComponent: any) => {
    return (props: P) => {
        const { isOpen, onOpen, onClose } = useDisclosure();
        const dispatch = useDispatch();

        useEffect(() => {
            const token = retrieveAccessToken();
            const user: any = retrieveAdminData();
            console.log('user: ', user);
            if (user) {
                dispatch(saveAdminData(user));
            }
            if (!token) {
                logout();
            }
        }, [dispatch]);

        return (
            <Box minH="100vh" bg="white" color={'black'}>
                <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
                <Drawer
                    isOpen={isOpen}
                    placement="left"
                    onClose={onClose}
                    returnFocusOnClose={false}
                    onOverlayClick={onClose}
                    size="full">
                    <DrawerContent>
                        <SidebarContent onClose={onClose} />
                    </DrawerContent>
                </Drawer>
                <MobileNav onOpen={onOpen} />
                <Box ml={{ base: 0, md: '250px' }} px={{ base: 4, md: '40px' }}>
                    <>
                        <DashboardDesktopNav hasArrow />
                        <Box h={'100px'} />
                        <WrappedComponent {...props} />
                    </>
                </Box>
            </Box>
        );
    };
};
