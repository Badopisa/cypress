import PaymentCard from '@/components/Elements/Card/PaymentCard';
import PaymentModal from '@/components/Elements/Modal/PaymentModal';
import SuccessModal from '@/components/Elements/Modal/SuccessModal';
import { Flex, HStack, useRadioGroup } from '@chakra-ui/react';
import { FormImage, FormDetails } from '../../components/Form/index';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { PaystackButton } from 'react-paystack';

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

    const { getRootProps, getRadioProps } = useRadioGroup({
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
        <Flex h="100vh" direction={{ base: 'column-reverse', md: 'row' }}>
            <FormImage
                image="/images/image/hero-bg.jpg"
                title="Club Admin Platform"
                body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut purus rhoncus lectus."
            />

            <FormDetails
                hasFormFooter={false}
                // buttonText='MAKE YOUR PAYMENT'
                coloredTitle="Choose"
                title="Payment method"
                subTitle="Please fill in the following details to bring your dream to life"
                hasArror={true}
                hasOtherLinks={false}
                // handleButtonClick={handleButtonClick}
                hasFooter={false}>
                <>
                    <HStack spacing="24px" mb="32px">
                        {option.map((value, index) => {
                            const radio = getRadioProps({ value });
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
    );
};

export default PaymentMethod;
