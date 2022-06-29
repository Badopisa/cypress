import ImageUpload from '@/components/Elements/ImageUpload';
import {
    Button,
    Center,
    VStack,
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
    Text, useToast,
} from '@chakra-ui/react';
import React, {useEffect} from 'react';
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {updatePlayer} from "@/store/actions/playerActions";
import useUploadToS3 from "@/hooks/useUploadToS3";

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
    const {currentTeam}: { currentTeam: any } = useSelector(
        (state: RootStateOrAny) => state.team
    );
    const {isLoading} = useSelector((state: RootStateOrAny) => state.msg)
    const [profilePicture, setProfilePicture] = React.useState<null | File | string>(null);
    const [firstName, setFirstName] = React.useState<any>(null);
    const [lastName, setLastName] = React.useState<any>(null);
    const [position, setPosition] = React.useState<any>(null);
    const [jerseyNo, setJerseyNo] = React.useState<any>(null);
    const [team, setTeam] = React.useState<any>(null);
    const [email, setEmail] = React.useState<any>(null);
    const {s3URL, s3Error} = useUploadToS3(profilePicture)
    const dispatch = useDispatch();
    const toast = useToast();

    useEffect(() => {
        setProfilePicture(newPlayer?.photo);
        setFirstName(newPlayer?.first_name);
        setLastName(newPlayer?.last_name);
        setPosition(newPlayer?.position);
        setJerseyNo(newPlayer?.jersey_no);
        setEmail(newPlayer?.user_profile?.email)
        setTeam(newPlayer?.team_name);
        return () => {
        };
    }, [newPlayer]);


    const handleSelect = () => {
            if (s3Error) {
                toast({
                    title: 'Upload Error',
                    description: 'Error uploading image, please try again',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
                console.log('s3 error', s3Error)
                return
            }

            const playerData = {
                id: newPlayer?.id,
                club_id: newPlayer?.club_id,
                photo: s3URL,
                first_name: firstName,
                last_name: lastName,
                email,
                position: position,
                jersey_no: jerseyNo,
                team_name: team,
            };
            console.log('playerData', playerData);
            dispatch(updatePlayer(playerData, currentTeam?.id, toast, onClose, setSelected));
        }
    ;
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
                                defaultImage={"/images/image/default-user-avatar3.svg"}
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
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
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
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
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
                                    <Select name='position' variant='outline' value={position}
                                            onChange={e => setPosition(e.target.value)} placeholder='Choose'>
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
                                        value={jerseyNo}
                                        onChange={e => setJerseyNo(e.target.value)}
                                        type='text'
                                        placeholder='9'
                                    />
                                </FormControl>
                            </GridItem>
                        </HStack>
                        <GridItem colSpan={1} w='full'>
                            <FormControl>
                                <FormLabel fontSize='sm' htmlFor='email'>
                                    Email
                                </FormLabel>
                                <Input
                                    id='email'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    name='email'
                                    type='email'
                                    placeholder='me@you.com'
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem colSpan={1} w='full'>
                            <FormControl>
                                <FormLabel fontSize='sm' htmlFor='currentTeam'>
                                    Current Team
                                </FormLabel>
                                <Input
                                    id='currentTeam'
                                    value={team}
                                    onChange={e => setTeam(e.target.value)}
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
                        <Button
                            variant='action'
                            isLoading={isLoading}
                            isDisabled={!(profilePicture && email && firstName && lastName && position && jerseyNo && team)}
                                w='full' onClick={handleSelect}>
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
