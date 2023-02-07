import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
import React, { useEffect } from 'react';
import {
    Text,
    Box,
    HStack,
    VStack,
    Stack,
    FormControl,
    GridItem,
    FormLabel,
    Input,
    FormErrorMessage,
    Select,
    Button,
    useToast
} from '@chakra-ui/react';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import { useRouter } from 'next/router';
import Steps from '@/components/Team/Steps';
import ImageUpload from '@/components/Elements/ImageUpload';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import {createTeam, uploadPictureAndCreateTeam} from '@/store/actions/teamActions';
import { UserDataType } from '@/types/AuthDataType';
import { CategoryDataType } from '@/types/CategoryDataType';
import { fetchCategories } from '@/store/actions/ categoryAction';
import useUploadToS3 from '@/hooks/useUploadToS3';
import useUploadToSpaces from '@/hooks/useUploadToSpaces';

const CreateTeam = () => {
    const [profilePicture, setProfilePicture] = React.useState<any>(null);
    const { isLoading } = useSelector((state: RootStateOrAny) => state.msg);
    const { user }: { user: UserDataType } = useSelector((state: RootStateOrAny) => state.auth);
    const { category }: { category: CategoryDataType[] } = useSelector(
        (state: RootStateOrAny) => state.category
    );
    const dispatch = useDispatch();
    const toast = useToast();

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm();

    const router = useRouter();

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
            <DashboardDesktopNav hasArrow />
            <Box color="black2" py={{ base: 12, md: 0 }} px={{ base: 4, md: 0 }}>
                <Text fontSize="40px" fontWeight="700">
                    Create new team
                </Text>
            </Box>
            <Box mx={'auto'} color="black2" w={{ base: 4, md: '400px' }}>
                <Box mx={'auto'} w={'320px'} mb={'38px'}>
                    <Steps current={1} />
                </Box>
                <VStack mb={'40px'}>
                    <ImageUpload
                        defaultImage="/images/image/defaultImage.svg"
                        w="100px"
                        h="100px"
                        rounded="full"
                        setSelectedImage={setProfilePicture}
                        selectedImage={profilePicture}
                    />
                </VStack>
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
                                        <Text color={'red'}>{`${errors.name.message}`}</Text>
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
                                        <Text color={'red'}>{`${errors.abbrv.message}`}</Text>
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
                                    <Text color={'red'}>{`${errors.category.message}`}</Text>
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
                                    <Text color={'red'}>{`${errors.location.message}`}</Text>
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
                    </VStack>
                </form>
                {/*</Stack>*/}
            </Box>
        </>
    );
};

export default authenticatedRoute(CreateTeam);
