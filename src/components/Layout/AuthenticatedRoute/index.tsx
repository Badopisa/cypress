import React, { useEffect } from 'react';
import { Box, Drawer, DrawerContent, useDisclosure, useToast } from '@chakra-ui/react';
import SidebarContent from './SidebarContent';
import MobileNav from './MobileNav';
import { retrieveAccessToken } from '@/utils/locaStorageActions';
import { adminLogin, logout } from '@/store/actions/authActions';
import { useRouter } from 'next/router';
import { ClubAdminLogin } from '@/services/clubAdminService';

export const authenticatedRoute = <P extends object>(WrappedComponent: any) => {
    return (props: P) => {
        const { isOpen, onOpen, onClose } = useDisclosure();

        useEffect(() => {
            const token = retrieveAccessToken();
            if (!token) {
                logout();
            }
        }, []);

        return (
            <Box minH="100vh" bg="black">
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
                <Box ml={{ base: 0, md: 60 }} px={{ base: 4, md: 20 }}>
                    <WrappedComponent {...props} />
                </Box>
            </Box>
        );
    };
};
function useDispatch() {
    throw new Error('Function not implemented.');
}
