import React from 'react';
import {
    IconButton,
    Avatar,
    Box,
    Flex,
    HStack,
    VStack,
    useColorModeValue,
    Text,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Button
} from '@chakra-ui/react';

import { FiBell, FiChevronDown } from 'react-icons/fi';

import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { RootStateOrAny, useSelector } from 'react-redux';

const DashboardDesktopNav = ({ hasArrow = false, ...rest }: { hasArrow?: boolean }) => {
    const { user } = useSelector((state: RootStateOrAny) => state.auth);
    const router = useRouter();
    return (
        <Flex
            py={6}
            alignItems="center"
            bg="black"
            justifyContent={{ base: 'space-between' }}
            {...rest}>
            <Box>
                {!hasArrow ? (
                    <VStack color="white" align="start">
                        <Text>Hi {user?.first_name},</Text>
                        <Text>Welcome 👋</Text>
                    </VStack>
                ) : (
                    <Button
                        size="md"
                        bg="black"
                        color="white"
                        onClick={() => router.back()}
                        _hover={{ border: '1px solid #131313' }}
                        leftIcon={<FaArrowLeft color="white" size="20px" />}>
                        Back
                    </Button>
                )}
            </Box>

            <HStack spacing={{ base: '0', md: '6' }}>
                <IconButton
                    _hover={{ bg: 'black' }}
                    bg="black"
                    aria-label="open menu"
                    icon={<FiBell size="25" color="#818181" />}
                />
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                            <HStack>
                                <Avatar size={'sm'} src={user?.photo} />
                                <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2"
                                    color="white">
                                    <Text fontSize="sm">{`${user?.first_name} ${user?.last_name}`}</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        {user?.role}
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

export default DashboardDesktopNav;
