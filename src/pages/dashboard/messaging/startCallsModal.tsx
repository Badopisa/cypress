import { contacts } from '@/data/ChatsData';
import { SearchIcon } from '@chakra-ui/icons';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    Stack,
    Flex,
    Img,
    FormControl,
    Input,
    SimpleGrid,
    Text,
    Center,
    VStack,
    Avatar,
    HStack,
    Box
} from '@chakra-ui/react';
import React, { useState } from 'react';

const StartCallsModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    return (
        <Box borderRadius={'lg'}>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <Stack p={4} bg={'black'} color={'white'} spacing={6}>
                        <Flex justify={'flex-end'}>
                            <Img
                                src="/icons/close-icon.svg"
                                alt={'close modal'}
                                cursor={'pointer'}
                                onClick={onClose}
                                w={4}
                            />
                        </Flex>
                        <Text fontSize={'xl'}>Start New Call</Text>
                        <FormControl
                            py={'0.2em'}
                            px={'0.5em'}
                            bg="grey"
                            display="flex"
                            borderRadius="lg">
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
                        <Text fontSize={'14px'}>Recently contacted</Text>
                        <SimpleGrid
                            columns={{ base: 1, sm: 2, md: 4 }}
                            spacing={{ base: 8, md: 2 }}>
                            {contacts
                                .map((data) => (
                                    <Stack key={data.id} justify={'center'}>
                                        <Center>
                                            <VStack>
                                                <Avatar src="/images/imgs/player.svg" size={'md'} />
                                                <Text>{data.name.slice(0, 10)}</Text>
                                                <Text>{data.role}</Text>
                                            </VStack>
                                        </Center>
                                    </Stack>
                                ))
                                .slice(0, 4)}
                        </SimpleGrid>
                        <Text>All</Text>

                        {contacts
                            .filter((data) => {
                                if (searchQuery === '') {
                                    return data;
                                } else if (
                                    data.name.toLowerCase().startsWith(searchQuery.toLowerCase())
                                ) {
                                    return data;
                                }
                            })
                            .map((data, index) => (
                                <Flex justify={'space-between'} key={index}>
                                    <HStack gap={1}>
                                        <Avatar src="/images/imgs/player.svg" size={'md'} />
                                        <VStack align={'left'}>
                                            <Text>{data.name}</Text>
                                            <Text>{data.role}</Text>
                                        </VStack>
                                    </HStack>
                                    <HStack gap={4}>
                                        <Img src="/icons/videocam-primary.svg" alt={'call'} />
                                        <Img src="/icons/call-primary.svg" alt={'call'} />
                                    </HStack>
                                </Flex>
                            ))}
                    </Stack>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default StartCallsModal;
