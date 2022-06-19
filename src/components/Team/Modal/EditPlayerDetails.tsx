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
    Text,
} from '@chakra-ui/react';
import React from 'react';
import {RootStateOrAny, useSelector} from "react-redux";

type EditPlayerDetailsType = {
    isOpen: boolean;
    onClose: (value: boolean) => void;
    setSelected: (value: boolean) => void;
};

const EditPlayerDetails = ({
                               isOpen,
                               onClose,
                               setSelected,
                           }: EditPlayerDetailsType) => {
    const {
        newPlayer
    }: { newPlayer: any } = useSelector((state: RootStateOrAny) => state.player)
    const [profilePicture, setProfilePicture] = React.useState<null | File>(null);
    const handleSelect = () => {
        setSelected(true);
        onClose(true);
    };
    return (
        <Modal isOpen={isOpen} onClose={() => onClose(false)}>
            <ModalOverlay />
            <ModalContent
                px={6}
                w='auto'
                h='auto'
                bg='grey'
                color='white'
                borderRadius='3xl'
            >
                <ModalHeader py={8} textAlign='center' fontSize='lg' fontWeight='bold'>
                    Edit Player Details
                </ModalHeader>
                <ModalBody>
                    <Center>
                        <VStack mb={6} mt={2}>
                            <ImageUpload
                                defaultImage={newPlayer?.photo || "/images/image/default-user-avatar3.svg"}
                                w='100px'
                                h='100px'
                                rounded='full'
                                setSelectedImage={setProfilePicture}
                                selectedImage={profilePicture}
                                title={newPlayer?.photo ? "Change Profile Picture" : "Add Profile Picture"}
                            />
                        </VStack>
                    </Center>
                    <VStack spacing={6}>
                        <HStack spacing={6}>
                            <GridItem colSpan={1}>
                                <FormControl>
                                    <FormLabel fontSize='sm' htmlFor='firstName'>
                                        FIRST NAME
                                    </FormLabel>
                                    <Input
                                        id='lastname'
                                        name='lastname'
                                        type='text'
                                        placeholder='Cavani'
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={1}>
                                <FormControl>
                                    <FormLabel fontSize='sm' htmlFor='lastname'>
                                        LAST NAME
                                    </FormLabel>
                                    <Input
                                        id='lastname'
                                        name='lastname'
                                        type='text'
                                        placeholder='Edison'
                                    />
                                </FormControl>
                            </GridItem>
                        </HStack>
                        <HStack spacing={6} w='full'>
                            <GridItem w='full'>
                                <FormControl>
                                    <FormLabel fontSize='sm' htmlFor='country'>
                                        POSITION
                                    </FormLabel>
                                    <Select name='country' variant='outline' placeholder='Choose'>
                                        <option value='option1'>Option 1</option>
                                        <option value='option2'>Option 2</option>
                                        <option value='option3'>Option 3</option>
                                    </Select>
                                </FormControl>
                            </GridItem>
                            <GridItem w='full'>
                                <FormControl>
                                    <FormLabel fontSize='sm' htmlFor='jerseyNo'>
                                        JERSY NUMBER
                                    </FormLabel>
                                    <Input
                                        id='jerseyNo'
                                        name='jerseyNo'
                                        type='text'
                                        placeholder='9'
                                    />
                                </FormControl>
                            </GridItem>
                        </HStack>
                        <GridItem colSpan={1} w='full'>
                            <FormControl>
                                <FormLabel fontSize='sm' htmlFor='currentTeam'>
                                    Current Team
                                </FormLabel>
                                <Input
                                    id='currentTeam'
                                    name='currentTeam'
                                    type='text'
                                    placeholder='Wolves B'
                                />
                            </FormControl>
                        </GridItem>
                    </VStack>
                </ModalBody>

                <ModalFooter w='100%'>
                    <VStack spacing={4} w='100%' mb='12px'>
                        <Button variant='action' w='full' onClick={handleSelect}>
                            Save Changes
                        </Button>
                        <Center>
                            <Text w='full' onClick={() => onClose(false)} cursor='pointer'>
                                BACK
                            </Text>
                        </Center>
                    </VStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditPlayerDetails;
