import React, { ReactElement } from 'react';
import {
    VStack,
    chakra,
    Text,
    SimpleGrid,
    GridItem,
    Button,
    Stack,
    HStack,
    Img,
    Box
} from '@chakra-ui/react';
import Link from '@/components/Elements/Link/Link';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/router';

type FormDetailsType = {
    children: ReactElement;
    title: string;
    disableButton: boolean;
    buttonText?: string;
    hasFormFooter?: boolean;
    hasAccount?: boolean;
    mt?: string;
    subtitle?: string;
    hasFooter?: boolean;
    hasOtherLinks?: boolean;
    loading?: boolean;
    handleButtonClick?: () => void;
};

const FormDetails = ({
    children,
    title,
    buttonText,
    subtitle,
    disableButton = false,
    hasFooter = true,
    handleButtonClick,
    loading = false
}: FormDetailsType) => {
    const router = useRouter();
    return (
        <VStack justifyContent={'center'} alignItems={'center'} w={{ base: 'full', md: 'lg' }}>
            <VStack alignItems={'center'} mb={'40px'}>
                <Text fontSize={{ base: '20px', md: '40px' }} fontWeight="700">
                    {title}
                </Text>
                <Text color={'grey3'} fontSize={{ base: '8px', md: '16px' }} fontWeight="400">
                    {subtitle}
                </Text>
            </VStack>
            <SimpleGrid columns={1} rowGap={5} w="80%">
                {children}
                {hasFooter && (
                    <>
                        <GridItem colSpan={1}>
                            <Button
                                onClick={() => (handleButtonClick ? handleButtonClick() : null)}
                                size="lg"
                                disabled={disableButton}
                                isLoading={loading}
                                mb={'20px'}
                                w="full">
                                {buttonText}
                            </Button>
                        </GridItem>
                        <Stack>
                            <HStack w={'full'} justifyContent={'center'}>
                                <HStack onClick={() => router.back()} cursor={'pointer'}>
                                    <Img alt="back" src="/images/icons/arrow-circle-left.svg" />
                                    <Text>Go back</Text>
                                </HStack>
                            </HStack>
                        </Stack>

                        {/*{hasOtherLinks && (*/}
                        {/*    <Stack>*/}
                        {/*        {hasAccount ? (*/}
                        {/*            <Text align={'center'}>*/}
                        {/*                Already have an account?{' '}*/}
                        {/*                <Link href="/login" fontWeight="semibold">*/}
                        {/*                    Login*/}
                        {/*                </Link>*/}
                        {/*            </Text>*/}
                        {/*        ) : (*/}
                        {/*            <Text align={'center'}>*/}
                        {/*                Do Not Have an Account?{' '}*/}
                        {/*                <Link href="/admin/registration" fontWeight="semibold">*/}
                        {/*                    Get Started*/}
                        {/*                </Link>*/}
                        {/*            </Text>*/}
                        {/*        )}*/}
                        {/*    </Stack>*/}
                        {/*)}*/}

                        {/*{hasFormFooter && (*/}
                        {/*    <Stack>*/}
                        {/*        <Text align={'center'}>*/}
                        {/*            <Link href="/forgot-password">*/}
                        {/*                {' '}*/}
                        {/*                <Text fontWeight="semibold">Forgot Password</Text>*/}
                        {/*            </Link>*/}
                        {/*        </Text>*/}
                        {/*    </Stack>*/}
                        {/*)}*/}
                    </>
                )}
            </SimpleGrid>
        </VStack>
    );
};

export default FormDetails;
