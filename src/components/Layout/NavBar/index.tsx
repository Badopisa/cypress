import React, { useEffect, useState } from 'react';
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import Link from '@/components/Elements/Link/Link';
import Logo from '@/components/Elements/Logo/Logo';
import { retrieveAccessToken } from '@/utils/locaStorageActions';
import { useRouter } from 'next/router';

export interface NavBarProps {
    login?: boolean;
}
const NavBar: React.FC<NavBarProps> = ({ login }) => {
    const [isHamburgerOpen] = useState<boolean>(false);
    const router = useRouter();
    useEffect(() => {
        const token = retrieveAccessToken();
        if (token) {
            router.push('/dashboard');
        }
    }, []);
    return (
        <Box
            position="sticky"
            top={0}
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
                    <Link href="/registration">
                        <Text color="primary" fontWeight="400">
                            Get Started
                        </Text>
                    </Link>
                )}
            </Flex>
        </Box>
    );
};

export default NavBar;
