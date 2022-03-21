import React, { ReactNode } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import {
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';

const DashboardDesktopNav = ({  ...rest }) => {
    return (
        <Flex
        py={6}
        alignItems="center"
        bg="black"
        justifyContent={{ base: 'space-between' }}
        {...rest}>
        <Box>
          <VStack color="white" align="start">
            <Text>
                Hi Jim,
            </Text>
            <Text>
                Welcome 👋
            </Text>
          </VStack>
        </Box>

        <HStack spacing={{ base: '0', md: '6' }}>
          <IconButton
            _hover={{bg:"black"}}
            bg="black"
            aria-label="open menu"
            icon={<FiBell size="25" color="#818181"/>}
          />
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar
                    size={'sm'}
                    src={
                      'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                    color="white"
                  >
                    <Text fontSize="sm">Drebakare</Text>
                    <Text fontSize="xs" color="gray.600">
                      Club Admin
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuDivider />
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>        
      </Flex>
    );
  };

  export default DashboardDesktopNav