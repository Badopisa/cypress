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
    useToast,
    Select,
    Avatar
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

import { FileDrop } from 'react-file-drop';
import useUploadToSpaces from '@/hooks/useUploadToSpaces';
import { useRouter } from 'next/router';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { getTeamLogos, sendTeamVerification } from '@/store/actions/analyticsAction';

const VerifyTeam = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [homeTeam, setHomeTeam] = useState<string | null>(null);
    const [awayTeam, setAwayTeam] = useState<string | null>(null);
    const { analyticsId, teamLogos } = useSelector((state: RootStateOrAny) => state.analytics);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const toast = useToast();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const handleContinue = () => {
        const payload = {
            old_temp_name1: teamLogos.team_a.team_name,
            old_temp_name2: teamLogos.team_b.team_name,
            new_temp_name1: homeTeam,
            new_temp_name2: awayTeam
        };
        dispatch(sendTeamVerification(payload, analyticsId, router, toast, onClose, setLoading));
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
                        Verify teams
                    </Text>
                    <Text mt={'-20px'} color={'grey3'} fontSize={'16px'} fontWeight={'400'}>
                        Fill in the details to verify your team
                    </Text>
                    <Text
                        textAlign={'left'}
                        color={'black2'}
                        fontSize={'16px'}
                        mb={'-10px'}
                        fontWeight={'400'}>
                        Team logos
                    </Text>
                    <HStack w={'full'}>
                        <VStack alignItems={'flex-start'}>
                            <Avatar
                                w={'80px'}
                                h={'80px'}
                                mb={'20px'}
                                src={teamLogos.team_a.image}
                                name={teamLogos.team_a.team_name}
                            />
                            <Text
                                textAlign={'left'}
                                color={'black2'}
                                fontSize={'16px'}
                                fontWeight={'400'}>
                                Home team
                            </Text>
                            <Select
                                id="team_a"
                                focusBorderColor="purple"
                                size={'lg'}
                                onChange={(e: any) => setHomeTeam(e.target.value)}
                                defaultValue={teamLogos.team_a.team_name || ''}
                                borderRadius={'6px'}
                                borderColor={'slateBlue'}
                                _placeholder={{
                                    opacity: 1,
                                    color: 'inputText',
                                    fontSize: '16px',
                                    fontWeight: '400'
                                }}
                                placeholder="Select correct team">
                                <option value="team_a">{teamLogos.team_a.team_name}</option>
                                <option value="team_b">{teamLogos.team_b.team_name}</option>
                            </Select>
                        </VStack>
                        <Box w={'10px'} />
                        <VStack alignItems={'flex-start'}>
                            <Avatar
                                mb={'20px'}
                                w={'80px'}
                                h={'80px'}
                                src={teamLogos.team_b.image}
                                name={teamLogos.team_b.team_name}
                            />
                            <Text
                                textAlign={'left'}
                                color={'black2'}
                                fontSize={'16px'}
                                fontWeight={'400'}>
                                Away team
                            </Text>
                            <Select
                                id="team_b"
                                focusBorderColor="purple"
                                borderColor={'slateBlue'}
                                w={'full'}
                                onChange={(e: any) => setAwayTeam(e.target.value)}
                                size={'lg'}
                                defaultValue={teamLogos.team_b.team_name || ''}
                                borderRadius={'6px'}
                                _placeholder={{
                                    opacity: 1,
                                    color: 'inputText',
                                    fontSize: '16px',
                                    fontWeight: '400'
                                }}
                                // placeholder="Select the correct team"
                                placeholder="Select correct team">
                                <option value="team_a">{teamLogos.team_a.team_name}</option>
                                <option value="team_b">{teamLogos.team_b.team_name}</option>
                            </Select>
                        </VStack>
                    </HStack>
                    <Box h={'10px'} />

                    <Button
                        onClick={handleContinue}
                        size="lg"
                        loadingText={'Verifying teams...'}
                        isLoading={loading}
                        color={'white'}>
                        Continue
                    </Button>
                </Grid>
            </ModalContent>
        </Modal>
    );
};

export default VerifyTeam;
