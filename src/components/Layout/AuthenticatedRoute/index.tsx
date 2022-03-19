import { useRouter } from 'next/router'
import React from 'react';
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react';
import SidebarContent from './SidebarContent';
import MobileNav from './MobileNav';

export const authenticatedRoute = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const AuthenticatedRoute = (props: P) => {
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure();

      return(
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
          <SidebarContent
            onClose={() => onClose}
            display={{ base: 'none', md: 'block' }}
          />
          <Drawer
            autoFocus={false}
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
            <Box ml={{ base: 0, md: 60 }} p="4">
              <WrappedComponent {...props} />
            </Box>
        </Box>
         
        )
  }
  return AuthenticatedRoute
}
