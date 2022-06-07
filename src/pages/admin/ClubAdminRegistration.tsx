import React, {useRef} from 'react'
import S3 from "react-aws-s3-typescript";
import {
    Box,
    Button,
    chakra,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    GridItem,
    Input,
    InputGroup, InputLeftAddon,
    InputLeftElement,
    InputRightElement,
    Select,
    SimpleGrid,
    Text,
    useToast,
    VStack
} from '@chakra-ui/react'
import {FormImage} from '@/components/Form';
import {AiFillEyeInvisible} from 'react-icons/ai'
import {Controller, useForm} from "react-hook-form";
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {adminRegistration} from '@/store/actions/authActions';
import {useRouter} from 'next/router'
import ImageUpload from '@/components/Elements/ImageUpload';
import Link from '@/components/Elements/Link/Link';
import {fetchCountries} from "@/services/countriesService";
import {CountriesSelector} from "@/components/Form/CountriesSelector";
import {PhoneNumberInput} from '@/components/Form/PhoneNumberInput/PhoneNumberInput';


const ClubAdminRegistration = ({countries}: any) => {
    const {isLoading} = useSelector((state: RootStateOrAny) => state.msg)
    const {file, fileName} = useSelector((state: RootStateOrAny) => state.auth)
    const [profilePicture, setProfilePicture] = React.useState<null | File>(null)
    const [show, setShow] = React.useState<Boolean>(false)
    const handleClick = () => setShow(!show)
    const dispatch = useDispatch()
    const toast = useToast()
    const router = useRouter()

    const {
        handleSubmit,
        register,
        control,
        formState: {errors, isSubmitting}
    } = useForm();
    const onSubmit = async (values: any) => {
        console.log('submit', values);
        const payload = {
            photo: "",
            role: "owner",
            club_name: values.clubName,
            email: values.email,
            password: values.password,
            first_name: values.firstname,
            phone: values.phoneNumber,
            last_name: values.lastname,
            country: values.country
        }
        dispatch(adminRegistration(payload, toast, router))
    }

    const uploadImage = () => {
        console.log('file', file);
        console.log('file name', fileName);
        const config: any = {
            bucketName: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
            dirName: `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_LOCATION}.amazonaws.com/`,
            region: process.env.NEXT_PUBLIC_AWS_REGION,
            accessKeyId: process.env.NEXT_PUBLIC_WS_AWS_ACCESS_ID,
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
            poolID: `${process.env.NEXT_PUBLIC_AWS_LOCATION}:eefe909d-3fdf-43ab-b100-5f304bbf6837`,
            s3Url: "https://sonalysis-asset.s3.amazonaws.com/"
        }
        console.log('config', config);
        const ReactS3Client = new S3(config);

        console.log('started')
        ReactS3Client.uploadFile(file, fileName).then((data: any) => {
            console.log('upload data', data);
            if (data.status === 204) {
                console.log('upload success');
            } else {
                console.log('upload failed');
            }
        }).catch((err: any) => {
            console.log('upload error', err);
            console.log('upload error message', err.message);
        });
    };
    return (

        <Flex h="auto" direction={{base: 'column-reverse', md: 'row'}} bg='primary'>
            <FormImage isAdmin image="/images/image/hero-bg.jpg" title="Club Admin Platform"
                       body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut purus rhoncus lectus." />
            <VStack bgColor="black" zIndex={10} color="white" w="full" h="full" p={{base: 2, sm: 20}} spacing={10}
                    alignItems={{base: "center", md: "flex-start"}}>
                <VStack mt={0} spacing={1} alignItems={{base: "center", md: "flex-start"}}>
                    <Text fontSize="38px" onClick={uploadImage} fontWeight="semibold">
                        <chakra.span color="yellow">
                            Build&nbsp;
                        </chakra.span>
                        Your Football Club
                    </Text>
                    <Text w={{base: "90%"}} fontSize="14px" color="#AAAAAA" align={{base: "center", md: "start"}}>Please fill in the following details to bring your dream to life</Text>
                </VStack>
                <SimpleGrid columns={1} rowGap={5} w="80%">
                    <VStack>
                        <ImageUpload
                            defaultImage="/images/image/default-user-avatar3.svg"
                            w="100px"
                            h="100px"
                            rounded="full"
                            setSelectedImage={setProfilePicture}
                            selectedImage={profilePicture}
                        />
                    </VStack>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl mb={5} isInvalid={errors.name}>
                            <FormLabel color="#C9D0CD" fontSize="14px" htmlFor="clubName">
                                CLUB NAME
                            </FormLabel>
                            <Input
                                focusBorderColor="#811AFF"
                                {...register("clubName", {
                                    required: "Club name is required",
                                    minLength: {value: 4, message: "Club name is Required"}
                                })}
                                id="clubName" placeholder="eg. ClubFC"
                            />
                            <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                        </FormControl>
                        <SimpleGrid mb={5} columns={2} spacing={3}>
                            <GridItem>
                                <FormControl isInvalid={errors.firstname}>
                                    <FormLabel color="#C9D0CD" fontSize="14px" htmlFor="firstname">
                                        OWNER'S FIRST NAME
                                    </FormLabel>
                                    <Input
                                        focusBorderColor="#811AFF"
                                        {...register("firstname", {
                                            required: "First Name is required",
                                            minLength: {value: 3, message: "First Name is too short"}
                                        })} id="firstname" placeholder="Enter your firstname"
                                    />
                                    <FormErrorMessage>{errors.firstname && errors.firstname.message}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl isInvalid={errors.lastname}>
                                    <FormLabel color="#C9D0CD" fontSize="14px" htmlFor="lastname">
                                        OWNER'S LAST NAME
                                    </FormLabel>
                                    <Input
                                        focusBorderColor="#811AFF"
                                        {...register("lastname", {
                                            required: "Last Name is required",
                                            minLength: {value: 3, message: "Last Name is too short"}
                                        })} id="lastname" placeholder="Enter your lastname" />
                                    <FormErrorMessage>{errors.lastname && errors.lastname.message}</FormErrorMessage>
                                </FormControl>
                            </GridItem>
                        </SimpleGrid>
                        <CountriesSelector errors={errors} useFormRegisterReturn={register("country", {
                            required: "Country is required",
                            minLength: {value: 5, message: "Country is Required"}
                        })} map={countries?.map((country: any) => (
                            <option key={country.id} value={country.name.common}>{country.name.common}</option>
                        ))} />
                        <FormControl mb={5} isInvalid={errors.email}>
                            <FormLabel color="#C9D0CD" fontSize="14px" htmlFor="email">
                                COMPANY EMAIL
                            </FormLabel>
                            <Input
                                focusBorderColor="#811AFF"
                                {...register("email", {
                                    required: "Company Email is required",
                                    minLength: {value: 5, message: "Company Email is Required"}
                                })} id="email" type="email" placeholder="Enter your email" />
                            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl mb={5} isInvalid={errors.phoneNumber}>
                            <FormLabel color="#C9D0CD" fontSize="14px" htmlFor="phoneNumber">
                                COMPANY PHONE NUMBER
                            </FormLabel>
                            <Controller
                                control={control}
                                name="phoneNumber"
                                render={({field: {onChange}}) => (
                                    <PhoneNumberInput
                                        id="phone"
                                        onChange={onChange}
                                        useFormRegisterReturn={register("phone", {
                                            valueAsNumber: true,
                                            validate: (value) => value > 0 || "Input only digits",
                                            required: "Company phone number is required",
                                            minLength: {
                                                value: 5,
                                                message: "Company phone number is Required"
                                            },
                                        })}
                                    />
                                )}
                            />
                            <FormErrorMessage>{errors.phoneNumber && errors.phoneNumber.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl mb={6} isInvalid={errors.password}>
                            <FormLabel color="#C9D0CD" fontSize="14px" htmlFor="password">
                                PASSWORD
                            </FormLabel>
                            <InputGroup>
                                <Input
                                    focusBorderColor="#811AFF"
                                    {...register("password", {
                                    required: "Password is required",
                                    minLength: {value: 8, message: "Password is Required"}
                                })} id="password" type={show ? "text" : "password"}
                                       placeholder="At least 8+ characters" />
                                <InputRightElement>
                                    <Button mr="10px" padding={0} background="transparent" onClick={handleClick}>
                                        {show ? <AiFillEyeInvisible color='green.500' /> :
                                            <AiFillEyeInvisible color='green.500' />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>Password phone is required.</FormErrorMessage>
                        </FormControl>
                        <Button paddingY={7} mt={7} fontWeight="500" isLoading={isLoading} type="submit" fontSize="14px"
                                variant="action" size="lg" w="full">REGISTER YOUR
                                                                    CLUB</Button>
                    </form>
                    <Text align={'center'} fontSize="14px" fontWeight="600">
                        ALREADY HAVE AN ACCOUNT? <Link href="/login" fontWeight="semibold">LOGIN</Link>
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
