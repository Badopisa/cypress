import React from 'react';
import { Box, CloseButton, Flex, BoxProps, Divider } from '@chakra-ui/react';
import { LinkItems1, LinkItems2 } from '@/data/LinkItem';
import DashboardNavItem from './NavItem';
import Logo from '@/components/Elements/Logo/Logo';

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
        <Box
            transition="3s ease"
            bg="lightWhite"
            w={{ base: 'full', md: '250px' }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex
                h="20"
                alignItems="center"
                mx="8"
                mt={'40px'}
                mb={4}
                justifyContent="space-between">
                <Logo />
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            <Divider mb="5" color="divider" />
            <Box px={'30px'}>
                {LinkItems1.map((link) => (
                    <DashboardNavItem link={link.link} key={link.name} icon={link.icon}>
                        {link.name}
                    </DashboardNavItem>
                ))}
                <Box h={'81px'} />
                {LinkItems2.map((link) => (
                    <DashboardNavItem link={link.link} key={link.name} icon={link.icon}>
                        {link.name}
                    </DashboardNavItem>
                ))}
            </Box>
        </Box>
    );
};

export default SidebarContent;
