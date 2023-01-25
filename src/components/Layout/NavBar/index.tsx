import React, { useState } from 'react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import Link from '@/components/Elements/Link/Link';
import Logo from '@/components/Elements/Logo/Logo';

export interface NavBarProps {
    login?: boolean;
}
const NavBar: React.FC<NavBarProps> = ({ login }) => {
    const [isHamburgerOpen] = useState<boolean>(false);
    return (
        <Box
            position="fixed"
            zIndex={1500}
            w="full"
            h={isHamburgerOpen ? '100%' : '20'}
            bgColor="white"
            color="black2"
            px={{ base: '20' }}
            py={{ base: 10 }}>
            <Flex mx="auto" align="center">
                <Box>
                    <Link href="/">
                        <Logo />
                    </Link>
                </Box>
                <Spacer />
                {login ? (
                    <Link href="/login">
                        <Text fontWeight="400">Login</Text>
                    </Link>
                ) : (
                    <Link href="/registation">
                        <Text fontWeight="400">Get Started</Text>
                    </Link>
                )}
            </Flex>
        </Box>
    );
};

export default NavBar;
