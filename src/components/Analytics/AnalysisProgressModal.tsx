import {
    Box,
    Button,
    CircularProgressLabel,
    CircularProgress,
    Flex,
    FormLabel,
    Grid,
    HStack,
    Img,
    Input,
    Modal,
    ModalContent,
    ModalOverlay,
    Stack,
    Text,
    VStack,
    useToast
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

import { FileDrop } from 'react-file-drop';
import useUploadToSpaces from '@/hooks/useUploadToSpaces';
import { useRouter } from 'next/router';

const AnalysisProgressModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [homeTeam, setHomeTeam] = useState<string | null>(null);
    const [awayTeam, setAwayTeam] = useState<string | null>(null);
    const router = useRouter();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const handleContinue = () => {
        onClose();
        // router.push('/dashboard/analytics/highlights');
    };

    return (
        <Modal isCentered size={'xl'} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <Grid
                    textAlign="center"
                    placeContent="center"
                    p="3em"
                    bg="white"
                    color="black2"
                    borderRadius="10px"
                    gap="2em">
                    <Text fontSize="40px" fontWeight={'700'}>
                        Verification ongoing...
                    </Text>
                    <Text mt={'-20px'} color={'grey3'} fontSize={'16px'} fontWeight={'400'}>
                        Please wait a moment while your video is being verified
                    </Text>
                    <VStack
                        cursor={'pointer'}
                        w={'full'}>
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
                    <HStack>
                        <VStack alignItems={'flex-start'}>
                            <Text
                                textAlign={'left'}
                                color={'black2'}
                                fontSize={'16px'}
                                fontWeight={'400'}>
                                Home team
                            </Text>
                            <Input
                                type="text"
                                onChange={(e: any) => setHomeTeam(e.target.value)}
                                placeholder="Type here"
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
                        </VStack>
                        <VStack alignItems={'flex-start'}>
                            <Text
                                textAlign={'left'}
                                color={'black2'}
                                fontSize={'16px'}
                                fontWeight={'400'}>
                                Away team
                            </Text>
                            <Input
                                type="text"
                                onChange={(e: any) => setAwayTeam(e.target.value)}
                                placeholder="Type here"
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
                        </VStack>
                    </HStack>

                    <Button
                        onClick={handleContinue}
                        size="lg"
                        // isLoading={spaceIsLoading}
                        color={'white'}>
                        Close
                    </Button>
                </Grid>
            </ModalContent>
        </Modal>
    );
};

export default AnalysisProgressModal;
