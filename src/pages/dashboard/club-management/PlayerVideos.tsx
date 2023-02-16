import Video from '@/components/Analytics/Video';
import {
    Box,
    HStack,
    VStack,
    Text,
    Button,
    Img,
    Table,
    Tbody,
    Td,
    Tr,
    Flex,
    InputGroup,
    InputLeftElement,
    Input
} from '@chakra-ui/react';
import React from 'react';

type displayType = {
    setDisplay: any;
    player: any;
    setStats: any;
};

const PlayerVideos = ({ setDisplay, player, setStats }: displayType) => {
    const handleOpenPlayerStatistics = (data: any) => {
        setStats(data);
        setDisplay(2);
    };

    return (
        <Box overflowX={'auto'} borderRadius={'10px'} w={'100%'}>
            <Text color={'black2'} fontSize={'20px'} fontWeight={'400'} mb={'20px'}>
                Analyzed videos
            </Text>
            <InputGroup mb={'40px'} w="400px">
                <InputLeftElement p={0} pointerEvents="none">
                    {/*<BsSearch color="grey" />*/}
                    <Img mt={'10px'} src={'/images/icons/search-normal.svg'} alt={'search'} />
                </InputLeftElement>
                <Input
                    type="text"
                    placeholder="Search"
                    // value={searchText}
                    // onChange={handleTeamSearch}
                    focusBorderColor="purple"
                    borderColor={'grey5'}
                    size={'lg'}
                    borderRadius={'6px'}
                    _placeholder={{
                        opacity: 1,
                        color: 'inputText',
                        fontSize: '16px',
                        fontWeight: '400'
                    }}
                />
            </InputGroup>
            <Table borderRadius={'10px'}>
                <Tbody>
                    {player?.player?.videos.map((data: any) => (
                        <>
                            <Tr
                                bg="lightWhite"
                                mb={'20px'}
                                borderRadius="10px"
                                p={'20px'}
                                color={'black2'}
                                position={'relative'}
                                key={data?.id}
                                _hover={{
                                    backgroundColor: 'grey5'
                                }}
                                // h={'2%'}
                            >
                                <Td border={'none'} w={'100px'}>
                                    <Video data={data?.video?.last_media_url} />
                                </Td>
                                <Td border={'none'} fontSize={'xs'}>
                                    <VStack alignItems={'flex-start'}>
                                        <Text fontSize={'16px'} fontWeight={'400'} color={'black2'}>
                                            {data?.team_name}
                                        </Text>
                                        <Text fontSize={'12px'} fontWeight={'400'} color={'grey3'}>
                                            Uploaded 3hrs ago
                                        </Text>
                                    </VStack>
                                </Td>
                                <Td border={'none'}>
                                    <Button
                                        onClick={() => handleOpenPlayerStatistics(data)}
                                        variant="text"
                                        fontSize={'16px'}
                                        fontWeight={'400'}>
                                        View analytics
                                    </Button>
                                </Td>
                                <Td border={'none'}>
                                    <HStack cursor={'pointer'}>
                                        <Text fontSize={'12px'} fontWeight={'400'} color={'grey2'}>
                                            Share
                                        </Text>
                                        <Img src="/icons/share.svg" alt="share a video" />
                                    </HStack>
                                </Td>
                                <Td border={'none'}>
                                    <HStack cursor={'pointer'}>
                                        <Text
                                            fontSize={'12px'}
                                            fontWeight={'400'}
                                            color={'#EC000C'}>
                                            Delete
                                        </Text>
                                        <Img src="/icons/trash.svg" alt="delete a video" />
                                    </HStack>
                                </Td>
                            </Tr>
                            <Box h={'20px'} />
                        </>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default PlayerVideos;
