import React, { useState } from 'react';
import { Box, Text, Button, List, ListItem, ListIcon } from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { usePaystackPayment } from 'react-paystack';
import PaymentModal from '@/components/Elements/Modal/PaymentModal';
import SuccessModal from '@/components/Elements/Modal/SuccessModal';
import { useRouter } from 'next/router';
import Swal from "sweetalert2";

type PlanCardType = {
    title: string;
    price: number;
    time: string;
    borderColor?: string;
    benefits: string[];
    hasFooter?: boolean;
    handleSubscription?: any;
};
const PlanCard = ({
    title,
    price,
    time,
    benefits,
    borderColor = 'grey5',
    hasFooter = true
}: PlanCardType) => {
    const [paymentLoading, setPaymentIsLoading] = useState<boolean>(false);
    const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
    const router = useRouter();
    const handleRedirection = () => {
        setPaymentSuccess(false);
        // router.push('/dashboard/club-management');
        Swal.fire({
            title: 'Success!',
            text: 'Password changed successfully!',
            icon: 'success',
            backdrop: false,
            confirmButtonColor: '#645EFD',
            confirmButtonText: 'Proceed to Registration',
            willClose: () => router.push('/login')
        });
    };
    const config = {
        reference: new Date().getTime().toString(),
        email: 'joajaiboye2016@gmail.com',
        amount: price * 100,

        publicKey:
            process.env.NEXT_PUBLIC_PAYSTACK_KEY ||
            'pk_test_abcf7cddf20eaf9fd8173413991e4762888afe11'
    };

    const handlePaystackSuccessAction = (reference: any) => {
        // Implementation for whatever you want to do with reference and after success call.
        console.log(reference);
        setPaymentIsLoading(true);

        setTimeout(() => {
            setPaymentIsLoading(false);
            // setPaymentSuccess(true);
            Swal.fire({
                title: 'Success!',
                text: 'Payment successful',
                icon: 'success',
                backdrop: false,
                confirmButtonColor: '#645EFD',
                confirmButtonText: 'Proceed to dashboard',
                willClose: () => router.push('/dashboard/club-management')
            });
        }, 2000);
    };

    // you can call this function anything
    const handlePaystackCloseAction = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed');
    };

    // const componentProps = {
    //     ...config,
    //     text: 'Choose plan and make payment',
    //     onSuccess: (reference: any) => handlePaystackSuccessAction(reference),
    //     onClose: handlePaystackCloseAction
    // };
    const PaystackHookExample = () => {
        const initializePayment = usePaystackPayment(config);
        return (
            <Box w="100%" pt={7}>
                <Button
                    size={'lg'}
                    onClick={() => {
                        initializePayment(handlePaystackSuccessAction, handlePaystackCloseAction);
                    }}
                    w="full"
                    variant="action">
                    Choose plan
                </Button>
                {/*<PaystackButton {...componentProps} />*/}
            </Box>
        );
    };
    return (
        <>
            <Box
                mb={4}
                borderWidth="1px"
                alignSelf={{ base: 'center', lg: 'flex-start' }}
                borderColor={borderColor}
                borderRadius={'xl'}>
                <Box position="relative" w={370}>
                    {borderColor === 'purple' && (
                        <Box
                            position={'absolute'}
                            w={'100%'}
                            h={'100%'}
                            bg={'primary'}
                            opacity={0.1}
                        />
                    )}
                    <Box py={5} px={8}>
                        <Text fontWeight="500" mb="3" fontSize="sm">
                            {title}
                        </Text>
                        <Text fontSize="70px" mb="8" fontWeight="600">
                            ${price}{' '}
                            <Text color={borderColor} fontSize={'20px'} as={'span'}>
                                / {time}
                            </Text>
                        </Text>
                        <List spacing={3} textAlign="start">
                            {benefits.map((benefit, index) => (
                                <ListItem key={index}>
                                    <ListIcon as={FaCheckCircle} color="primary" />
                                    {benefit}
                                </ListItem>
                            ))}
                        </List>
                        {hasFooter && PaystackHookExample()}
                    </Box>
                </Box>
            </Box>
            <PaymentModal isOpen={paymentLoading} onClose={() => setPaymentIsLoading(false)} />
            <SuccessModal
                isOpen={paymentSuccess}
                onClose={handleRedirection}
                selectedBenefits={benefits}
                selectedPrice={price}
                selectedTitle={title}
                selectedTime={time}
            />
        </>
    );
};

export default PlanCard;
