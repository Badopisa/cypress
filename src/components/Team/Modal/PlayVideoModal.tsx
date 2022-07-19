// import ImageUpload from '@/components/Elements/ImageUpload';
import Video from '@/components/Analytics/Video';
import {
    Center,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody
} from '@chakra-ui/react';
import React from 'react';

type SelectedVideoType = {
    isOpen: boolean;
    onClose: any;
    url: string;
    fileName: string;
};
const PlayVideoModal = ({ isOpen, onClose, url, fileName }: SelectedVideoType) => {
    console.log('to be played url is', url);
    return (
        <Modal isOpen={isOpen} onClose={() => onClose(false)}>
            <ModalOverlay />
            <ModalContent minW="800px" w="100%" bg="grey" color="white" borderRadius="3xl">
                <ModalHeader>
                    <Center mb={'-90px'}>{fileName}</Center>
                </ModalHeader>
                <ModalBody>
                    <Video data={url} height={'100%'} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default PlayVideoModal;
