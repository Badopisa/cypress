import { matchStatsData } from '@/data/AnalyticsData';
import {
    Box,
    VStack,
    Flex,
    Img,
    Spacer,
    Text,
    InputGroup,
    InputLeftElement,
    Input,
    Table,
    Tbody,
    Tr,
    Td,
    Button,
    HStack,
    useToast,
    Center,
    Spinner,
    Grid,
    useDisclosure
} from '@chakra-ui/react';
import Video from '@/components/Analytics/Video';
import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { getAnalytics } from '@/store/actions/analyticsAction';
import moment from 'moment';
import BlankTeam from '@/components/Team/BlankTeam';
import { useRouter } from 'next/router';
import VerifyTeam from '@/components/Analytics/VerifyTeam';
import AnalysisProgressModal from '@/components/Analytics/AnalysisProgressModal';

const AllVideoAnalytics = () => {
    const { allVideoAnalytics } = useSelector((state: RootStateOrAny) => state.analytics);
    const { isLoading } = useSelector((state: RootStateOrAny) => state.msg);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: open, onOpen: willOpen, onClose: willClose } = useDisclosure();
    const router = useRouter();

    const handleOpenVideoAnalytics = (data: any) => {
        if (data?.first_view < 1) {
            onOpen();
            return;
        }
        router.push('/dashboard/analytics/highlights');
    };

    if (isLoading) {
        return (
            <Center my="16">
                <Spinner size="xl" />
            </Center>
        );
    }

    return (
        <>
            {allVideoAnalytics && allVideoAnalytics.length > 0 ? (
                <>
                    <Box overflowX={'auto'} borderRadius={'10px'} w={'100%'}>
                        <InputGroup mb={'40px'} w="400px">
                            <InputLeftElement p={0} pointerEvents="none">
                                {/*<BsSearch color="grey" />*/}
                                <Img
                                    mt={'10px'}
                                    src={'/images/icons/search-normal.svg'}
                                    alt={'search'}
                                />
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
                                {/*{player?.player?.videos.map((data: any) => (*/}
                                {allVideoAnalytics.map((data: any) => {
                                    return (
                                        <>
                                            <Tr
                                                bg="lightWhite"
                                                mb={'20px'}
                                                borderRadius="10px"
                                                p={'20px'}
                                                color={'black2'}
                                                position={'relative'}
                                                // key={data?.id}
                                                _hover={{
                                                    backgroundColor: 'grey6'
                                                }}
                                                // h={'2%'}
                                            >
                                                <Td border={'none'} w={'100px'}>
                                                    {/*<Video data={data?.video?.last_media_url} />*/}
                                                    <Video data={data?.last_media_url} />
                                                </Td>
                                                <Td border={'none'} fontSize={'xs'}>
                                                    <VStack alignItems={'flex-start'}>
                                                        <Text
                                                            fontSize={'16px'}
                                                            fontWeight={'400'}
                                                            color={'black2'}>
                                                            {data?.filename}
                                                        </Text>
                                                        <Text
                                                            fontSize={'12px'}
                                                            fontWeight={'400'}
                                                            color={'grey3'}>
                                                            Updated {moment().to(data?.updated_at)}
                                                        </Text>
                                                    </VStack>
                                                </Td>
                                                <Td border={'none'}>
                                                    {data?.analysed > 0 ? (
                                                        <Button
                                                            onClick={() =>
                                                                handleOpenVideoAnalytics(data)
                                                            }
                                                            variant="text"
                                                            fontSize={'16px'}
                                                            fontWeight={'400'}>
                                                            View analytics
                                                        </Button>
                                                    ) : (
                                                        <VStack
                                                            onClick={willOpen}
                                                            cursor={'pointer'}
                                                            w={'70%'}>
                                                            <HStack
                                                                justifyContent={'space-between'}
                                                                w={'full'}>
                                                                <Text
                                                                    fontWeight={'400'}
                                                                    fontSize={'12px'}
                                                                    color={'grey3'}>
                                                                    Verifying
                                                                </Text>
                                                                <Text
                                                                    fontWeight={'400'}
                                                                    fontSize={'12px'}
                                                                    color={'black2'}>
                                                                    40%
                                                                </Text>
                                                            </HStack>
                                                            {/*<Progress w={'100px'} colorScheme={'purple'} value={20} />*/}
                                                            <Box w={'100%'} position={'relative'}>
                                                                <Box
                                                                    position={'absolute'}
                                                                    w={'40%'}
                                                                    h={'4px'}
                                                                    bg={'primary'}
                                                                />
                                                                <Box
                                                                    w={'100%'}
                                                                    h={'4px'}
                                                                    bg={'grey100'}
                                                                />
                                                            </Box>
                                                        </VStack>
                                                    )}
                                                </Td>
                                                <Td border={'none'}>
                                                    <HStack cursor={'pointer'}>
                                                        <Text
                                                            fontSize={'12px'}
                                                            fontWeight={'400'}
                                                            color={'grey2'}>
                                                            Share
                                                        </Text>
                                                        <Img
                                                            src="/icons/share.svg"
                                                            alt="share a video"
                                                        />
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
                                                        <Img
                                                            src="/icons/trash.svg"
                                                            alt="delete a video"
                                                        />
                                                    </HStack>
                                                </Td>
                                            </Tr>
                                            <Box h={'20px'} />
                                        </>
                                    );
                                })}
                            </Tbody>
                        </Table>
                    </Box>
                </>
            ) : (
                <Grid
                    textAlign="center"
                    placeContent="center"
                    borderRadius="lg"
                    p="4rem"
                    mt="2rem"
                    bg="white">
                    <VStack spacing={6} px={{ base: 4, md: 8 }}>
                        <Img src="/images/icons/empty-file.svg" alt="empty file" />
                        <Text fontWeight={'700'} fontSize={'20px'}>
                            No videos uploaded yet
                        </Text>
                        <Text mt="1rem">Analysed videos will appear here</Text>
                    </VStack>
                </Grid>
            )}
            <VerifyTeam isOpen={isOpen} onClose={onClose} />
            <AnalysisProgressModal isOpen={open} onClose={willClose} />
        </>
    );
};
export default AllVideoAnalytics;
