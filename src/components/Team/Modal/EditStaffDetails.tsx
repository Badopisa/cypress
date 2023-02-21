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
    Select,
    HStack,
    FormControl,
    Text,
    useToast,
    FormErrorMessage
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { UserDataType } from '@/types/AuthDataType';
import {
    updateStaff,
    uploadPictureAndCreateAndAddStaffToTeam,
    uploadPictureAndUpdateStaff
} from '@/store/actions/staffActions';
import useUploadToS3 from '@/hooks/useUploadToS3';
import { CountriesSelector } from '@/components/Form/CountriesSelector';
import { useForm } from 'react-hook-form';
import { fetchCountries } from '@/services/countriesService';

type EditStaffType = {
    isOpen: boolean;
    onClose: any;
    setSelected: any;
};

const EditStaff = ({ isOpen, onClose, setSelected }: EditStaffType) => {
    const { isLoading } = useSelector((state: RootStateOrAny) => state.msg);
    const { newStaff }: { newStaff: any } = useSelector((state: RootStateOrAny) => state.staff);
    const { user }: { user: UserDataType } = useSelector((state: RootStateOrAny) => state.auth);
    const { currentTeam }: { currentTeam: any } = useSelector(
        (state: RootStateOrAny) => state.team
    );
    const [profilePicture, setProfilePicture] = React.useState<null | File | string>(null);
    const [countries, setCountries] = useState<any>(null);
    const [firstName, setFirstName] = useState<any>('');
    const [lastName, setLastName] = useState<any>('');
    const [role, setRole] = useState<any>('');
    const [email, setEmail] = useState<any>('');
    const [country, setCountry] = useState<any>('');

    const dispatch = useDispatch();
    const toast = useToast();

    useEffect(() => {
        setProfilePicture(newStaff?.user?.photo);
        setFirstName(newStaff?.user?.first_name);
        setLastName(newStaff?.user?.last_name);
        setEmail(newStaff?.user?.email);
        setRole(newStaff?.user?.role);
        setCountry(newStaff?.user?.country);
    }, [newStaff?.user?.first_name]);

    // const handleSelect = () => {
    //     const teamId = currentTeam?.id;
    //     const clubId = user?.clubs[0]?.id;
    //
    //     const payload = {
    //         photo: s3URL,
    //         id: newStaff?.user?.id,
    //         first_name: firstName,
    //         last_name: lastName,
    //         role: designation,
    //         email: email
    //     };
    //     console.log('pre submit payload', payload);
    //     dispatch(updateStaff(payload, teamId, clubId, toast, onClose, setSelected));
    // };
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useEffect(async () => {
        const country = await fetchCountries();
        setCountries(country);
    }, []);

    const onSubmit = (value: any) => {
        const teamId = currentTeam?.id || null;
        const clubId = user?.clubs[0]?.id;

        const payload = {
            id: newStaff.id,
            photo: profilePicture,
            first_name: value.firstName,
            last_name: value.lastName,
            role: value.role,
            // club_id: user?.clubs[0]?.id,
            email: value.email,
            country: value.country,
            team_id: teamId
        };
        console.log('pre submit payload', payload);
        dispatch(
            uploadPictureAndUpdateStaff(
                payload,
                profilePicture,
                teamId,
                clubId,
                toast,
                onClose,
                setSelected
            )
        );
    };
    return (
        <>
            <Modal isCentered size={'xl'} isOpen={isOpen} onClose={() => onClose(false)}>
                <ModalOverlay />
                <ModalContent
                    px={'43px'}
                    pt={'20px'}
                    pb={'40px'}
                    w="auto"
                    h="auto"
                    bg="white"
                    color="black2"
                    borderRadius="3xl">
                    <ModalHeader py={8} textAlign="center" fontSize="40px" fontWeight="700">
                        Edit staff
                        <Text fontSize="16px" color="grey4" fontWeight={'400'}>
                            Fill in the details to send an invite to the staff
                        </Text>
                    </ModalHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <Center>
                                <VStack mb={'40px'} mt={2}>
                                    <ImageUpload
                                        defaultImage="/images/image/Avatar.png"
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
                                        <FormControl isInvalid={!!errors.firstName}>
                                            <FormLabel fontSize="sm" htmlFor="firstName">
                                                First name
                                            </FormLabel>
                                            <Input
                                                {...register('firstName', {
                                                    required: 'First name is required',
                                                    minLength: {
                                                        value: 2,
                                                        message: 'First name is too short'
                                                    }
                                                })}
                                                id="firstName"
                                                placeholder="John"
                                                focusBorderColor="purple"
                                                defaultValue={firstName}
                                                borderColor={'grey5'}
                                                size={'lg'}
                                                borderRadius={'6px'}
                                                _placeholder={{
                                                    opacity: 1,
                                                    color: 'grey4',
                                                    fontSize: '16px',
                                                    fontWeight: '400'
                                                }}
                                            />

                                            <FormErrorMessage>
                                                {errors.firstName && (
                                                    <Text
                                                        color={
                                                            'red'
                                                        }>{`${errors.firstName.message}`}</Text>
                                                )}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <FormControl isInvalid={!!errors.lastName}>
                                            <FormLabel htmlFor="lastName">Last name</FormLabel>
                                            <Input
                                                {...register('lastName', {
                                                    required: 'Last name is required',
                                                    minLength: {
                                                        value: 2,
                                                        message: 'Last Name is too short'
                                                    }
                                                })}
                                                id="lastname"
                                                placeholder="Doe"
                                                focusBorderColor="purple"
                                                defaultValue={lastName}
                                                borderColor={'grey5'}
                                                size={'lg'}
                                                borderRadius={'6px'}
                                                _placeholder={{
                                                    opacity: 1,
                                                    color: 'grey4',
                                                    fontSize: '16px',
                                                    fontWeight: '400'
                                                }}
                                            />
                                            <FormErrorMessage>
                                                {errors.lastName && (
                                                    <Text
                                                        color={
                                                            'red'
                                                        }>{`${errors.lastName.message}`}</Text>
                                                )}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </GridItem>
                                </HStack>
                                <HStack spacing={6} w="full">
                                    <GridItem w="full">
                                        <FormControl mb={5} isInvalid={!!errors.role}>
                                            <FormLabel htmlFor="position">Role</FormLabel>
                                            <Select
                                                {...register('role', {
                                                    required: 'Role is required'
                                                })}
                                                variant="outline"
                                                focusBorderColor="purple"
                                                defaultValue={role}
                                                borderColor={'grey5'}
                                                size={'lg'}
                                                borderRadius={'6px'}
                                                _placeholder={{
                                                    opacity: 1,
                                                    color: 'grey4',
                                                    fontSize: '16px',
                                                    fontWeight: '400'
                                                }}
                                                placeholder="Select role">
                                                <option value="staff">Staff</option>
                                                <option value="Coach">Coach</option>
                                            </Select>
                                            <FormErrorMessage>
                                                {errors.role && (
                                                    <Text
                                                        color={
                                                            'red'
                                                        }>{`${errors.role.message}`}</Text>
                                                )}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem w="full">
                                        <CountriesSelector
                                            errors={errors}
                                            country={country}
                                            useFormRegisterReturn={register('country', {
                                                required: 'Country is required',
                                                minLength: {
                                                    value: 3,
                                                    message: 'Country name is too short'
                                                }
                                            })}
                                            map={countries?.map((country: any) => (
                                                <option
                                                    key={country.id}
                                                    value={country.name.common}>
                                                    {country.name.common}
                                                </option>
                                            ))}
                                        />
                                    </GridItem>
                                </HStack>
                                <GridItem colSpan={1} w="full">
                                    <FormControl mb={5} isInvalid={!!errors.email}>
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <Input
                                            {...register('email', {
                                                required: 'Email is required'
                                            })}
                                            id="email"
                                            type="email"
                                            placeholder="example@gmail.com"
                                            focusBorderColor="purple"
                                            defaultValue={email}
                                            borderColor={'grey5'}
                                            size={'lg'}
                                            borderRadius={'6px'}
                                            _placeholder={{
                                                opacity: 1,
                                                color: 'grey4',
                                                fontSize: '16px',
                                                fontWeight: '400'
                                            }}
                                        />
                                        <FormErrorMessage>
                                            {errors.email && (
                                                <Text
                                                    color={'red'}>{`${errors.email.message}`}</Text>
                                            )}
                                        </FormErrorMessage>
                                    </FormControl>
                                </GridItem>
                            </VStack>
                        </ModalBody>

                        <ModalFooter w="100%">
                            <VStack spacing={4} w="100%" mb="12px">
                                <Button
                                    loadingText={'Updating staff'}
                                    isLoading={isLoading}
                                    type="submit"
                                    size={'lg'}
                                    w="full">
                                    Continue
                                </Button>
                            </VStack>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EditStaff;
