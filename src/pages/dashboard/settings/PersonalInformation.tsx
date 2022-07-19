import ImageUpload from '@/components/Elements/ImageUpload';
import { CountriesSelector } from '@/components/Form/CountriesSelector';
import { PhoneNumberInput } from '@/components/Form/PhoneNumberInput/PhoneNumberInput';
import Confirmation from '@/components/Team/Modal/Confirmation';
import { fetchCountries } from '@/services/countriesService';

import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    GridItem,
    HStack,
    Input,
    Select,
    Text,
    VStack
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const PersonalInformation = ({ countries }: any) => {
    const [profilePicture, setProfilePicture] = React.useState<null | File>(null);
    const [select, setSelected] = useState<boolean>(false);

    const {
        register,
        control,
        formState: { errors }
    } = useForm();

    return (
        <>
            <VStack align={'left'}>
                <Text fontSize={'md'} my={'4'}>
                    personal information settings
                </Text>
                <form>
                    <Flex direction={{ base: 'column', md: 'row' }} gap={16}>
                        <VStack mb={6} align={'baseline'}>
                            <ImageUpload
                                defaultImage="/icons/default-user-avatar3.svg"
                                w="100px"
                                h="100px"
                                rounded="full"
                                setSelectedImage={setProfilePicture}
                                selectedImage={profilePicture}
                                title={'Change Image'}
                            />
                        </VStack>
                        <VStack spacing={6}>
                            <HStack spacing={6} w={'full'}>
                                <GridItem w={'full'}>
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
                                <GridItem w={'full'}>
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
                                            <option value="7">7– Right Midfielder/Winger</option>
                                            <option value="8">
                                                8– Central/Box-to-Box Midfielder
                                            </option>
                                            <option value="9">9– Striker</option>
                                            <option value="10">
                                                10– Attacking Midfielder/Playmaker
                                            </option>
                                            <option value="11">11– Left Midfielder/Wingers</option>
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
                                        {errors.email && <span>{`${errors.email.message}`}</span>}
                                    </FormErrorMessage>
                                </FormControl>
                            </GridItem>
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
                                <FormLabel color="#C9D0CD" fontSize="14px" htmlFor="phone">
                                    PHONE NUMBER
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
                                                validate: (value) =>
                                                    value > 0 || 'Input only digits',
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
                                paddingY={7}
                                mt={7}
                                fontWeight="500"
                                // isLoading={isLoading}
                                type="submit"
                                fontSize="14px"
                                variant="action"
                                size="lg"
                                w="full">
                                SAVE
                            </Button>
                        </VStack>
                    </Flex>
                </form>
            </VStack>
            <Confirmation
                jersyPng={'/images/imgs/success.svg'}
                isOpen={select}
                onClose={setSelected}
                body={'Your changes have been made successfully.'}
                title="Changes Saved"
                buttonTitle={'OKAY, THANK YOU'}
            />
        </>
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

export default PersonalInformation;
