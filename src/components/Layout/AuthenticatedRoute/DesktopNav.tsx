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

import { useRouter } from 'next/router';
import { RootStateOrAny, useSelector } from 'react-redux';
import BackIcon from '@/assets/backIcon';

const DashboardDesktopNav = ({ hasArrow = false, ...rest }: { hasArrow?: boolean }) => {
    const { user } = useSelector((state: RootStateOrAny) => state.auth);
    const router = useRouter();
    return (
        <Flex
            pt={'60px'}
            pb={'16px'}
            alignItems="center"
            bg="white"
            top={0}
            zIndex={'9'}
            position="fixed"
            w={'calc(100vw - 340px)'}
            color={'black2'}
            justifyContent={{ base: 'space-between' }}
            {...rest}>
            <Box>
                {hasArrow && (
                    <Button
                        size="md"
                        bg="white"
                        color="black2"
                        onClick={() => router.back()}
                        _hover={{ border: '1px solid #131313' }}
                        leftIcon={<BackIcon />}>
                        Go back
                    </Button>
                )}
            </Box>

            <HStack spacing={{ base: '0', md: '6' }}>
                <IconButton
                    _hover={{ bg: 'white' }}
                    bg="white"
                    color="black2"
                    aria-label="open menu"
                    icon={<FiBell size="25" color="black2" />}
                />
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                            <HStack>
                                <Avatar name={user?.first_name} size={'sm'} src={user?.photo} />
                                <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2"
                                    color="black2">
                                    <Text fontSize="sm">{`${user?.first_name} ${user?.last_name}`}</Text>
                                    <Text fontSize="xs" color="grey4">
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
