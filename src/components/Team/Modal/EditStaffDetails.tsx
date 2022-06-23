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
import React, {useEffect, useState} from 'react'
import {useForm} from "react-hook-form";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {createAndAddPlayerToTeam, updatePlayer} from "@/store/actions/playerActions";
import {UserDataType} from "@/types/AuthDataType";
import Confirmation from './Confirmation';
import {createAndAddStaffToTeam, updateStaff} from "@/store/actions/staffActions";
import useUploadToS3 from "@/hooks/useUploadToS3";

type EditStaffType = {
    isOpen: boolean,
    onClose: (value: boolean) => void,
    setSelected: (value: boolean) => void,
}

const EditStaff = ({isOpen, onClose, setSelected}: EditStaffType) => {
    const {isLoading} = useSelector((state: RootStateOrAny) => state.msg)
    const {
        newStaff
    }: { newStaff: any } = useSelector((state: RootStateOrAny) => state.staff)
    const {user}: { user: UserDataType } = useSelector((state: RootStateOrAny) => state.auth)
    const {currentTeam}: { currentTeam: any } = useSelector((state: RootStateOrAny) => state.team)
    const [profilePicture, setProfilePicture] = React.useState<null | File | string>(null)
    const [firstName, setFirstName] = React.useState<any>(null);
    const [lastName, setLastName] = React.useState<any>(null);
    const [designation, setDesignation] = React.useState<any>(null);
    const [email, setEmail] = React.useState<any>(null);
    const {s3URL, s3Error} = useUploadToS3(profilePicture)

    const dispatch = useDispatch()
    const toast = useToast()

    useEffect(() => {
        setProfilePicture(newStaff?.user?.photo);
        setFirstName(newStaff?.user?.first_name);
        setLastName(newStaff?.user?.last_name);
        setEmail(newStaff?.user?.email)
        setDesignation(newStaff?.role)
        return () => {
        };
    }, [newStaff]);


    const handleSelect = () => {
        if (s3Error) {
            toast({
                title: 'Upload Error',
                status: s3Error,
                description: 'Error uploading image, please try again',
                duration: 9000,
                isClosable: true
            })
            return
        }

        const teamId = currentTeam?.id

        const payload = {
            photo: s3URL,
            id: newStaff?.user?.id,
            first_name: firstName,
            last_name: lastName,
            role: designation,
            email: email,
        }
        console.log("pre submit payload", payload)
        dispatch(updateStaff(payload, toast, onClose, setSelected));
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={() => onClose(false)}>
                <ModalOverlay />
                <ModalContent px={6} w="auto" h="auto" bg="grey" color="white" borderRadius="3xl">
                    <ModalHeader py={8} textAlign="center" fontSize="lg" fontWeight="bold">
                        Edit Staff Details
                    </ModalHeader>
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
                                    <FormControl>
                                        <FormLabel fontSize="sm" htmlFor="firstName">FIRST NAME</FormLabel>
                                        <Input
                                            id="firstName"
                                            placeholder="Enter your firstname"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={1}>
                                    <FormControl>
                                        <FormLabel htmlFor="lastName">
                                            LAST NAME
                                        </FormLabel>
                                        <Input
                                            id="lastname"
                                            placeholder="Enter your last name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </FormControl>
                                </GridItem>
                            </HStack>
                            <HStack spacing={6} w="full">
                                <GridItem w="full">
                                    <FormControl mb={5}>
                                        <FormLabel htmlFor="designation">
                                            DESIGNATION
                                        </FormLabel>
                                        <Select
                                            variant='outline'
                                            placeholder='Select Designation'
                                            id="designation"
                                            value={designation}
                                            onChange={(e) => setDesignation(e.target.value)}
                                        >
                                            <option value='Assistant Coach'>Assistant Coach</option>
                                            <option value='Coach'>Coach</option>
                                            <option value='Physotherapist'>Physotherapist</option>
                                            <option value='Fitness Coach'>Fitness Coach</option>
                                        </Select>
                                    </FormControl>
                                </GridItem>
                            </HStack>
                            <GridItem colSpan={1} w="full">
                                <FormControl mb={5}>
                                    <FormLabel htmlFor="email">
                                        EMAIL
                                    </FormLabel>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="example@gmail.com"
                                    />
                                </FormControl>
                            </GridItem>
                        </VStack>
                    </ModalBody>

                    <ModalFooter w="100%">
                        <VStack spacing={4} w="100%" mb="12px">
                            <Button
                                variant='action'
                                isLoading={isLoading}
                                isDisabled={!(profilePicture && email && firstName && lastName && designation)}
                                w='full' onClick={handleSelect}>
                                Save Changes
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
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditStaff
