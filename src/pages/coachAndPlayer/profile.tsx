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
    useToast,
    HStack,
    Spacer
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import {adminLogin, updateProfile} from '@/store/actions/authActions';
import { useRouter } from 'next/router';
import React from 'react';
import NavBar from '@/components/Layout/NavBar';
import { CountriesSelector } from '@/components/Form/CountriesSelector';
import { fetchCountries } from '@/services/countriesService';
import { PhoneNumberInput } from '@/components/Form/PhoneNumberInput/PhoneNumberInput';
import {UserDataType} from "@/types/AuthDataType";

const Profile = ({ countries }: any) => {
    const {
        handleSubmit,
        register,
        control,
        formState: { errors, touchedFields }
    } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            country: '',
            phone: ''
        }
    });

    const { isLoading } = useSelector((state: RootStateOrAny) => state.msg);
    const { user }: { user: UserDataType } = useSelector((state: RootStateOrAny) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();
    const toast = useToast();

    const onSubmit = (value: any) => {
        const payload = {
            id: user?.id,
            first_name: value.firstName,
            last_name: value.lastName,
            phone: value.phone,
            country: value.country
        };
        dispatch(updateProfile(payload, toast, router));
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
                        Set up your profile
                    </Text>
                    <Spacer h={'40px'} />
                    {/*</VStack>*/}
                    <SimpleGrid columns={1} rowGap={5} w="80%">
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                            <FormControl mb={'80px'} isInvalid={!!errors.phone}>
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

                            <Button
                                isLoading={isLoading}
                                disabled={
                                    !touchedFields.firstName ||
                                    !touchedFields.lastName ||
                                    !touchedFields.country ||
                                    !touchedFields.phone
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
export default Profile;
