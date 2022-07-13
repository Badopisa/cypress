import Confirmation from '@/components/Team/Modal/Confirmation';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    VStack
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEyeInvisible } from 'react-icons/ai';

const Security = () => {
    const [select, setSelected] = useState<boolean>(false);

    const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

    const handleShowOldPassword = () => setShowOldPassword(!showOldPassword);
    const handleShowNewPassword = () => setShowNewPassword(!showNewPassword);

    const {
        register,
        formState: { errors }
    } = useForm();
    return (
        <>
            <VStack w={{ base: '100%', md: '40%' }} align={'left'}>
                <Text mb={6} fontWeight={'bold'}>
                    Change Password
                </Text>
                <form>
                    <FormControl mb={6} isInvalid={!!errors.password}>
                        <FormLabel color="#C9D0CD" fontSize="14px" htmlFor="password">
                            OLD PASSWORD
                        </FormLabel>
                        <InputGroup>
                            <Input
                                focusBorderColor="#811AFF"
                                {...register('oldPassword', {
                                    required: 'Old Password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters long'
                                    }
                                })}
                                id="oldPassword"
                                type={showOldPassword ? 'text' : 'password'}
                                placeholder="At least 8+ characters"
                            />
                            <InputRightElement>
                                <Button
                                    mr="10px"
                                    padding={0}
                                    background="transparent"
                                    onClick={handleShowOldPassword}>
                                    <AiFillEyeInvisible color="green.500" />
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                            {errors.password && <span>{`${errors.password.message}`}</span>}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl mb={6} isInvalid={!!errors.password}>
                        <FormLabel color="#C9D0CD" fontSize="14px" htmlFor="password">
                            NEW PASSWORD
                        </FormLabel>
                        <InputGroup>
                            <Input
                                focusBorderColor="#811AFF"
                                {...register('newPassword', {
                                    required: 'New Password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters long'
                                    }
                                })}
                                id="newPassword"
                                type={showNewPassword ? 'text' : 'password'}
                                placeholder="At least 8+ characters"
                            />
                            <InputRightElement>
                                <Button
                                    mr="10px"
                                    padding={0}
                                    background="transparent"
                                    onClick={handleShowNewPassword}>
                                    <AiFillEyeInvisible color="green.500" />
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                            {errors.password && <span>{`${errors.password.message}`}</span>}
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
                        CHANGE PASSWORD
                    </Button>
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

export default Security;
