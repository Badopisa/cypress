import ImageUpload from '@/components/Elements/ImageUpload';
import { CountriesSelector } from '@/components/Form/CountriesSelector';
import { PhoneNumberInput } from '@/components/Form/PhoneNumberInput/PhoneNumberInput';
import useUploadToS3 from '@/hooks/useUploadToS3';
import { createAndAddPlayerToTeam } from '@/store/actions/playerActions';
import { UserDataType } from '@/types/AuthDataType';
import {
    Avatar,
    FormControl,
    FormErrorMessage,
    FormLabel,
    GridItem,
    HStack,
    Input,
    Select,
    Text,
    useToast,
    VStack
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';

type NewPlayerType = {
    isOpen: boolean;
    onClose: any;
};

const PersonalInformation = () => {
    const { isLoading } = useSelector((state: RootStateOrAny) => state.msg);
    const { user }: { user: UserDataType } = useSelector((state: RootStateOrAny) => state.auth);
    const { currentTeam }: { currentTeam: any } = useSelector(
        (state: RootStateOrAny) => state.team
    );
    const [profilePicture, setProfilePicture] = React.useState<null | File>(null);
    const [select, setSelected] = useState<boolean>(false);
    const { s3URL, s3Error } = useUploadToS3(profilePicture);

    const {
        handleSubmit,
        register,
        control,
        formState: { errors }
    } = useForm();

    const dispatch = useDispatch();
    const toast = useToast();

    const onSubmit = (value: any) => {
        if (s3Error) {
            return toast({
                title: 'Upload Error',
                description: 'Error uploading image, please try again or remove image',
                status: 'error',
                duration: 9000,
                isClosable: true
            });
        }

        const teamId = currentTeam?.id;

        const payload = {
            photo: s3URL,
            first_name: value.firstName,
            last_name: value.lastName,
            position: value.position,
            jersey_no: value.jerseyNo,
            club_id: user?.clubs[0]?.id,
            email: value.email
        };
        console.log('pre submit payload', payload);
        dispatch(createAndAddPlayerToTeam(payload, teamId, toast, onClose, setSelected));
    };
    return (
        <VStack align={'left'}>
            <Text fontSize={'md'} my={'4'}>
                personal information settings
            </Text>
            <form onSubmit={handleSubmit(onSubmit)}>
                <HStack spacing={'16'}>
                    <VStack mb={6}>
                        <ImageUpload
                            defaultImage="/icons/default-user-avatar3.svg"
                            w="100px"
                            h="100px"
                            rounded="full"
                            setSelectedImage={setProfilePicture}
                            selectedImage={profilePicture}
                        />

                        <Text fontSize="sm" fontWeight="bold" color="blue">
                            Change Image
                        </Text>
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
                                        <option value="6">6– Defending/Holding Midfielder</option>
                                        <option value="7">7– Right Midfielder/Winger</option>
                                        <option value="8">8– Central/Box-to-Box Midfielder</option>
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
                        {/* <CountriesSelector
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
                        /> */}
                        <GridItem w="full">
                            <FormControl mb={5} isInvalid={!!errors.position}>
                                <FormLabel htmlFor="position">Country</FormLabel>
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
                                    <option value="6">6– Defending/Holding Midfielder</option>
                                    <option value="7">7– Right Midfielder/Winger</option>
                                    <option value="8">8– Central/Box-to-Box Midfielder</option>
                                    <option value="9">9– Striker</option>
                                    <option value="10">10– Attacking Midfielder/Playmaker</option>
                                    <option value="11">11– Left Midfielder/Wingers</option>
                                </Select>
                                <FormErrorMessage>
                                    {errors.position && <span>{`${errors.position.message}`}</span>}
                                </FormErrorMessage>
                            </FormControl>
                        </GridItem>
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
                    </VStack>
                </HStack>
            </form>
        </VStack>
    );
};

export default PersonalInformation;
