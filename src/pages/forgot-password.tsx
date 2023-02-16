import {
    Flex,
    FormControl,
    GridItem,
    FormLabel,
    Input,
    FormErrorMessage,
    Text,
    useToast
} from '@chakra-ui/react';
import { FormDetails } from '@/components/Form';
import React from 'react';
import { useForm } from 'react-hook-form';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import NavBar from '@/components/Layout/NavBar';
import { useRouter } from 'next/router';
import { forgotPassword } from '@/store/actions/authActions';

const ForgotPassword = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isDirty }
    } = useForm({ defaultValues: { email: '' } });

    const { isLoading } = useSelector((state: RootStateOrAny) => state.msg);
    const dispatch = useDispatch();
    const toast = useToast();
    const router = useRouter();

    const onSubmit = (value: any) => {
        const payload = {
            email: value.email
        };
        dispatch(forgotPassword(payload, toast, router));
    };

    return (
        <>
            <NavBar />
            <Flex
                direction={'column'}
                bg="white"
                color={'black'}
                minHeight="completeY"
                alignItems="center"
                justifyContent="center">
                <FormDetails
                    hasAccount={true}
                    buttonText="Continue"
                    title="Reset Your Password"
                    disableButton={!isDirty}
                    loading={isLoading}
                    handleButtonClick={handleSubmit(onSubmit)}>
                    <GridItem colSpan={1}>
                        <FormControl isInvalid={!!errors.email} mb={'32px'}>
                            <FormLabel mb={'10px'} htmlFor="email">
                                Email address
                            </FormLabel>
                            <Input
                                {...register('email', {
                                    required: 'Email is required'
                                })}
                                id="email"
                                type="email"
                                placeholder="Enter your email"
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
                                        as={'span'}
                                        color={'red'}>{`${errors.email.message}`}</Text>
                                )}
                            </FormErrorMessage>
                        </FormControl>
                    </GridItem>
                </FormDetails>
            </Flex>
        </>
    );
};

export default ForgotPassword;
