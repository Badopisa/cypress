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
    Text,
    useToast
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { UserDataType } from '@/types/AuthDataType';
import Confirmation from './Confirmation';
import {
    createAndAddStaffToTeam,
    uploadPictureAndCreateAndAddStaffToTeam
} from '@/store/actions/staffActions';
import useUploadToS3 from '@/hooks/useUploadToS3';
import { CountriesSelector } from '@/components/Form/CountriesSelector';
import { fetchCountries } from '@/services/countriesService';

type NewStaffType = {
    isOpen: boolean;
    onClose: any;
    useCurrentTeamID?: boolean;
};

const NewStaff = ({ isOpen, onClose, useCurrentTeamID = true }: NewStaffType) => {
    const { isLoading } = useSelector((state: RootStateOrAny) => state.msg);
    const { user }: { user: UserDataType } = useSelector((state: RootStateOrAny) => state.auth);
    const { currentTeam }: { currentTeam: any } = useSelector(
        (state: RootStateOrAny) => state.team
    );
    const [profilePicture, setProfilePicture] = React.useState<any>(null);
    const [select, setSelected] = useState<boolean>(false);
    const [countries, setCountries] = useState<any>(null);

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm();

    const dispatch = useDispatch();
    const toast = useToast();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useEffect(async () => {
        const country = await fetchCountries();
        setCountries(country);
    }, []);

    const onSubmit = (value: any) => {
        const teamId = useCurrentTeamID ? currentTeam?.id : null;
        const clubId = user?.clubs[0]?.id;

        const payload = {
            photo: '',
            first_name: value.firstName,
            last_name: value.lastName,
            role: value.role,
            club_id: user?.clubs[0]?.id,
            email: value.email,
            country: value.country
        };
        console.log('pre submit payload', payload);
        dispatch(
            uploadPictureAndCreateAndAddStaffToTeam(
                payload,
                profilePicture,
                teamId,
                clubId,
                toast,
                onClose,
                setSelected,
                useCurrentTeamID
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
                        Add new staff
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
                                    loadingText={'Adding staff'}
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
            <Confirmation
                jersyPng={'/images/imgs/success.svg'}
                isOpen={select}
                onClose={setSelected}
                body={'Sonalysis will notify this staff of the changes made'}
                title="Changes saved"
                buttonTitle={'Okay, thank you'}
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
export default NewStaff;
