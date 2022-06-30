import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
import React, { useEffect } from 'react';
import {
    Text,
    Box,
    HStack,
    Avatar,
    VStack,
    Stack,
    FormControl,
    GridItem,
    FormLabel,
    Input,
    FormErrorMessage,
    Select,
    Button,
    Link,
    useToast
} from '@chakra-ui/react';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import { useRouter } from 'next/router';
import Steps from '@/components/Team/Steps';
import ImageUpload from '@/components/Elements/ImageUpload';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { createTeam } from '@/store/actions/teamActions';
import { UserDataType } from '@/types/AuthDataType';
import { CategoryDataType } from '@/types/CategoryDataType';
import { fetchCategories } from '@/store/actions/ categoryAction';
import useUploadToS3 from '@/hooks/useUploadToS3';

const CreateTeam = () => {
    const [profilePicture, setProfilePicture] = React.useState<null | File>(null);
    const { file } = useSelector((state: RootStateOrAny) => state.auth);
    const { isLoading } = useSelector((state: RootStateOrAny) => state.msg);
    const { user }: { user: UserDataType } = useSelector((state: RootStateOrAny) => state.auth);
    const { category }: { category: CategoryDataType[] } = useSelector(
        (state: RootStateOrAny) => state.category
    );
    const { s3Error } = useUploadToS3(file);
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
    }, []);

    const onSubmit = async (values: any) => {
        if (s3Error) {
            toast({
                title: 'Upload Error',
                description: s3Error,
                status: 'error',
                duration: 9000,
                isClosable: true
            });
            return;
        }

        const club_id = user?.clubs[0]?.id;
        const payload = {
            // photo: s3URL,
            photo: '',
            club_id,
            category_id: values.category,
            name: values.name
        };
        dispatch(createTeam(payload, toast, router));
    };

    return (
        <>
            <DashboardDesktopNav hasArrow />
            <Box color="white" py={{ base: 12, md: 12 }} px={{ base: 4, md: 8 }}>
                <Text fontSize="3xl" fontWeight="medium">
                    Create Team
                </Text>
                <Steps current={1} />
            </Box>
            <Box color="white" px={{ base: 4, md: 8 }}>
                <Stack spacing={24} direction={{ base: 'column', md: 'row' }}>
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
                        <VStack spacing={10}>
                            <HStack spacing={8}>
                                <GridItem>
                                    <FormControl>
                                        <FormLabel htmlFor="name">TEAM NAME</FormLabel>
                                        <Input
                                            {...register('name', {
                                                required: 'Team name is required',
                                                minLength: {
                                                    value: 4,
                                                    message: 'Team name is Required'
                                                }
                                            })}
                                            id="name"
                                            type="text"
                                            placeholder="eg.TeamFC"
                                        />
                                        <FormErrorMessage>
                                            {errors.name && 'Team name is Required'}
                                        </FormErrorMessage>
                                    </FormControl>
                                </GridItem>
                                <GridItem>
                                    <FormControl>
                                        <FormLabel htmlFor="abbrv">ABBREVIATION</FormLabel>
                                        <Input
                                            {...register('abbrv', {
                                                required: 'Abreviation is required',
                                                minLength: {
                                                    value: 4,
                                                    message: 'Abreviation is Required'
                                                }
                                            })}
                                            id="abbrv"
                                            type="text"
                                            placeholder="eg.ClubFC"
                                        />
                                        <FormErrorMessage>
                                            {errors.abbrv && 'Abbreviation is Required'}
                                        </FormErrorMessage>
                                    </FormControl>
                                </GridItem>
                            </HStack>
                            <GridItem colSpan={2} w="full">
                                <FormControl mb={5}>
                                    <FormLabel htmlFor="category">Category</FormLabel>
                                    <Select
                                        {...register('category', {
                                            required: 'Category is required',
                                            minLength: { value: 5, message: 'Category is Required' }
                                        })}
                                        variant="outline"
                                        placeholder="Select Category">
                                        {category.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </Select>
                                    <FormErrorMessage>
                                        {errors.category && 'Category is required'}
                                    </FormErrorMessage>
                                </FormControl>
                            </GridItem>
                            <Button
                                type="submit"
                                isLoading={isLoading}
                                variant="action"
                                w="full"
                                fontSize="sm"
                                fontWeight="normal">
                                NEXT
                            </Button>
                        </VStack>
                    </form>
                </Stack>
            </Box>
        </>
    );
};

export default authenticatedRoute(CreateTeam);
