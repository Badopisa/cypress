import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute'
import React from 'react'
import {Text,
	Box,
	HStack,
	Avatar,
    VStack,
    Stack,
    FormControl, 
    GridItem, 
    FormLabel, 
    Input, 
    FormErrorMessage,
    Select,
    Button,
    Link,
    useToast
	} from '@chakra-ui/react'
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import { useRouter } from 'next/router';
import Steps from '@/components/Team/Steps';
import ImageUpload from '@/components/Elements/ImageUpload';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector,RootStateOrAny } from 'react-redux';
import { createTeam } from '@/store/actions/teamActions';
import { UserDataType } from '@/types/AuthDataType';



const CreateTeam = () =>  {
    const [profilePicture, setProfilePicture] = React.useState<null | File>(null)
    const {isLoading}= useSelector((state: RootStateOrAny) => state.msg)
    const {user}: {user: UserDataType} = useSelector((state: RootStateOrAny)=> state.auth )
    const dispatch = useDispatch()
    const toast = useToast()

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm();

    const router = useRouter()

    const onSubmit = async (values: any) => {
        const club_id = user.clubs[0].id
        const category_id = "6ce44aff-d86f-4f78-b073-dedb0ffa7e2a"
        const payload = {
            club_id, category_id, name: values.name
        }
        dispatch(createTeam(payload, toast, router))
     }

  return (
    <>
        <DashboardDesktopNav hasArrow/>
        <Box color="white" py={{base:12, md:12}} px={{base:4, md:8}}>
            <Text fontSize="3xl" fontWeight="medium">
                Create Team
            </Text>
            <Steps current={1}/>
        </Box>
        <Box color="white" px={{base:4, md:8}}>
            <Stack spacing={24} direction={{base:'column', md:'row'}} >
                <VStack>
                    <ImageUpload
                        defaultImage="/images/image/default-user-avatar.png"
                        w="100px"
                        h="100px"
                        rounded="full"
                        setSelectedImage={setProfilePicture}
                        selectedImage={profilePicture}
                    />
                    <Link fontSize='sm' fontWeight='medium' color='blue'>
                        Upload Your Logo
                    </Link>
                </VStack>
                <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={10}>
                    <HStack spacing={8}>
                        <GridItem >
                            <FormControl isInvalid={errors.name}>
                                <FormLabel htmlFor="name">
                                    TEAM NAME
                                </FormLabel>
                                <Input  
                                {...register("name", {
                                    required: "Team name is required",
                                    minLength: { value: 4, message: "Team name is Required" }
                                })}
                                id="name" type="text" placeholder="eg.TeamFC"/>
                                <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                            </FormControl>
                        </GridItem>
                        <GridItem >
                            <FormControl isInvalid={errors.abbrv}>
                                <FormLabel htmlFor="abbrv">
                                    ABBREVIATION
                                </FormLabel>
                                <Input {...register("abbrv", {
                                    required: "Abreviation is required",
                                    minLength: { value: 4, message: "Abreviation is Required" }
                                })} id="abbrv" type="text" placeholder="eg.ClubFC"/>
                                <FormErrorMessage>{errors.abbrv && errors.abbrv.message}</FormErrorMessage>
                            </FormControl>
                        </GridItem>
                    </HStack>
                    <GridItem colSpan={2} w='full'>
                        <FormControl  mb={5} isInvalid={errors.country}>
                            <FormLabel htmlFor="country">
                                Location
                            </FormLabel>
                            <Select 
                                {...register("country", {
                                    required: "Country is required",
                                    minLength: { value: 5, message: "Country is Required" }
                                })} variant='outline' placeholder='Select Country'>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                            <FormErrorMessage>{errors.country && errors.country.message}</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                    <Button type="submit" isLoading={isLoading} variant='action' w='full' fontSize='sm' fontWeight='normal' >NEXT</Button>
                </VStack>
                </form>
                </Stack>
        </Box>
    </>
  )
}

export default authenticatedRoute(CreateTeam)