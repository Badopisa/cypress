import React from 'react';
import { Box, CloseButton, Flex, BoxProps, Divider } from '@chakra-ui/react';
import { LinkItems } from '@/data/LinkItem';
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
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" my={4} justifyContent="space-between">
                <Logo />
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            <Divider mb="5" color="divider" />
            <Box px={'30px'}>
                {LinkItems.map((link) => (
                    <DashboardNavItem link={link.link} key={link.name} icon={link.icon}>
                        {link.name}
                    </DashboardNavItem>
                ))}
            </Box>
        </Box>
    );
};

export default SidebarContent;
