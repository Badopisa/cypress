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
import { createAndAddPlayerToTeam } from '@/store/actions/playerActions';
import { UserDataType } from '@/types/AuthDataType';
import Confirmation from './Confirmation';
import useUploadToS3 from '@/hooks/useUploadToS3';

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
    const { s3URL, s3Error } = useUploadToS3(profilePicture);

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm();

    const dispatch = useDispatch();
    const toast = useToast();

    const onSubmit = (value: any) => {
        if (s3Error) {
            return toast({
                title: 'Upload Error',
                description: 'Error uploading image, please try again or remove image',
                status: 'error',
                duration: 9000,
                isClosable: true
            });
        }

        const teamId = currentTeam?.id;

        const payload = {
            photo: s3URL,
            first_name: value.firstName,
            last_name: value.lastName,
            position: value.position,
            jersey_no: value.jerseyNo,
            club_id: user?.clubs[0]?.id,
            email: value.email
        };
        console.log('pre submit payload', payload);
        dispatch(createAndAddPlayerToTeam(payload, teamId, toast, onClose, setSelected));
    };
    return (
        <>
            <Modal isOpen={isOpen} onClose={() => onClose(false)}>
                <ModalOverlay />
                <ModalContent px={6} w="auto" h="auto" bg="grey" color="white" borderRadius="3xl">
                    <ModalHeader py={8} textAlign="center" fontSize="lg" fontWeight="bold">
                        Create New Player
                        <Text fontSize="sm" fontWeight="light">
                            Fill in a player’s details and send an invite
                        </Text>
                    </ModalHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <Center>
                                <VStack mb={6} mt={2}>
                                    <ImageUpload
                                        defaultImage="/images/image/default-user-avatar3.svg"
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
                                                FIRST NAME
                                            </FormLabel>
                                            <Input
                                                {...register('firstName', {
                                                    required: 'First Name is required',
                                                    minLength: {
                                                        value: 2,
                                                        message: 'First Name is too short'
                                                    }
                                                })}
                                                id="firstName"
                                                placeholder="John"
                                            />

                                            <FormErrorMessage>
                                                {errors.firstName && (
                                                    <span>{`${errors.firstName.message}`}</span>
                                                )}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <FormControl isInvalid={!!errors.lastName}>
                                            <FormLabel htmlFor="lastName">LAST NAME</FormLabel>
                                            <Input
                                                {...register('lastName', {
                                                    required: 'Last Name is required',
                                                    minLength: {
                                                        value: 2,
                                                        message: 'Last Name is too short'
                                                    }
                                                })}
                                                id="lastname"
                                                placeholder="Doe"
                                            />
                                            <FormErrorMessage>
                                                {errors.lastName && (
                                                    <span>{`${errors.lastName.message}`}</span>
                                                )}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </GridItem>
                                </HStack>
                                <HStack spacing={6} w="full">
                                    <GridItem w="full">
                                        <FormControl mb={5} isInvalid={!!errors.position}>
                                            <FormLabel htmlFor="position">POSITION</FormLabel>
                                            <Select
                                                {...register('position', {
                                                    required: 'Position is required'
                                                })}
                                                variant="outline"
                                                placeholder="Select Position">
                                                <option value="1">1– Goalkeeper</option>
                                                <option value="2">2– Right Fullback</option>
                                                <option value="3">3– Left Fullback</option>
                                                <option value="4">4– Center Back</option>
                                                <option value="5">5– Center Back (Sweeper)</option>
                                                <option value="6">
                                                    6– Defending/Holding Midfielder
                                                </option>
                                                <option value="7">
                                                    7– Right Midfielder/Winger
                                                </option>
                                                <option value="8">
                                                    8– Central/Box-to-Box Midfielder
                                                </option>
                                                <option value="9">9– Striker</option>
                                                <option value="10">
                                                    10– Attacking Midfielder/Playmaker
                                                </option>
                                                <option value="11">
                                                    11– Left Midfielder/Wingers
                                                </option>
                                            </Select>
                                            <FormErrorMessage>
                                                {errors.position && (
                                                    <span>{`${errors.position.message}`}</span>
                                                )}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem w="full">
                                        <FormControl mb={5} isInvalid={!!errors.jerseyNo}>
                                            <FormLabel htmlFor="jerseyNo">JERSY NUMBER</FormLabel>
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
                                            />
                                            <FormErrorMessage>
                                                {errors.jerseyNo && (
                                                    <span>{`${errors.jerseyNo.message}`}</span>
                                                )}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </GridItem>
                                </HStack>
                                <GridItem colSpan={1} w="full">
                                    <FormControl mb={5} isInvalid={!!errors.email}>
                                        <FormLabel htmlFor="email">EMAIL</FormLabel>
                                        <Input
                                            {...register('email', {
                                                required: 'Email is required'
                                            })}
                                            id="email"
                                            type="email"
                                            placeholder="example@gmail.com"
                                        />
                                        <FormErrorMessage>
                                            {errors.email && (
                                                <span>{`${errors.email.message}`}</span>
                                            )}
                                        </FormErrorMessage>
                                    </FormControl>
                                </GridItem>
                            </VStack>
                        </ModalBody>

                        <ModalFooter w="100%">
                            <VStack spacing={4} w="100%" mb="12px">
                                <Button
                                    isLoading={isLoading}
                                    type="submit"
                                    variant="action"
                                    w="full">
                                    ADD PLAYER
                                </Button>
                                <Center>
                                    <Text w="full" onClick={() => onClose(false)} cursor="pointer">
                                        BACK
                                    </Text>
                                </Center>
                            </VStack>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
            <Confirmation
                jersyPng={'/images/image/contfirmation.gif'}
                isOpen={select}
                onClose={setSelected}
                body={'Sonalysis will notify this player of the changes made'}
                title="Changes Saved"
                buttonTitle={'OKAY, THANK YOU'}
            />
        </>
    );
};

export default NewPlayer;
