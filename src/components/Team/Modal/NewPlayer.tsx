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
import React from 'react'
import {useForm} from "react-hook-form";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {createAndAddPlayerToTeam} from "@/store/actions/playerActions";
import {UserDataType} from "@/types/AuthDataType";

type NewPlayerType = {
    isOpen: boolean,
    onClose: (value: boolean) => void,
}

const NewPlayer = ({isOpen, onClose}: NewPlayerType) => {
    const {isLoading} = useSelector((state: RootStateOrAny) => state.msg)
    const {user}: { user: UserDataType } = useSelector((state: RootStateOrAny) => state.auth)
    const {currentTeam}: { currentTeam: any } = useSelector((state: RootStateOrAny) => state.team)
    const [profilePicture, setProfilePicture] = React.useState<null | File>(null)

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
            position: value.position,
            jersey_no: value.jersey_no,
            club_id: user?.clubs[0]?.id,
            email: value.email,
        }
        console.log("pre submit payload", payload)
        dispatch(createAndAddPlayerToTeam(payload, teamId, toast, onClose))
    }
    return (
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
                                                minLength: { value: 4, message: "First Name is Required" }
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
                                                minLength: { value: 4, message: "LastName is Required" }
                                            })} id="lastname"  placeholder="Enter your last name"/>
                                        <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
                                    </FormControl>
                                </GridItem>
                            </HStack>
                            <HStack spacing={6} w="full">
                                <GridItem w="full">
                                    <FormControl  mb={5} isInvalid={errors.position}>
                                        <FormLabel htmlFor="position">
                                            POSITION
                                        </FormLabel>
                                        <Select
                                            {...register("position", {
                                                required: "Position is required",
                                            })} variant='outline' placeholder='Select Position'>
                                            <option value='option1'>Option 1</option>
                                            <option value='option2'>Option 2</option>
                                            <option value='option3'>Option 3</option>
                                        </Select>
                                        <FormErrorMessage>{errors.country && errors.country.message}</FormErrorMessage>
                                    </FormControl>
                                </GridItem>
                                <GridItem w="full">
                                    <FormControl mb={5} isInvalid={errors.jerseyNo}>
                                        <FormLabel htmlFor="jerseyNo">
                                            JERSY NUMBER
                                        </FormLabel>
                                        <Input {...register("jerseyNo", {
                                            required: "Jersey number is required",
                                        })} id="jerseyNo" type="number" placeholder="9"/>
                                        <FormErrorMessage>{errors.jerseyNo && errors.jerseryNo.message}</FormErrorMessage>
                                    </FormControl>
                                </GridItem>
                            </HStack>
                            <GridItem colSpan={1} w="full">
                                <FormControl mb={5} isInvalid={errors.email}>
                                    <FormLabel htmlFor="email">
                                        Email
                                    </FormLabel>
                                    <Input
                                        {...register("email", {
                                            required: "Email is required",
                                            minLength: { value: 5, message: "Email address is Required" }
                                        })} id="email"  type="email" placeholder="example@gmail.com"/>
                                    <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                        </VStack>
                    </ModalBody>

                    <ModalFooter w="100%">
                        <VStack spacing={4} w="100%" mb="12px">
                            <Button isLoading={isLoading} type="submit" variant='action' w="full"
                            >
                                ADD PLAYER
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
    )
}

export default NewPlayer
