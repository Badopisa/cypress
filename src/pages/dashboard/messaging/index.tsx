import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import { chatData } from '@/data/AnalyticsData';
import { SearchIcon } from '@chakra-ui/icons';
import {
    Tabs,
    TabList,
    Tab,
    Spacer,
    SimpleGrid,
    Avatar,
    Box,
    Divider,
    Flex,
    HStack,
    Stack,
    VStack,
    Text,
    Img,
    AvatarBadge,
    Input,
    FormControl,
    useDisclosure
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Calls from './calls';
import CreateChatModal from './CreateChatModal';
import GroupChats from './groupChats';

const TabSelectedStyle = {
    color: 'white',
    bg: 'primary',
    rounded: '5px'
};

const Messaging = () => {
    const [tab, setTab] = useState<number>(1);
    const [_searchQuery, setSearchQuery] = useState<string>('');
    const [toggle, setToggle] = useState<boolean>(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const checkInput = (e: any) => {
        if (e.target.value === '') {
            setToggle(false);
        } else {
            setToggle(true);
        }
    };

    return (
        <Box>
            <DashboardDesktopNav />
            <Tabs
                variant="unstyled"
                my={{ base: 8, md: 4 }}
                alignContent="center"
                w={{ base: '100%', md: '50%' }}>
                <TabList
                    bg="dark"
                    color="white"
                    w={{ base: '100%', md: '100%' }}
                    rounded={5}
                    p={{ base: '0', md: '8px 16px' }}>
                    <Tab _selected={TabSelectedStyle} onClick={() => setTab(1)}>
                        Chats
                    </Tab>
                    <Spacer />
                    <Tab _selected={TabSelectedStyle} onClick={() => setTab(2)}>
                        Groups
                    </Tab>
                    <Spacer />
                    <Tab _selected={TabSelectedStyle} onClick={() => setTab(3)}>
                        Calls
                    </Tab>
                </TabList>
            </Tabs>
            {tab === 1 && (
                <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    color="white"
                    bg={'dark'}
                    borderRadius={'lg'}>
                    <Stack>
                        <Box bg="dark" borderRadius="lg" w={'100%'} p={3}>
                            <Flex justifyContent={'space-between'}>
                                <Text fontSize={'xl'}>Chats</Text>

                                <Img
                                    src="/icons/create-chat-icon.svg"
                                    alt={'create chat'}
                                    cursor={'pointer'}
                                    onClick={onOpen}
                                />
                            </Flex>
                            <FormControl
                                py={'0.2em'}
                                px={'0.5em'}
                                bg="grey"
                                display="flex"
                                borderRadius="lg"
                                my={4}>
                                <SearchIcon alignSelf="center" ml={2} />
                                <Input
                                    variant={'solid'}
                                    bg="transparent"
                                    id={'text'}
                                    type={'text'}
                                    placeholder={'Search'}
                                    aria-label={'Search'}
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                />
                            </FormControl>
                            <Divider />
                            {chatData.map((data, index) => (
                                <>
                                    <HStack key={index} py={4}>
                                        <Box>
                                            {' '}
                                            <Avatar src="/images/imgs/avatar.svg">
                                                {' '}
                                                <AvatarBadge boxSize="0.8em" bg="green.500" />
                                            </Avatar>
                                        </Box>
                                        <Box w="100%">
                                            <VStack w="100%" alignItems="left">
                                                <Flex>
                                                    {' '}
                                                    <Box>
                                                        <VStack align="left">
                                                            <Text>{data.userName} </Text>
                                                            <Text>{data.message}</Text>
                                                        </VStack>
                                                    </Box>
                                                    <Spacer />
                                                    <Box>
                                                        <VStack>
                                                            <Text>{data.status} </Text>
                                                            <Text
                                                                borderRadius="50%"
                                                                w="20px"
                                                                h="20px"
                                                                bg="primary"
                                                                align="center">
                                                                {data.noOfUnreadChats}
                                                            </Text>
                                                        </VStack>
                                                    </Box>{' '}
                                                </Flex>
                                                <Divider />
                                            </VStack>
                                        </Box>
                                    </HStack>
                                </>
                            ))}
                        </Box>
                    </Stack>{' '}
                    <Stack
                        bg={'black'}
                        borderRadius={'xl'}
                        m={{ base: 0, md: 4 }}
                        p={2}
                        h={'30rem'}>
                        {/* Scrollbar */}
                        <Box
                            position={'sticky'}
                            top={0}
                            bg={'dark'}
                            borderRadius={'lg'}
                            p={4}
                            css={{
                                '&::-webkit-scrollbar': {
                                    width: '0.2em'
                                },
                                '&::-webkit-scrollbar-track': {
                                    background: '#818181'
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    background: '#818181',
                                    border: '0.2em solid #818181',
                                    borderRadius: '20px'
                                }
                            }}>
                            <Flex justify={'space-between'}>
                                <Flex gap={4}>
                                    <Avatar src="/icons/chat-user.svg">
                                        {' '}
                                        <AvatarBadge boxSize="0.8em" bg="green.500" />
                                    </Avatar>
                                    <VStack>
                                        <Text>{'Lily Adrin'} </Text>
                                        <Text>{'Coach'}</Text>
                                    </VStack>
                                </Flex>

                                <HStack>
                                    <Img src="/icons/videocam.svg" alt={'video cam'} />
                                    <Img src="/icons/call.svg" alt={'call'} />
                                    <Img src="/icons/more_vert.svg" alt={'menu'} />
                                </HStack>
                            </Flex>
                        </Box>
                        <Box px={{ base: 2, md: 4 }}>
                            <Flex justify={'flex-start'}>
                                <Text
                                    bg={'grey'}
                                    p={2}
                                    borderBottomRightRadius={'lg'}
                                    borderTopLeftRadius={'lg'}
                                    borderTopRightRadius={'lg'}>
                                    {' '}
                                    Good morning Chief
                                </Text>
                            </Flex>
                            <Flex justify={'flex-start'}>
                                <Text>8:15am</Text>
                            </Flex>
                            <Flex justify={'flex-end'}>
                                <Text
                                    bg={'primary'}
                                    p={2}
                                    borderBottomLeftRadius={'lg'}
                                    borderTopLeftRadius={'lg'}
                                    borderTopRightRadius={'lg'}>
                                    {' '}
                                    Morning Coach
                                </Text>
                            </Flex>
                            <Flex justify={'flex-end'}>
                                <Text>8:30am</Text>
                            </Flex>
                            <Flex justify={'flex-start'}>
                                <Text
                                    bg={'grey'}
                                    p={2}
                                    borderBottomRightRadius={'lg'}
                                    borderTopLeftRadius={'lg'}
                                    borderTopRightRadius={'lg'}>
                                    {' '}
                                    How was your night?
                                </Text>
                            </Flex>
                            <Flex justify={'flex-start'}>
                                <Text>8:50am</Text>
                            </Flex>
                            <Flex justify={'flex-end'}>
                                <Text
                                    bg={'primary'}
                                    p={2}
                                    borderBottomLeftRadius={'lg'}
                                    borderTopLeftRadius={'lg'}
                                    borderTopRightRadius={'lg'}>
                                    {' '}
                                    Great{' '}
                                </Text>
                            </Flex>
                            <Flex justify={'flex-end'}>
                                <Text>9:00am</Text>
                            </Flex>
                            {/* Another */}
                            <Flex justify={'flex-start'}>
                                <Text
                                    bg={'grey'}
                                    p={2}
                                    borderBottomRightRadius={'lg'}
                                    borderTopLeftRadius={'lg'}
                                    borderTopRightRadius={'lg'}>
                                    {' '}
                                    Good morning Chief
                                </Text>
                            </Flex>
                            <Flex justify={'flex-start'}>
                                <Text>8:15am</Text>
                            </Flex>
                            <Flex justify={'flex-end'}>
                                <Text
                                    bg={'primary'}
                                    p={2}
                                    borderBottomLeftRadius={'lg'}
                                    borderTopLeftRadius={'lg'}
                                    borderTopRightRadius={'lg'}>
                                    {' '}
                                    Morning Coach
                                </Text>
                            </Flex>
                            <Flex justify={'flex-end'}>
                                <Text>8:30am</Text>
                            </Flex>
                            <Flex justify={'flex-start'}>
                                <Text
                                    bg={'grey'}
                                    p={2}
                                    borderBottomRightRadius={'lg'}
                                    borderTopLeftRadius={'lg'}
                                    borderTopRightRadius={'lg'}>
                                    {' '}
                                    How was your night?
                                </Text>
                            </Flex>
                            <Flex justify={'flex-start'}>
                                <Text>8:50am</Text>
                            </Flex>
                            <Flex justify={'flex-end'}>
                                <Text
                                    bg={'primary'}
                                    p={2}
                                    borderBottomLeftRadius={'lg'}
                                    borderTopLeftRadius={'lg'}
                                    borderTopRightRadius={'lg'}>
                                    {' '}
                                    Great{' '}
                                </Text>
                            </Flex>
                            <Flex justify={'flex-end'}>
                                <Text>9:00am</Text>
                            </Flex>
                        </Box>
                        <Box position={'sticky'} bottom={0} bg={'dark'} borderRadius={'lg'} p={4}>
                            <Flex gap={2}>
                                <Img src="/icons/add.svg" alt={'add'} />
                                <FormControl
                                    py={'0.2em'}
                                    px={'0.5em'}
                                    bg="lightAsh"
                                    display="flex"
                                    borderRadius="lg">
                                    <Img src="/icons/Smiley.svg" alt={'smiley'} />
                                    <Input
                                        variant={'solid'}
                                        bg="transparent"
                                        id={'text'}
                                        type={'text'}
                                        placeholder={'Start typing...'}
                                        aria-label={'Start typing...'}
                                        onChange={checkInput}
                                    />
                                </FormControl>
                                <Img
                                    src={toggle ? '/icons/send.svg' : '/icons/mic.svg'}
                                    alt={toggle ? 'send message' : 'mic'}
                                />
                            </Flex>
                        </Box>
                        {/* scrollbar ends here */}
                    </Stack>
                </SimpleGrid>
            )}
            {tab === 2 && <GroupChats />}
            {tab === 3 && <Calls />}
            <CreateChatModal isOpen={isOpen} onClose={onClose} />
        </Box>
    );
};

export default authenticatedRoute(Messaging);
