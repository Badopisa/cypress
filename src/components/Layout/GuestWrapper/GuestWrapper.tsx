import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import Footer from '@/components/Layout/Footer/index';
import NavBar from '@/components/Layout/NavBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Stack justify="space-between" minH="100vh" spacing={0}>
            <NavBar />
            <Box as="main">{children}</Box>
            <Footer />
        </Stack>
    );
};

export default Layout;
