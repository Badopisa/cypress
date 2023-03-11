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
    useDisclosure
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

import { FileDrop } from 'react-file-drop';
import useUploadToSpaces from '@/hooks/useUploadToSpaces';
import AnalysisProgressModal from '@/components/Analytics/AnalysisProgressModal';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { saveUploadUrl, sendToKafka, uploadVideo } from '@/store/actions/analyticsAction';
import { UserDataType } from '@/types/AuthDataType';

const UploadVideoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const { uploadUrl, uploadProgress } = useSelector((state: RootStateOrAny) => state.analytics);
    const { user }: { user: UserDataType } = useSelector((state: RootStateOrAny) => state.auth);
    const { isLoading } = useSelector((state: RootStateOrAny) => state.msg);
    const [video, setVideo] = useState<File | null>(null);
    const { isOpen: open, onOpen: willOpen, onClose: willClose } = useDisclosure();
    const [fileName, setName] = useState<string>('');
    const [season, setSeason] = useState<number | null>(null);
    const [league, setLeague] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const toast = useToast();
    const dispatch = useDispatch();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const handleSubmit = () => {
        const payload = {
            last_media_url: uploadUrl,
            filename: fileName,
            club_id: user?.clubs[0]?.id,
            league: Number(league),
            season: Number(season)
        };
        dispatch(sendToKafka(payload, toast, user?.id, onClose));
    };

    const fileHandler = (file: any) => {
        const extension = file[0].name.split('.')[1]?.toLowerCase();

        if (extension !== undefined) {
            const fName = Object.keys(file).map((name) => {
                return {
                    name: file[name].name,
                    icon: file[name].name.split('.')[1]?.toUpperCase().trim()
                };
            });
            setName(fName[0].name);
            setVideo(file[0]);
            dispatch(uploadVideo(file[0], toast));

            console.log('file name is', fName);
            console.log('files name is', fName[0].name);
            console.log('extension name is', extension);
        } else {
            alert('file type not supported');
        }
    };

    const filePicker = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <>
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
                            Upload video
                        </Text>
                        <Text mt={'-20px'} color={'grey3'} fontSize={'16px'} fontWeight={'400'}>
                            It helps if the video is a high quality video as it gives a more precise
                            analysis
                        </Text>
                        <Grid
                            textAlign="center"
                            placeContent="center"
                            border={'1px dashed'}
                            borderColor={'grey3'}
                            borderRadius="10px"
                            p="2rem">
                            <VStack cursor={'pointer'} spacing={-2} px="4">
                                {video ? (
                                    <Box style={{ width: '50%' }}>
                                        <CircularProgress
                                            value={uploadProgress}
                                            size="120px"
                                            color={uploadProgress < 100 ? 'purple' : 'green'}
                                            thickness={'5px'}>
                                            <CircularProgressLabel fontSize="20px">
                                                {uploadProgress && `${uploadProgress}%`}
                                            </CircularProgressLabel>
                                        </CircularProgress>
                                    </Box>
                                ) : (
                                    <Img
                                        src="/icons/video-upload.svg"
                                        alt="upload file"
                                        onClick={() => inputRef.current?.click()}
                                    />
                                )}
                                <FileDrop onTargetClick={filePicker} onDrop={(f) => fileHandler(f)}>
                                    <input
                                        accept=".mp4"
                                        value=""
                                        // disabled={!!uploadUrl}
                                        style={{ visibility: 'hidden', opacity: 0 }}
                                        ref={inputRef}
                                        type="file"
                                        onChange={(e) => fileHandler(e.target.files)}
                                    />
                                    {fileName ? (
                                        <Flex bg={'lightWhite'} p={3} justify={'center'} gap={3}>
                                            {' '}
                                            <Img src="/icons/file-icon.svg" alt="file icon" />
                                            <Text>{fileName}</Text>{' '}
                                            <Img src="/icons/edit-pen.svg" alt="edit" />{' '}
                                        </Flex>
                                    ) : (
                                        <Text>Upload video from your device</Text>
                                    )}
                                </FileDrop>
                            </VStack>
                        </Grid>
                        <HStack my={'20px'} justifyContent={'space-between'}>
                            <Box w={'full'} border={'1px solid'} borderColor={'grey5'} />
                            <Text color={'grey2'} fontWeight={'400'} fontSize={'16px'}>
                                OR
                            </Text>
                            <Box w={'full'} border={'1px solid'} borderColor={'grey5'} />
                        </HStack>
                        <Stack spacing={4}>
                            <Text
                                textAlign={'left'}
                                color={'black2'}
                                fontSize={'16px'}
                                fontWeight={'400'}>
                                Paste Link
                            </Text>
                            <Input
                                type="text"
                                // disabled={!!uploadUrl}
                                onChange={(e: any) => dispatch(saveUploadUrl(e.target.value))}
                                placeholder="Insert Google doc link"
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
                            <Box h={'10px'} />
                            <HStack justifyContent={'space-between'}>
                                <Box w={'full'} border={'1px solid'} borderColor={'grey5'} />
                                <Text color={'grey2'} fontWeight={'400'} fontSize={'16px'}>
                                    AND
                                </Text>
                                <Box w={'full'} border={'1px solid'} borderColor={'grey5'} />
                            </HStack>
                            <Box h={'20px'} />
                            <HStack>
                                <VStack alignItems={'flex-start'}>
                                    <Text
                                        textAlign={'left'}
                                        color={'black2'}
                                        fontSize={'16px'}
                                        fontWeight={'400'}>
                                        Season
                                    </Text>
                                    <Input
                                        type="number"
                                        onChange={(e: any) => setSeason(e.target.value)}
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
                                        League
                                    </Text>
                                    <Input
                                        type="number"
                                        onChange={(e: any) => setLeague(e.target.value)}
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
                            <Box h={'40px'} />

                            <Button
                                onClick={handleSubmit}
                                size="lg"
                                isLoading={isLoading}
                                disabled={!season || !league || uploadUrl === ''}
                                color={'white'}>
                                Submit
                            </Button>
                            {/*<Button size="lg" bg="transparent" color={'white'} variant="action">*/}
                            {/*    Cancel*/}
                            {/*</Button>*/}
                        </Stack>
                    </Grid>
                </ModalContent>
            </Modal>
            {/*<AnalysisProgressModal isOpen={!!video} onClose={willClose} />*/}
        </>
    );
};

export default UploadVideoModal;
