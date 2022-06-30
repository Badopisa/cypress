import ImageUpload from '@/components/Elements/ImageUpload';
import {
    Button,
    Center,
    VStack,
    Avatar,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    GridItem,
    FormLabel,
    Input,
    Select,
    HStack,
    FormControl,
    Text
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Confirmation from './Confirmation';

type EditTeamInfoType = {
    isOpen: boolean;
    onClose: (value: boolean) => void;
    //   setSelected: (value: boolean) => void;
};

const EditTeamInfo = ({ isOpen, onClose }: EditTeamInfoType) => {
    const [confirm, setConfirm] = useState<boolean>(false);
    const [profilePicture, setProfilePicture] = React.useState<null | File>(null);
    const handleSelect = () => {
        setConfirm(true);
    };
    return (
        <>
            <Modal isOpen={isOpen} onClose={() => onClose(false)}>
                <ModalOverlay />
                <ModalContent px={6} w="auto" h="auto" bg="grey" color="white" borderRadius="3xl">
                    <ModalHeader py={8} textAlign="center" fontSize="lg" fontWeight="bold">
                        Edit Team Info
                    </ModalHeader>
                    <ModalBody>
                        <Center>
                            <VStack mb={6} mt={2}>
                                <ImageUpload
                                    defaultImage="/icons/team-icon.svg"
                                    w="100px"
                                    h="100px"
                                    rounded="full"
                                    setSelectedImage={setProfilePicture}
                                    selectedImage={profilePicture}
                                />
                                <Text fontSize="sm" fontWeight="bold" color="blue">
                                    Change Image
                                </Text>
                            </VStack>
                        </Center>
                        <VStack spacing={6}>
                            <FormControl w="full">
                                <FormLabel fontSize="sm" htmlFor="name">
                                    NAME
                                </FormLabel>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Wolves FC B"
                                />
                            </FormControl>

                            <FormControl w="full">
                                <FormLabel fontSize="sm" htmlFor="location">
                                    LOCATION
                                </FormLabel>
                                <Select
                                    name="country"
                                    variant="outline"
                                    placeholder="Wolverhampton">
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                </Select>
                            </FormControl>
                        </VStack>
                    </ModalBody>

                    <ModalFooter w="100%">
                        <VStack spacing={4} w="100%" mb="12px">
                            <Button variant="action" w="full" onClick={handleSelect}>
                                Save Changes
                            </Button>
                            <Center>
                                <Text w="full" onClick={() => onClose(false)} cursor="pointer">
                                    BACK
                                </Text>
                            </Center>
                        </VStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Confirmation
                jersyPng={'/images/imgs/success.svg'}
                isOpen={confirm}
                onClose={setConfirm}
                body={'Sonalysis will notify this Team of the changes made'}
                title="Changes Saved"
                buttonTitle={'OKAY, THANK YOU'}
            />
        </>
    );
};

export default EditTeamInfo;
