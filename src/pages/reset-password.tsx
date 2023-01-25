import {
    Flex,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    VStack,
    Text,
    SimpleGrid,
    InputGroup,
    InputRightElement,
    Button,
    useToast,
    Stack,
    HStack,
    Img
} from '@chakra-ui/react';
import React from 'react';
import NavBar from '@/components/Layout/NavBar';
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setNewPassword } from '@/store/actions/authActions';
import { updateAlertMsg } from '@/store/actions/msgAction';
import { UserDataType } from '@/types/AuthDataType';

const ResetPassword = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, touchedFields }
    } = useForm({ defaultValues: { newPassword: '', confirmPassword: '' } });

    const { isLoading } = useSelector((state: RootStateOrAny) => state.msg);
    const { user }: { user: UserDataType } = useSelector((state: RootStateOrAny) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();
    const toast = useToast();
    const [show1, setShow1] = React.useState<boolean>(false);
    const handleClick1 = () => setShow1(!show1);

    const [show2, setShow2] = React.useState<boolean>(false);
    const handleClick2 = () => setShow2(!show2);

    const onSubmit = (value: any) => {
        const payload = {
            newPassword: value.newPassword,
            confirmPassword: value.confirmPassword
        };
        if (value.newPassword !== value.confirmPassword) {
            return updateAlertMsg(toast, { type: 'error', message: 'Passwords do not match' });
        }

        dispatch(setNewPassword(payload, user?.id, toast, router, Swal));
    };
    return (
        <main>
            <NavBar />
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
                        Set new password
                    </Text>
                    {/*</VStack>*/}
                    <SimpleGrid columns={1} rowGap={5} w="80%">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl isInvalid={!!errors.newPassword} mb={'52px'}>
                                <FormLabel htmlFor="newPassword">New Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        {...register('newPassword', {
                                            required: 'Password is required',
                                            minLength: {
                                                value: 8,
                                                message: 'At least 8+ characters'
                                            }
                                        })}
                                        id="newPassword"
                                        type={show1 ? 'text' : 'password'}
                                        placeholder="Enter your new password"
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
                                    <InputRightElement>
                                        <Button
                                            mr="10px"
                                            padding={0}
                                            variant={'text'}
                                            onClick={handleClick1}>
                                            {!show1 ? (
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
                                    {errors.newPassword && (
                                        <Text
                                            as={'span'}
                                            color={'red'}>{`${errors.newPassword.message}`}</Text>
                                    )}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.confirmPassword} mb={'52px'}>
                                <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        {...register('confirmPassword', {
                                            required: 'Password is required',
                                            minLength: {
                                                value: 8,
                                                message: 'At least 8+ characters'
                                            }
                                        })}
                                        id="confirmPassword"
                                        type={show2 ? 'text' : 'password'}
                                        placeholder="Confirm your new password"
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
                                    <InputRightElement>
                                        <Button
                                            mr="10px"
                                            padding={0}
                                            variant={'text'}
                                            onClick={handleClick2}>
                                            {!show2 ? (
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
                                    {errors.confirmPassword && (
                                        <Text
                                            as={'span'}
                                            color={
                                                'red'
                                            }>{`${errors.confirmPassword.message}`}</Text>
                                    )}
                                </FormErrorMessage>
                            </FormControl>
                            <Button
                                isLoading={isLoading}
                                disabled={
                                    !touchedFields.newPassword || !touchedFields.confirmPassword
                                }
                                type="submit"
                                size="lg"
                                w="full">
                                Continue
                            </Button>
                        </form>
                        <Stack>
                            <HStack w={'full'} justifyContent={'center'}>
                                <HStack onClick={() => router.back()} cursor={'pointer'}>
                                    <Img alt="back" src="/images/icons/arrow-circle-left.svg" />
                                    <Text>Go back</Text>
                                </HStack>
                            </HStack>
                        </Stack>
                    </SimpleGrid>
                </VStack>
            </Flex>
        </main>
    );
};

export default ResetPassword;
