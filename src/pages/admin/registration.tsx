import {
    Flex,
    FormControl,
    Button,
    FormLabel,
    Input,
    FormErrorMessage,
    VStack,
    SimpleGrid,
    Text,
    InputGroup,
    InputRightElement,
    useToast,
    Img,
    HStack,
    Spacer
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useRouter } from 'next/router';
import React from 'react';
import NavBar from '@/components/Layout/NavBar';
import { CountriesSelector } from '@/components/Form/CountriesSelector';
import { fetchCountries } from '@/services/countriesService';
import { PhoneNumberInput } from '@/components/Form/PhoneNumberInput/PhoneNumberInput';
import ImageUpload from '@/components/Elements/ImageUpload';
import { adminRegistration } from '@/store/actions/authActions';

const AdminRegistration = ({ countries }: any) => {
    const { forgotPasswordEmail }: any = useSelector((state: RootStateOrAny) => state.auth);
    const [profilePicture, setProfilePicture] = React.useState<any>(null);
    const {
        handleSubmit,
        register,
        control,
        formState: { errors, touchedFields }
    } = useForm({
        defaultValues: {
            password: '',
            clubName: '',
            firstName: '',
            lastName: '',
            country: '',
            phone: ''
        }
    });

    const { isLoading } = useSelector((state: RootStateOrAny) => state.msg);
    const [show, setShow] = React.useState<boolean>(false);
    const handleClick = () => setShow(!show);
    const dispatch = useDispatch();
    const router = useRouter();
    const toast = useToast();

    const onSubmit = (value: any) => {
        const payload = {
            email: forgotPasswordEmail,
            password: value.password,
            first_name: value.firstName,
            last_name: value.lastName,
            country: value.country,
            club_name: value.clubName,
            phone: value.phone,
            role: 'owner',
            photo: ''
        };
        console.log('payload', payload);
        dispatch(adminRegistration(payload, profilePicture, toast, router));
    };

    return (
        <main>
            <NavBar login />
            <Flex
                direction={'column'}
                bg="white"
                color={'black'}
                minHeight="completeY"
                alignItems="center"
                justifyContent="center">
                <VStack
                    justifyContent={'center'}
                    alignItems={'center'}
                    w={{ base: 'full', md: 'lg' }}>
                    {/*<VStack spacing={1} alignItems={{base: 'center', md: 'flex-start'}}>*/}
                    <Text mb={'40px'} fontSize={{ base: '30px', md: '40px' }} fontWeight="700">
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        Let's get you started
                    </Text>
                    <ImageUpload
                        defaultImage="/images/image/defaultImage.svg"
                        w="100px"
                        h="100px"
                        rounded="full"
                        setSelectedImage={setProfilePicture}
                        selectedImage={profilePicture}
                    />
                    <Spacer h={'40px'} />
                    {/*</VStack>*/}
                    <SimpleGrid columns={1} rowGap={5} w="80%">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl isInvalid={!!errors.clubName} mb={'32px'}>
                                <FormLabel mb={'10px'} htmlFor="clubName">
                                    Club name
                                </FormLabel>
                                <Input
                                    {...register('clubName', {
                                        required: 'Club name is required',
                                        minLength: {
                                            value: 2,
                                            message: 'At least more than 2 letters'
                                        }
                                    })}
                                    id="clubName"
                                    type="text"
                                    placeholder="Enter your club name"
                                    focusBorderColor="purple"
                                    borderColor={'grey5'}
                                    size={'lg'}
                                    borderRadius={'6px'}
                                    _placeholder={{
                                        opacity: 1,
                                        color: 'inputText',
                                        fontSize: '16px',
                                        fontWeight: '400'
                                    }}
                                />
                                <FormErrorMessage>
                                    {errors.clubName && (
                                        <Text
                                            as={'span'}
                                            color={'red'}>{`${errors.clubName.message}`}</Text>
                                    )}
                                </FormErrorMessage>
                            </FormControl>
                            <HStack
                                mb={'32px'}
                                alignItems={'center'}
                                justifyContent={'space-between'}>
                                <FormControl isInvalid={!!errors.firstName}>
                                    <FormLabel mb={'10px'} htmlFor="firstName">
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        Owner's First Name
                                    </FormLabel>
                                    <Input
                                        {...register('firstName', {
                                            required: 'First name is required'
                                        })}
                                        id="firstName"
                                        type="text"
                                        placeholder="Type here"
                                        focusBorderColor="purple"
                                        borderColor={'grey5'}
                                        size={'lg'}
                                        borderRadius={'6px'}
                                        _placeholder={{
                                            opacity: 1,
                                            color: 'inputText',
                                            fontSize: '16px',
                                            fontWeight: '400'
                                        }}
                                    />
                                    <FormErrorMessage>
                                        {errors.firstName && (
                                            <Text
                                                as={'span'}
                                                color={'red'}>{`${errors.firstName.message}`}</Text>
                                        )}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.lastName}>
                                    <FormLabel mb={'10px'} htmlFor="lastName">
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        Owner's Last Name
                                    </FormLabel>
                                    <Input
                                        {...register('lastName', {
                                            required: 'Last name is required'
                                        })}
                                        id="lastName"
                                        type="text"
                                        placeholder="Type here"
                                        focusBorderColor="purple"
                                        borderColor={'grey5'}
                                        size={'lg'}
                                        borderRadius={'6px'}
                                        _placeholder={{
                                            opacity: 1,
                                            color: 'inputText',
                                            fontSize: '16px',
                                            fontWeight: '400'
                                        }}
                                    />
                                    <FormErrorMessage>
                                        {errors.lastName && (
                                            <Text
                                                as={'span'}
                                                color={'red'}>{`${errors.lastName.message}`}</Text>
                                        )}
                                    </FormErrorMessage>
                                </FormControl>
                            </HStack>
                            <FormLabel mb={'10px'} htmlFor="email">
                                Company email
                            </FormLabel>
                            <Input
                                mb={5}
                                id="email"
                                type="email"
                                value={forgotPasswordEmail}
                                placeholder="Enter your email"
                                focusBorderColor="purple"
                                disabled
                                borderColor={'grey5'}
                                size={'lg'}
                                borderRadius={'6px'}
                                _placeholder={{
                                    opacity: 1,
                                    color: 'inputText',
                                    fontSize: '16px',
                                    fontWeight: '400'
                                }}
                            />
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
                            <FormControl mb={5} isInvalid={!!errors.phone}>
                                <FormLabel htmlFor="phone">Company phone number</FormLabel>
                                <Controller
                                    control={control}
                                    name="phone"
                                    render={({ field: { onChange } }) => (
                                        <PhoneNumberInput
                                            id="phone"
                                            onChange={onChange}
                                            useFormRegisterReturn={register('phone', {
                                                valueAsNumber: true,
                                                validate: (value) =>
                                                    parseInt(value) > 0 || 'Input only digits',
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

                            <FormControl isInvalid={!!errors.password} mb={'52px'}>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        {...register('password', {
                                            required: 'Password is required',
                                            minLength: {
                                                value: 8,
                                                message: 'At least 8+ characters'
                                            }
                                        })}
                                        id="password"
                                        placeholder="Enter your password"
                                        focusBorderColor="purple"
                                        type={show ? 'text' : 'password'}
                                        borderColor={'grey5'}
                                        size={'lg'}
                                        borderRadius={'6px'}
                                        _placeholder={{
                                            opacity: 1,
                                            color: 'inputText',
                                            fontSize: '16px',
                                            fontWeight: '400'
                                        }}
                                    />
                                    <InputRightElement>
                                        <Button
                                            mr="10px"
                                            padding={0}
                                            variant={'text'}
                                            onClick={handleClick}>
                                            {!show ? (
                                                <Img
                                                    alt="hide"
                                                    src="/images/icons/Password=Hide.svg"
                                                />
                                            ) : (
                                                <Img
                                                    alt="show"
                                                    src="/images/icons/Password=Visible.svg"
                                                />
                                            )}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>
                                    {errors.password && (
                                        <Text
                                            as={'span'}
                                            color={'red'}>{`${errors.password.message}`}</Text>
                                    )}
                                </FormErrorMessage>
                            </FormControl>
                            {/*email: '',*/}
                            {/*password: '',*/}
                            {/*clubName: '',*/}
                            {/*firstName: '',*/}
                            {/*lastName: '',*/}
                            {/*country: '',*/}
                            {/*phone: ''*/}
                            <Button
                                isLoading={isLoading}
                                disabled={
                                    !profilePicture ||
                                    !touchedFields.phone ||
                                    !touchedFields.clubName ||
                                    !touchedFields.country ||
                                    !touchedFields.lastName ||
                                    !touchedFields.firstName ||
                                    !touchedFields.password
                                }
                                type="submit"
                                size="lg"
                                w="full">
                                Continue
                            </Button>
                        </form>
                        {/*<Text align={'center'}>*/}
                        {/*    Don&#39;t Have an Account?{' '}*/}
                        {/*    <Link href="/admin/ClubAdminRegistration" fontWeight="semibold">*/}
                        {/*        Get Started*/}
                        {/*    </Link>*/}
                        {/*</Text>*/}
                        <HStack w={'full'} justifyContent={'center'}>
                            <HStack onClick={() => router.back()} cursor={'pointer'}>
                                <Img alt="back" src="/images/icons/arrow-circle-left.svg" />
                                <Text>Go back</Text>
                            </HStack>
                        </HStack>
                    </SimpleGrid>
                </VStack>
            </Flex>
        </main>
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
export default AdminRegistration;
