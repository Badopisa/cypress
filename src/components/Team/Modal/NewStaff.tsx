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
    Text, useToast,
} from '@chakra-ui/react';
import React, {useState} from 'react'
import {useForm} from "react-hook-form";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {createAndAddPlayerToTeam} from "@/store/actions/playerActions";
import {UserDataType} from "@/types/AuthDataType";
import Confirmation from './Confirmation';
import {createAndAddStaffToTeam} from "@/store/actions/staffActions";

type NewStaffType = {
    isOpen: boolean,
    onClose: (value: boolean) => void,
}

const NewStaff = ({isOpen, onClose}: NewStaffType) => {
    const {isLoading} = useSelector((state: RootStateOrAny) => state.msg)
    const {user}: { user: UserDataType } = useSelector((state: RootStateOrAny) => state.auth)
    const {currentTeam}: { currentTeam: any } = useSelector((state: RootStateOrAny) => state.team)
    const [profilePicture, setProfilePicture] = React.useState<null | File>(null)
    const [select, setSelected] = useState<boolean>(false);

    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm();

    const dispatch = useDispatch()
    const toast = useToast()

    const onSubmit = (value: any) => {
        const teamId = currentTeam?.id

        const payload = {
            first_name: value.firstName,
            last_name: value.lastName,
            role: value.designation,
            club_id: user?.clubs[0]?.id,
            email: value.email,
        }
        console.log("pre submit payload", payload)
        dispatch(createAndAddStaffToTeam(payload, teamId, toast, onClose, setSelected))
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={() => onClose(false)}>
                <ModalOverlay />
                <ModalContent px={6} w="auto" h="auto" bg="grey" color="white" borderRadius="3xl">
                    <ModalHeader py={8} textAlign="center" fontSize="lg" fontWeight="bold">
                        Create New Staff
                        <Text fontSize="sm" fontWeight="light">
                            Fill in a staff's details and send an invite
                        </Text>
                    </ModalHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <Center>
                                <VStack mb={6} mt={2}>
                                    <ImageUpload
                                        defaultImage="/images/image/default-user-avatar.png"
                                        w="100px"
                                        h="100px"
                                        rounded="full"
                                        setSelectedImage={setProfilePicture}
                                        selectedImage={profilePicture}
                                    />
                                    <Text fontSize="sm" fontWeight="bold" color="blue">
                                        Upload Image
                                    </Text>
                                </VStack>
                            </Center>
                            <VStack spacing={6}>
                                <HStack spacing={6}>
                                    <GridItem colSpan={1}>
                                        <FormControl isInvalid={errors.firstName}>
                                            <FormLabel fontSize="sm" htmlFor="firstName">FIRST NAME</FormLabel>
                                            <Input
                                                {...register("firstName", {
                                                    required: "Firstname is required",
                                                    minLength: {value: 4, message: "First Name is Required"}
                                                })} id="firstName" placeholder="Enter your firstname"
                                            />
                                            <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <FormControl isInvalid={errors.lastName}>
                                            <FormLabel htmlFor="lastName">
                                                LAST NAME
                                            </FormLabel>
                                            <Input
                                                {...register("lastName", {
                                                    required: "LastName is required",
                                                    minLength: {value: 4, message: "LastName is Required"}
                                                })} id="lastname" placeholder="Enter your last name" />
                                            <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
                                        </FormControl>
                                    </GridItem>
                                </HStack>
                                <HStack spacing={6} w="full">
                                    <GridItem w="full">
                                        <FormControl mb={5} isInvalid={errors.designation}>
                                            <FormLabel htmlFor="designation">
                                                DESIGNATION
                                            </FormLabel>
                                            <Select
                                                {...register("designation", {
                                                    required: "Designation is required",
                                                })} variant='outline' placeholder='Select Designation'>
                                                <option value='Assistant Coach'>Assistant Coach</option>
                                                <option value='Coach'>Coach</option>
                                                <option value='Physotherapist'>Physotherapist</option>
                                                <option value='Fitness Coach'>Fitness Coach</option>
                                            </Select>
                                            <FormErrorMessage>{errors.designation && errors.designation.message}</FormErrorMessage>
                                        </FormControl>
                                    </GridItem>
                                </HStack>
                                <GridItem colSpan={1} w="full">
                                    <FormControl mb={5} isInvalid={errors.email}>
                                        <FormLabel htmlFor="email">
                                            EMAIL
                                        </FormLabel>
                                        <Input
                                            {...register("email", {
                                                required: "Email is required",
                                                minLength: {value: 5, message: "Email address is Required"}
                                            })} id="email" type="email" placeholder="example@gmail.com" />
                                        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                                    </FormControl>
                                </GridItem>
                            </VStack>
                        </ModalBody>

                        <ModalFooter w="100%">
                            <VStack spacing={4} w="100%" mb="12px">
                                <Button isLoading={isLoading} type="submit" variant='action' w="full"
                                >
                                    ADD STAFF
                                </Button>
                                <Center>
                                    <Text
                                        w='full'
                                        onClick={() => onClose(false)}
                                        cursor="pointer"
                                    >
                                        BACK
                                    </Text>
                                </Center>
                            </VStack>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
            <Confirmation
                jersyPng={'/images/imgs/success.svg'}
                isOpen={select}
                onClose={setSelected}
                body={'Sonalysis will notify this player of the changes made'}
                title='Changes Saved'
                buttonTitle={'OKAY, THANK YOU'}
            />
        </>
    )
}

export default NewStaff
