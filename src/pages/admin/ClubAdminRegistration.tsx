import React from 'react';
import {
    Button,
    chakra,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    GridItem,
    Input,
    InputGroup,
    InputRightElement,
    SimpleGrid,
    Text,
    useToast,
    VStack
} from '@chakra-ui/react';
import { FormImage } from '@/components/Form';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { Controller, useForm } from 'react-hook-form';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { adminRegistration } from '@/store/actions/authActions';
import { useRouter } from 'next/router';
import ImageUpload from '@/components/Elements/ImageUpload';
import Link from '@/components/Elements/Link/Link';
import { fetchCountries } from '@/services/countriesService';
import { CountriesSelector } from '@/components/Form/CountriesSelector';
import { PhoneNumberInput } from '@/components/Form/PhoneNumberInput/PhoneNumberInput';
import useUploadToS3 from '@/hooks/useUploadToS3';

const ClubAdminRegistration = ({ countries }: any) => {
    const { isLoading } = useSelector((state: RootStateOrAny) => state.msg);
    const [profilePicture, setProfilePicture] = React.useState<null | File>(null);
    const [show, setShow] = React.useState<boolean>(false);
    const { s3URL, s3Error } = useUploadToS3(profilePicture);
    const handleClick = () => setShow(!show);
    const dispatch = useDispatch();
    const toast = useToast();
    const router = useRouter();

    const {
        handleSubmit,
        register,
        control,
        formState: { errors }
    } = useForm();
    const onSubmit = async (values: any) => {
        if (s3Error) {
            return toast({
                title: 'Upload Error',
                description: 'Error uploading image, please try again or remove image',
                status: 'error',
                duration: 9000,
                isClosable: true
            });
        }

        const payload = {
            photo: s3URL,
            role: 'owner',
            club_name: values.clubName,
            email: values.email,
            password: values.password,
            first_name: values.firstname,
            phone: values.phoneNumber,
            last_name: values.lastname,
            country: values.country
        };

        dispatch(adminRegistration(payload, toast, router));
    };

    return (
        <Flex h="auto" direction={{ base: 'column-reverse', md: 'row' }} bg="primary">
            <FormImage
                isAdmin
                image="/images/image/hero-bg.jpg"
                title="Club Admin Platform"
                body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut purus rhoncus lectus."
            />
            <VStack
                bgColor="black"
                zIndex={10}
                color="white"
                w="full"
                h="full"
                p={{ base: 2, sm: 20 }}
                spacing={10}
                alignItems={{ base: 'center', md: 'flex-start' }}>
                <VStack mt={0} spacing={1} alignItems={{ base: 'center', md: 'flex-start' }}>
                    <Text fontSize="38px" fontWeight="semibold">
                        <chakra.span color="yellow">Build&nbsp;</chakra.span>
                        Your Football Club
                    </Text>
                    <Text
                        w={{ base: '90%' }}
                        fontSize="14px"
                        color="#AAAAAA"
                        align={{ base: 'center', md: 'start' }}>
                        Please fill in the following details to bring your dream to life
                    </Text>
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
                        <FormControl mb={5} isInvalid={!!errors.clubName}>
                            <FormLabel color="#C9D0CD" fontSize="14px" htmlFor="clubName">
                                CLUB NAME
                            </FormLabel>
                            <Input
                                focusBorderColor="#811AFF"
                                {...register('clubName', {
                                    required: 'Club name is required',
                                    minLength: { value: 3, message: 'Club name is too short' }
                                })}
                                id="clubName"
                                placeholder="eg. ClubFC"
                            />
                            <FormErrorMessage>
                                {errors.clubName && <span>{`${errors.clubName.message}`}</span>}
                            </FormErrorMessage>
                        </FormControl>
                        <SimpleGrid mb={5} columns={2} spacing={3}>
                            <GridItem>
                                <FormControl isInvalid={!!errors.firstname}>
                                    <FormLabel color="#C9D0CD" fontSize="14px" htmlFor="firstname">
                                        OWNER&#39;S FIRST NAME
                                    </FormLabel>
                                    <Input
                                        focusBorderColor="#811AFF"
                                        {...register('firstname', {
                                            required: 'First Name is required',
                                            minLength: {
                                                value: 2,
                                                message: 'First Name is too short'
                                            }
                                        })}
                                        id="firstname"
                                        placeholder="Enter your firstname"
                                    />
                                    <FormErrorMessage>
                                        {errors.firstname && (
                                            <span>{`${errors.firstname.message}`}</span>
                                        )}
                                    </FormErrorMessage>
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl isInvalid={!!errors.lastname}>
                                    <FormLabel color="#C9D0CD" fontSize="14px" htmlFor="lastname">
                                        OWNER&#39;S LAST NAME
                                    </FormLabel>
                                    <Input
                                        focusBorderColor="#811AFF"
                                        {...register('lastname', {
                                            required: 'Last Name is required',
                                            minLength: {
                                                value: 2,
                                                message: 'Last Name is too short'
                                            }
                                        })}
                                        id="lastname"
                                        placeholder="Enter your lastname"
                                    />
                                    <FormErrorMessage>
                                        {errors.lastname && (
                                            <span>{`${errors.lastname.message}`}</span>
                                        )}
                                    </FormErrorMessage>
                                </FormControl>
                            </GridItem>
                        </SimpleGrid>
                        <CountriesSelector
                            errors={errors}
                            useFormRegisterReturn={register('country', {
                                required: 'Country is required',
                                minLength: { value: 3, message: 'Country name is too short' }
                            })}
                            map={countries?.map((country: any) => (
                                <option key={country.id} value={country.name.common}>
                                    {country.name.common}
                                </option>
                            ))}
                        />
                        <FormControl mb={5} isInvalid={!!errors.email}>
                            <FormLabel color="#C9D0CD" fontSize="14px" htmlFor="email">
                                COMPANY EMAIL
                            </FormLabel>
                            <Input
                                focusBorderColor="#811AFF"
                                {...register('email', {
                                    required: 'Company Email is required'
                                })}
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                            />
                            <FormErrorMessage>
                                {errors.email && <span>{`${errors.email.message}`}</span>}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl mb={5} isInvalid={!!errors.phone}>
                            <FormLabel color="#C9D0CD" fontSize="14px" htmlFor="phone">
                                COMPANY PHONE NUMBER
                            </FormLabel>
                            <Controller
                                control={control}
                                name="phone"
                                render={({ field: { onChange } }) => (
                                    <PhoneNumberInput
                                        id="phone"
                                        onChange={onChange}
                                        useFormRegisterReturn={register('phone', {
                                            valueAsNumber: true,
                                            validate: (value) => value > 0 || 'Input only digits',
                                            required: 'Company phone number is required',
                                            minLength: {
                                                value: 5,
                                                message: 'Company phone number is too short'
                                            }
                                        })}
                                    />
                                )}
                            />
                            <FormErrorMessage>
                                {errors.phone && <span>{`${errors.phone.message}`}</span>}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl mb={6} isInvalid={!!errors.password}>
                            <FormLabel color="#C9D0CD" fontSize="14px" htmlFor="password">
                                PASSWORD
                            </FormLabel>
                            <InputGroup>
                                <Input
                                    focusBorderColor="#811AFF"
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 8,
                                            message: 'Password must be at least 8 characters long'
                                        }
                                    })}
                                    id="password"
                                    type={show ? 'text' : 'password'}
                                    placeholder="At least 8+ characters"
                                />
                                <InputRightElement>
                                    <Button
                                        mr="10px"
                                        padding={0}
                                        background="transparent"
                                        onClick={handleClick}>
                                        <AiFillEyeInvisible color="green.500" />
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>
                                {errors.password && <span>{`${errors.password.message}`}</span>}
                            </FormErrorMessage>
                        </FormControl>
                        <Button
                            paddingY={7}
                            mt={7}
                            fontWeight="500"
                            isLoading={isLoading}
                            type="submit"
                            fontSize="14px"
                            variant="action"
                            size="lg"
                            w="full">
                            REGISTER YOUR CLUB
                        </Button>
                    </form>
                    <Text align={'center'} fontSize="14px" fontWeight="600">
                        ALREADY HAVE AN ACCOUNT?{' '}
                        <Link href="/login" fontWeight="semibold">
                            LOGIN
                        </Link>
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
        }
    };
}

export default ClubAdminRegistration;
