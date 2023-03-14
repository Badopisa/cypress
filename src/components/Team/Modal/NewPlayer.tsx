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
    FormErrorMessage,
    Select,
    HStack,
    FormControl,
    Text,
    useToast
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import {
    createAndAddPlayerToTeam,
    uploadPictureAndCreateAndAddPlayerToTeam
} from '@/store/actions/playerActions';
import { UserDataType } from '@/types/AuthDataType';
import Confirmation from './Confirmation';
import useUploadToS3 from '@/hooks/useUploadToS3';
import { uploadPictureAndCreateTeam } from '@/store/actions/teamActions';

type NewPlayerType = {
    isOpen: boolean;
    onClose: any;
};

const NewPlayer = ({ isOpen, onClose }: NewPlayerType) => {
    const { isLoading } = useSelector((state: RootStateOrAny) => state.msg);
    const { user }: { user: UserDataType } = useSelector((state: RootStateOrAny) => state.auth);
    const { currentTeam }: { currentTeam: any } = useSelector(
        (state: RootStateOrAny) => state.team
    );
    const [profilePicture, setProfilePicture] = React.useState<null | File>(null);
    const [select, setSelected] = useState<boolean>(false);
    const [playerName, setPlayerName] = useState('');

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm();

    const dispatch = useDispatch();
    const toast = useToast();

    const onSubmit = (value: any) => {
        const teamId = currentTeam?.id;

        const payload = {
            photo: '',
            first_name: value.firstName,
            last_name: value.lastName,
            position: value.position,
            jersey_number: value.jerseyNo,
            club_id: user?.clubs[0]?.id,
            email: value.email
        };
        console.log('pre submit payload', payload);
        setPlayerName(`${value.firstName} ${value.lastName}`);
        dispatch(
            uploadPictureAndCreateAndAddPlayerToTeam(
                payload,
                profilePicture,
                teamId,
                toast,
                onClose,
                setSelected,
            )
        );
    };
    return (
        <>
            <Modal isCentered size={'xl'} isOpen={isOpen} onClose={() => onClose(false)}>
                <ModalOverlay />
                <ModalContent
                    px={'43px'}
                    pt={'20px'}
                    pb={'40px'}
                    w="auto"
                    h="auto"
                    bg="white"
                    color="black2"
                    borderRadius="3xl">
                    <ModalHeader py={8} textAlign="center" fontSize="40px" fontWeight="700">
                        Add new player
                        <Text fontSize="16px" color="grey4" fontWeight={'400'}>
                            Fill in the details to send an invite to the player
                        </Text>
                    </ModalHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <Center>
                                <VStack mb={'40px'} mt={2}>
                                    <ImageUpload
                                        defaultImage="/images/image/Avatar.png"
                                        w="100px"
                                        h="100px"
                                        rounded="full"
                                        setSelectedImage={setProfilePicture}
                                        selectedImage={profilePicture}
                                    />
                                </VStack>
                            </Center>
                            <VStack spacing={6}>
                                <HStack spacing={6}>
                                    <GridItem colSpan={1}>
                                        <FormControl isInvalid={!!errors.firstName}>
                                            <FormLabel fontSize="sm" htmlFor="firstName">
                                                First name
                                            </FormLabel>
                                            <Input
                                                {...register('firstName', {
                                                    required: 'First name is required',
                                                    minLength: {
                                                        value: 2,
                                                        message: 'First name is too short'
                                                    }
                                                })}
                                                id="firstName"
                                                placeholder="John"
                                                focusBorderColor="purple"
                                                borderColor={'grey5'}
                                                size={'lg'}
                                                borderRadius={'6px'}
                                                _placeholder={{
                                                    opacity: 1,
                                                    color: 'grey4',
                                                    fontSize: '16px',
                                                    fontWeight: '400'
                                                }}
                                            />

                                            <FormErrorMessage>
                                                {errors.firstName && (
                                                    <Text
                                                        color={
                                                            'red'
                                                        }>{`${errors.firstName.message}`}</Text>
                                                )}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <FormControl isInvalid={!!errors.lastName}>
                                            <FormLabel htmlFor="lastName">Last name</FormLabel>
                                            <Input
                                                {...register('lastName', {
                                                    required: 'Last name is required',
                                                    minLength: {
                                                        value: 2,
                                                        message: 'Last Name is too short'
                                                    }
                                                })}
                                                id="lastname"
                                                placeholder="Doe"
                                                focusBorderColor="purple"
                                                borderColor={'grey5'}
                                                size={'lg'}
                                                borderRadius={'6px'}
                                                _placeholder={{
                                                    opacity: 1,
                                                    color: 'grey4',
                                                    fontSize: '16px',
                                                    fontWeight: '400'
                                                }}
                                            />
                                            <FormErrorMessage>
                                                {errors.lastName && (
                                                    <Text
                                                        color={
                                                            'red'
                                                        }>{`${errors.lastName.message}`}</Text>
                                                )}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </GridItem>
                                </HStack>
                                <HStack spacing={6} w="full">
                                    <GridItem w="full">
                                        <FormControl mb={5} isInvalid={!!errors.position}>
                                            <FormLabel htmlFor="position">Position</FormLabel>
                                            <Select
                                                {...register('position', {
                                                    required: 'Position is required'
                                                })}
                                                variant="outline"
                                                focusBorderColor="purple"
                                                borderColor={'grey5'}
                                                size={'lg'}
                                                borderRadius={'6px'}
                                                _placeholder={{
                                                    opacity: 1,
                                                    color: 'grey4',
                                                    fontSize: '16px',
                                                    fontWeight: '400'
                                                }}
                                                placeholder="Select Position">
                                                <option value="forward">Forward</option>
                                                <option value="midfield">Midfield</option>
                                                <option value="defense">Defense</option>
                                                <option value="keepers">Keeper</option>
                                            </Select>
                                            <FormErrorMessage>
                                                {errors.position && (
                                                    <Text
                                                        color={
                                                            'red'
                                                        }>{`${errors.position.message}`}</Text>
                                                )}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem w="full">
                                        <FormControl mb={5} isInvalid={!!errors.jerseyNo}>
                                            <FormLabel htmlFor="jerseyNo">Jersey number</FormLabel>
                                            <Input
                                                {...register('jerseyNo', {
                                                    required: 'Jersey number is required',
                                                    minLength: {
                                                        value: 0,
                                                        message: 'Jersey number is Required'
                                                    }
                                                })}
                                                id="jerseyNo"
                                                type="number"
                                                placeholder="9"
                                                focusBorderColor="purple"
                                                borderColor={'grey5'}
                                                size={'lg'}
                                                borderRadius={'6px'}
                                                _placeholder={{
                                                    opacity: 1,
                                                    color: 'grey4',
                                                    fontSize: '16px',
                                                    fontWeight: '400'
                                                }}
                                            />
                                            <FormErrorMessage>
                                                {errors.jerseyNo && (
                                                    <Text
                                                        color={
                                                            'red'
                                                        }>{`${errors.jerseyNo.message}`}</Text>
                                                )}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </GridItem>
                                </HStack>
                                <GridItem colSpan={1} w="full">
                                    <FormControl mb={5} isInvalid={!!errors.email}>
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <Input
                                            {...register('email', {
                                                required: 'Email is required'
                                            })}
                                            id="email"
                                            type="email"
                                            placeholder="example@gmail.com"
                                            focusBorderColor="purple"
                                            borderColor={'grey5'}
                                            size={'lg'}
                                            borderRadius={'6px'}
                                            _placeholder={{
                                                opacity: 1,
                                                color: 'grey4',
                                                fontSize: '16px',
                                                fontWeight: '400'
                                            }}
                                        />
                                        <FormErrorMessage>
                                            {errors.email && (
                                                <Text
                                                    color={'red'}>{`${errors.email.message}`}</Text>
                                            )}
                                        </FormErrorMessage>
                                    </FormControl>
                                </GridItem>
                            </VStack>
                        </ModalBody>

                        <ModalFooter w="100%">
                            <VStack spacing={4} w="100%" mb="12px">
                                <Button isLoading={isLoading} type="submit" size={'lg'} w="full">
                                    Continue
                                </Button>
                            </VStack>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
            <Confirmation
                jersyPng={'/images/image/contfirmation.gif'}
                playerName={playerName}
                isOpen={select}
                onClose={setSelected}
                body={'Sonalysis will notify this player of the changes made'}
                // title="Changes saved"
                buttonTitle={'Okay, thank you'}
            />
        </>
    );
};

export default NewPlayer;
