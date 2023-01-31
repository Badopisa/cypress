import {
    Flex,
    FormControl,
    Button,
    FormLabel,
    Input,
    FormErrorMessage,
    VStack,
    SimpleGrid,
    Text,
    InputGroup,
    InputRightElement,
    useToast,
    Img,
    HStack
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { coachRegistration } from '@/store/actions/authActions';
import { useRouter } from 'next/router';
import React from 'react';
import NavBar from '@/components/Layout/NavBar';

const Registration = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, touchedFields }
    } = useForm({ defaultValues: { email: '', password: '' } });

    const { isLoading } = useSelector((state: RootStateOrAny) => state.msg);
    const [show, setShow] = React.useState<boolean>(false);
    const handleClick = () => setShow(!show);
    const dispatch = useDispatch();
    const router = useRouter();
    const toast = useToast();

    const onSubmit = (value: any) => {
        const payload = {
            role: 'coach',
            email: value.email,
            password: value.password
        };
        dispatch(coachRegistration(payload, toast, router));
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
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        Let's get you started
                    </Text>
                    {/*</VStack>*/}
                    <SimpleGrid columns={1} rowGap={5} w="80%">
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                        color: 'inputText',
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

                            <FormControl isInvalid={!!errors.password} mb={'52px'}>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        {...register('password', {
                                            required: 'Password is required',
                                            minLength: {
                                                value: 8,
                                                message: 'At least 8+ characters'
                                            }
                                        })}
                                        id="password"
                                        placeholder="Enter your password"
                                        focusBorderColor="purple"
                                        type={show ? 'text' : 'password'}
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
                                            onClick={handleClick}>
                                            {!show ? (
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
                                    {errors.password && (
                                        <Text
                                            as={'span'}
                                            color={'red'}>{`${errors.password.message}`}</Text>
                                    )}
                                </FormErrorMessage>
                            </FormControl>
                            <Button
                                isLoading={isLoading}
                                disabled={!touchedFields.email || !touchedFields.password}
                                type="submit"
                                size="lg"
                                w="full">
                                Continue
                            </Button>
                        </form>
                        {/*<Text align={'center'}>*/}
                        {/*    Don&#39;t Have an Account?{' '}*/}
                        {/*    <Link href="/admin/ClubAdminRegistration" fontWeight="semibold">*/}
                        {/*        Get Started*/}
                        {/*    </Link>*/}
                        {/*</Text>*/}
                        <HStack w={'full'} justifyContent={'center'}>
                            <HStack onClick={() => router.back()} cursor={'pointer'}>
                                <Img alt="back" src="/images/icons/arrow-circle-left.svg" />
                                <Text>Go back</Text>
                            </HStack>
                        </HStack>
                    </SimpleGrid>
                </VStack>
            </Flex>
        </main>
    );
};

export default Registration;
