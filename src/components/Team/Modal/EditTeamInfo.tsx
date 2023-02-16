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
    FormLabel,
    Input,
    Select,
    FormControl,
    Text,
    FormErrorMessage,
    Box,
    useToast
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Confirmation from './Confirmation';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { fetchCategories } from '@/store/actions/ categoryAction';
import { uploadPictureAndCreateTeam } from '@/store/actions/teamActions';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { UserDataType } from '@/types/AuthDataType';
import { CategoryDataType } from '@/types/CategoryDataType';

type EditTeamInfoType = {
    isOpen: boolean;
    onClose: any;
    //   setSelected: (value: boolean) => void;
};

const EditTeamInfo = ({ isOpen, onClose }: EditTeamInfoType) => {
    const [confirm, setConfirm] = useState<boolean>(false);
    const [profilePicture, setProfilePicture] = React.useState<null | File>(null);
    const { isLoading } = useSelector((state: RootStateOrAny) => state.msg);
    const { user }: { user: UserDataType } = useSelector((state: RootStateOrAny) => state.auth);
    const { category }: { category: CategoryDataType[] } = useSelector(
        (state: RootStateOrAny) => state.category
    );
    const dispatch = useDispatch();
    const toast = useToast();
    const router = useRouter();
    const handleSelect = () => {
        setConfirm(true);
    };
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        if (category.length < 1) {
            dispatch(fetchCategories());
        }
    }, [category.length, dispatch]);

    const onSubmit = async (values: any) => {
        const club_id = user?.clubs[0]?.id;
        const payload = {
            photo: '',
            club_id,
            location: values.location,
            category_id: values.category,
            team_name: values.name
        };
        dispatch(uploadPictureAndCreateTeam(payload, profilePicture, toast, router));
    };
    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={() => onClose(false)}>
                <ModalOverlay />
                <ModalContent px={6} w="auto" h="auto" bg="white" color="black2" borderRadius="3xl">
                    <ModalHeader py={8} textAlign="center" fontSize="lg" fontWeight="bold">
                        Edit team info
                    </ModalHeader>
                    <ModalBody>
                        <Center>
                            <VStack mb={6} mt={2}>
                                <ImageUpload
                                    defaultImage="/icons/team-icon.svg"
                                    w="100px"
                                    h="100px"
                                    rounded="full"
                                    setSelectedImage={setProfilePicture}
                                    selectedImage={profilePicture}
                                />
                            </VStack>
                        </Center>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <VStack w={'100%'}>
                                <VStack w={'100%'}>
                                    <FormControl isInvalid={!!errors.name}>
                                        <FormLabel mb={'8px'} htmlFor="name">
                                            Team name
                                        </FormLabel>
                                        <Input
                                            {...register('name', {
                                                required: 'Team name is required',
                                                minLength: {
                                                    value: 2,
                                                    message: 'Team name is too short'
                                                }
                                            })}
                                            id="name"
                                            type="text"
                                            placeholder="eg.TeamFC"
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
                                            {errors.name && (
                                                <Text
                                                    color={'red'}>{`${errors.name.message}`}</Text>
                                            )}
                                        </FormErrorMessage>
                                        <Box h={'20px'} />
                                    </FormControl>
                                    <FormControl mb={'20px'} isInvalid={!!errors.abbrv}>
                                        <FormLabel mb={'8px'} htmlFor="abbrv">
                                            Name abbreviation
                                        </FormLabel>
                                        <Input
                                            {...register('abbrv', {
                                                required: 'Abbreviation is required',
                                                minLength: {
                                                    value: 2,
                                                    message: 'Abbreviation is too short'
                                                }
                                            })}
                                            id="abbrv"
                                            type="text"
                                            placeholder="eg.TeamFC"
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
                                            {errors.abbrv && (
                                                <Text
                                                    color={'red'}>{`${errors.abbrv.message}`}</Text>
                                            )}
                                        </FormErrorMessage>
                                        <Box h={'20px'} />
                                    </FormControl>
                                </VStack>
                                <FormControl mb={'20px'} isInvalid={!!errors.category}>
                                    <FormLabel mb={'8px'} htmlFor="category">
                                        Team category
                                    </FormLabel>
                                    <Select
                                        {...register('category', {
                                            required: 'Category is required',
                                            minLength: { value: 5, message: 'Category is Required' }
                                        })}
                                        variant="outline"
                                        placeholder="Select Category"
                                        focusBorderColor="purple"
                                        borderColor={'grey5'}
                                        size={'lg'}
                                        borderRadius={'6px'}
                                        _placeholder={{
                                            opacity: 1,
                                            color: 'inputText',
                                            fontSize: '16px',
                                            fontWeight: '400'
                                        }}>
                                        {category.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </Select>
                                    <FormErrorMessage>
                                        {errors.category && (
                                            <Text
                                                color={'red'}>{`${errors.category.message}`}</Text>
                                        )}
                                    </FormErrorMessage>
                                    <Box h={'20px'} />
                                </FormControl>
                                <FormControl mb={'20px'} isInvalid={!!errors.location}>
                                    <FormLabel mb={'8px'} htmlFor="location">
                                        Location
                                    </FormLabel>
                                    <Input
                                        {...register('location', {
                                            required: 'Location is required',
                                            minLength: {
                                                value: 2,
                                                message: 'Abbreviation is too short'
                                            }
                                        })}
                                        id="location"
                                        type="text"
                                        placeholder="eg.London"
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
                                        {errors.location && (
                                            <Text
                                                color={'red'}>{`${errors.location.message}`}</Text>
                                        )}
                                    </FormErrorMessage>
                                    <Box h={'20px'} />
                                </FormControl>
                                <Button
                                    type="submit"
                                    isLoading={isLoading}
                                    variant="action"
                                    w="full"
                                    size={'lg'}
                                    fontWeight="normal">
                                    Continue
                                </Button>
                                <Box h={'40px'} />
                            </VStack>
                        </form>
                    </ModalBody>

                    <ModalFooter w="100%">
                        <VStack spacing={4} w="100%" mb="12px">
                            <Button variant="action" w="full" onClick={handleSelect}>
                                Save Changes
                            </Button>
                            <Center>
                                <Text w="full" onClick={() => onClose(false)} cursor="pointer">
                                    BACK
                                </Text>
                            </Center>
                        </VStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Confirmation
                jersyPng={'/images/imgs/success.svg'}
                isOpen={confirm}
                onClose={setConfirm}
                body={'Sonalysis will notify this Team of the changes made'}
                title="Changes Saved"
                buttonTitle={'OKAY, THANK YOU'}
            />
        </>
    );
};

export default EditTeamInfo;
