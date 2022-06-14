import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Img,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

export interface CardProps {
  number?: number;
  desc?: string;
  image?: string;
  charts?: any;
}

const DashboardTopNav = () => {
  return (
    <Flex>
      <Box>
        <VStack>
          <Text>Hi Jim,</Text>
          <Flex>
            Welcome{' '}
            <Image src='/images/logos/waving-hand.svg' alt='user avatar' />
          </Flex>
        </VStack>
      </Box>
      <Spacer />
      <HStack>
        <Image src='/images/logos/notification.svg' alt='notification bell' />
        <Avatar src='/images/imgs/avatar.svg' />
        <VStack>
          <Text>Jim Halpert</Text>
          <Text>Club Admin</Text>
        </VStack>
      </HStack>
    </Flex>
  );
};

export default DashboardTopNav;
