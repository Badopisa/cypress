import { chatData } from '@/data/AnalyticsData';
import { historyData } from '@/data/ChatsData';
import { SearchIcon } from '@chakra-ui/icons';
import {
  SimpleGrid,
  Stack,
  Box,
  Flex,
  Img,
  FormControl,
  Input,
  Divider,
  HStack,
  Avatar,
  AvatarBadge,
  VStack,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import StartCallsModal from './startCallsModal';

const Calls = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {' '}
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        color='white'
        bg={'dark'}
        borderRadius={'lg'}
      >
        <Stack
          bg={'black'}
          borderRadius={'xl'}
          m={{ base: 0, md: 4 }}
          p={2}
          h={'30rem'}
        ></Stack>
        <Stack>
          <Box bg='dark' borderRadius='lg' w={'100%'} p={3}>
            <Flex justifyContent={'space-between'}>
              <Text fontSize={'xl'}>History</Text>

              <Img
                src='/icons/add-call.svg'
                alt={'add call'}
                cursor={'pointer'}
                onClick={onOpen}
              />
            </Flex>
            <FormControl
              py={'0.2em'}
              px={'0.5em'}
              bg='grey'
              display='flex'
              borderRadius='lg'
              my={4}
            >
              <SearchIcon alignSelf='center' ml={2} />
              <Input
                variant={'solid'}
                bg='transparent'
                id={'text'}
                type={'text'}
                placeholder={'Search'}
                aria-label={'Search'}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </FormControl>
            <Divider />
            {historyData
              .filter((data) => {
                if (searchQuery === '') {
                  return data;
                } else if (
                  data.name.toLowerCase().startsWith(searchQuery.toLowerCase())
                ) {
                  return data;
                }
              })
              .map((data) => (
                <>
                  <HStack key={data.id} py={4}>
                    <Box>
                      {' '}
                      <Avatar src='/images/imgs/avatar.svg'>
                        {' '}
                        <AvatarBadge boxSize='0.8em' bg='green.500' />
                      </Avatar>
                    </Box>
                    <Box w='100%'>
                      <VStack w='100%' alignItems='left'>
                        <Flex>
                          {' '}
                          <Box>
                            <VStack align='left'>
                              <Text>{data.name} </Text>
                              <HStack>
                                <Img
                                  src={
                                    data.eventType === 'incoming'
                                      ? '/icons/arrow-down.svg'
                                      : '/icons/arrow-up.svg'
                                  }
                                  alt={'call type'}
                                />
                                <Text>
                                  {data.day} . {data.time}
                                </Text>
                              </HStack>
                            </VStack>
                          </Box>
                          <Spacer />
                          <Box>
                            <Img
                              src={
                                data.event === 'call'
                                  ? '/icons/call-primary.svg'
                                  : '/icons/videocam-primary.svg'
                              }
                              alt='call type'
                            />
                          </Box>{' '}
                        </Flex>
                        <Divider />
                      </VStack>
                    </Box>
                  </HStack>
                </>
              ))}
          </Box>
        </Stack>
      </SimpleGrid>
      <StartCallsModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Calls;
