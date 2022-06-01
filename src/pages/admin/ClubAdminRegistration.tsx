import React, {useState} from 'react'
import { Flex,FormControl, GridItem,Button, FormLabel, Input, FormErrorMessage,VStack, SimpleGrid, Select, Center, Text, InputGroup, InputRightElement, chakra, useToast} from '@chakra-ui/react'
import { FormImage, FormDetails } from '@/components/Form';
import {AiOutlinePicture} from 'react-icons/ai'
import {AiFillEyeInvisible} from 'react-icons/ai'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector,RootStateOrAny } from 'react-redux';
import { adminRegistration } from '@/store/actions/authActions';
import { useRouter } from 'next/router'
import ImageUpload from '@/components/Elements/ImageUpload';
import Link from '@/components/Elements/Link/Link';
import {fetchCountries} from "@/services/countriesService";



const ClubAdminRegistration = ({ countries }: any) => {
    const {isLoading}= useSelector((state: RootStateOrAny) => state.msg)
    const [profilePicture, setProfilePicture] = React.useState<null | File>(null)
    const dispatch = useDispatch()
    const toast = useToast()
    const router = useRouter()

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm();
   const onSubmit = async (values: any) => {
       const payload = {
           photo: "",
           role: "owner",
           club_name: values.name,
           email: values.email,
           password: values.password,
           first_name: values.firstname,
           last_name: values.lastname,
           country: values.country
        }
       dispatch(adminRegistration(payload, toast, router))
    }

    return (

    <Flex h="auto" direction={{base:'column-reverse', md:'row'}} bg='primary'>
            <FormImage isAdmin image="/images/image/hero-bg.jpg" title="Club Admin Platform" body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut purus rhoncus lectus."/>
                <VStack bgColor="black" color="white" w="full" h="full"  p={{base: 2, sm: 20}}  spacing={10} alignItems={{base: "center", md:"flex-start"}}>
                    <VStack  mt={5} spacing={1} alignItems={{base:"center", md: "flex-start"}}>
                        <Text fontSize="3xl" fontWeight="semibold">
                            <chakra.span color="yellow">
                                Build&nbsp;
                            </chakra.span>
                            Your Football Club          
                        </Text>
                        <Text w={{base: "90%"}} align={{base:"center", md: "start"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut purus rhoncus lectus.</Text>
                    </VStack>
                    <SimpleGrid columns={1}  rowGap={5} w="80%">
                    <VStack>
                        
                        <ImageUpload
                            defaultImage="/images/image/default-user-avatar.png"
                            w="100px"
                            h="100px"
                            rounded="full"
                            setSelectedImage={setProfilePicture}
                            selectedImage={profilePicture}
                        />
                        <Text color="blue" textAlign='center'>Upload Your Logo</Text>
                    </VStack>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl mb={5} isInvalid={errors.name}>
                            <FormLabel htmlFor="name">
                                Club Name
                            </FormLabel>
                            <Input  
                                {...register("name", {
                                    required: "Club name is required",
                                    minLength: { value: 4, message: "Club name is Required" }
                                })}
                                id="name"  placeholder="eg. ClubFC"
                            />
                            <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                        </FormControl>
                        <SimpleGrid mb={5} columns={2} spacing={3}>
                            <GridItem>
                                <FormControl isInvalid={errors.firstname}>
                                    <FormLabel htmlFor="firstname">
                                        Firstname
                                    </FormLabel>
                                    <Input 
                                        {...register("firstname", {
                                            required: "Firstname is required",
                                            minLength: { value: 4, message: "Firstname is Required" }
                                        })} id="firstname" placeholder="Enter your firstname"
                                    />
                                    <FormErrorMessage>{errors.firstname && errors.firstname.message}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                            <GridItem >
                                <FormControl isInvalid={errors.lastname}>
                                    <FormLabel htmlFor="lastname">
                                        Lastname
                                    </FormLabel>
                                    <Input
                                         {...register("lastname", {
                                            required: "Lastname is required",
                                            minLength: { value: 4, message: "Lastname is Required" }
                                        })} id="lastname"  placeholder="Enter your lastname"/>
                                    <FormErrorMessage>{errors.lastname && errors.lastname.message}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                        </SimpleGrid>
                        <FormControl  mb={5} isInvalid={errors.country}>
                            <FormLabel htmlFor="country">
                                Country
                            </FormLabel>
                            <Select 
                                {...register("country", {
                                    required: "Country is required",
                                    minLength: { value: 5, message: "Country is Required" }
                                })} variant='outline' placeholder='Select Country'>
                                {countries?.map((country: any) => (
                                    <option key={country.id} value={country.name.common}>{country.name.common}</option>
                                ))}
                            </Select>
                            <FormErrorMessage>{errors.country && errors.country.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl mb={5} isInvalid={errors.email}>
                            <FormLabel htmlFor="email">
                                Company Email
                            </FormLabel>
                            <Input  
                                {...register("email", {
                                    required: "Company Email is required",
                                    minLength: { value: 5, message: "Company Email is Required" }
                                })} id="email"  type="email" placeholder="Enter your email"/>
                            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl mb={5} isInvalid={errors.phoneNumber}>
                            <FormLabel htmlFor="phoneNumber">
                                Company Phone Number
                            </FormLabel>
                            <Input {...register("phoneNumber", {
                                    required: "Company phone number is required",
                                    minLength: { value: 5, message: "Company phone number is Required" }
                                })} id="phoneNumber" type="tel" placeholder="901-912-35656"/>
                            <FormErrorMessage>{errors.phoneNumber && errors.phoneNumber.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl mb={6} isInvalid={errors.password}>
                            <FormLabel htmlFor="password">
                                Password
                            </FormLabel>
                            <InputGroup>
                                <Input {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 5, message: "Password is Required" }
                                })} id="password"  type="password" placeholder="At least 8+ characters"/>
                                <InputRightElement><AiFillEyeInvisible color='green.500' /></InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>Password phone is required.</FormErrorMessage>
                        </FormControl>
                        <Button isLoading={isLoading} type="submit" variant="action" size="lg" w="full">REGISTER YOUR CLUB</Button>
                    </form> 
                    <Text align={'center'}>
                        Already have an account? <Link href="/login" fontWeight="semibold">Login</Link>
                    </Text>   
                </SimpleGrid>
             </VStack>
        </Flex>  
    );
};

export async function getStaticProps() {
    const countries = await fetchCountries();
    return {
        props: {
            countries
        },
    }
}

export default ClubAdminRegistration;
