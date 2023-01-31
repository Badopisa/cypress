import PaymentCard from '@/components/Elements/Card/PaymentCard';
import PaymentModal from '@/components/Elements/Modal/PaymentModal';
import SuccessModal from '@/components/Elements/Modal/SuccessModal';
import {Box, Flex, HStack, Spacer, Text, useRadio, useRadioGroup, VStack} from '@chakra-ui/react';
import {FormImage, FormDetails} from '../../components/Form/index';
import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {PaystackButton} from 'react-paystack';
import NavBar from "@/components/Layout/NavBar";
import AvatarIcon from "@/assets/avatarIcon";

const PaymentMethod = () => {
    const [paymentLoading, setPaymentIsLoading] = useState<boolean>(false);
    const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

    const router = useRouter();

    const query: any = router.query;

    const benefits: any = query.benefits?.toString();

    const config = {
        reference: new Date().getTime().toString(),
        email: 'joajaiboye2016@gmail.com',
        amount: Number(`${query.price}`) * 100,

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
            setPaymentSuccess(true);
        }, 2000);
    };

    // you can call this function anything
    const handlePaystackCloseAction = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed');
    };

    const componentProps = {
        ...config,
        text: 'MAKE YOUR PAYMENT',
        onSuccess: (reference: any) => handlePaystackSuccessAction(reference),
        onClose: handlePaystackCloseAction
    };

    const option = ['Mastercard', 'Visa', 'Paypal'];

    const image = [
        '/images/image/mastercard.png',
        '/images/image/paypal.png',
        '/images/image/visa.png'
    ];

    const {getRootProps, getRadioProps} = useRadioGroup({
        name: 'framework',
        defaultValue: 'react',
        onChange: console.log
    });
    console.log(getRootProps);

    // const handleButtonClick = () => {
    //     setPaymentIsLoading(true);
    //
    //     setTimeout(() => {
    //         setPaymentIsLoading(false);
    //         setPaymentSuccess(true);
    //     }, 2000);
    // };

    const handleRedirection = () => {
        setPaymentSuccess(false);
        router.push('/dashboard/club-management');
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
                    hasFormFooter={false}
                    // buttonText='MAKE YOUR PAYMENT'
                    // coloredTitle="Choose"
                    title="Choose payment method"
                    // subtitle="Please fill in the following details to bring your dream to life"
                    // hasArror={true}
                    // hasOtherLinks={false}
                    // handleButtonClick={handleButtonClick}
                    hasFooter={false}>
                    <>
                        <HStack spacing="24px" mb="32px">
                            {option.map((value, index) => {
                                const radio = getRadioProps({value});
                                return (
                                    <PaymentCard
                                        key={value}
                                        picture={image[index]}
                                        value={value}
                                        radio={radio}
                                    />
                                );
                            })}
                        </HStack>
                        <PaystackButton {...componentProps} />
                    </>
                </FormDetails>
                <PaymentModal isOpen={paymentLoading} onClose={() => setPaymentIsLoading(false)} />
                <SuccessModal
                    isOpen={paymentSuccess}
                    onClose={handleRedirection}
                    selectedBenefits={benefits?.split(',')}
                    selectedPrice={Number(query.price)}
                    selectedTitle={query.title?.toString()}
                    selectedTime={query.time?.toString()}
                />
            </Flex>
        </>
    );
};

function RadioCard(props: any) {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input: any = getInputProps();
    const checkbox = getCheckboxProps();

    return (
        <Box as="label">
            <input {...input} />
            <VStack
                {...checkbox}
                w={'310px'}
                h={'256px'}
                mb={'40px'}
                alignItems={'flex-start'}
                cursor="pointer"
                borderWidth="1px"
                position="relative"
                borderRadius="8px"
                borderColor={'grey5'}
                _checked={{
                    bg: 'white',
                    borderWidth: '3px',
                    borderColor: 'slateBlue'
                }}
                px={'42px'}
                py={'42px'}>
                {input?.checked && (
                    <Box position={'absolute'} top={0} left={0} w={'100%'} h={'100%'} bg={'primary'} opacity={0.1} />
                )}
                <Box
                    {...checkbox}
                    w={'20px'}
                    h={'20px'}
                    _checked={{
                        bg: 'slateBlue'
                    }}
                    borderRadius="100%"
                    background={'grey6'}
                    borderColor={'grey5'}
                    position="absolute"
                    top={'20px'}
                    right={'20px'}
                />
                <AvatarIcon size={'25px'} stroke={input?.checked ? 'slateBlue' : ''} />
                <Spacer h={'22px'} />
                <Text fontSize={'20px'}>{props?.title}</Text>
                <Spacer h={'20px'} />
                <Text w={'110%'} color={'grey3'} fontSize={'16px'}>
                    {props?.subtitle}
                </Text>
            </VStack>
        </Box>
    );
}
export default PaymentMethod;
