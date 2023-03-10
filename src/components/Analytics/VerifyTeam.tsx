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

const VerifyTeam = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [homeTeam, setHomeTeam] = useState<string | null>(null);
    const [awayTeam, setAwayTeam] = useState<string | null>(null);
    const router = useRouter();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const handleContinue = () => {
        onClose();
        router.push('/dashboard/analytics/highlights');
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
                        Verify team
                    </Text>
                    <Text mt={'-20px'} color={'grey3'} fontSize={'16px'} fontWeight={'400'}>
                        Fill in the details to verify your team
                    </Text>
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
                        Continue
                    </Button>
                </Grid>
            </ModalContent>
        </Modal>
    );
};

export default VerifyTeam;
