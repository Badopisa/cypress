import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import SideBar from '@/components/SideBar';
import DashboardTopNav from '@/components/Layout/Dashboard';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex color='white'>
      <SideBar />
      <Box bg='ash'>
        <DashboardTopNav />
        {children}
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
