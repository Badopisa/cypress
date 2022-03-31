import PaymentCard from '@/components/Elements/Card/PaymentCard';
import PaymentModal from '@/components/Elements/Modal/PaymentModal';
import SuccessModal from '@/components/Elements/Modal/SuccessModal';
import {
	Flex,
	HStack,
	useRadioGroup,
	useDisclosure
} from '@chakra-ui/react';
import { FormImage, FormDetails } from '../../components/Form/index';
import {useState} from 'react'
import { useRouter } from 'next/router';




const PaymentMethod = () => {
	
    const [paymentLoading, setPaymentIsLoading]= useState<boolean>(false);
    const [paymentSuccess, setPaymentSuccess]= useState<boolean>(false);
	const router = useRouter()

	const options = [
		{
			name: 'MasterCard',
			picture: "/images/image/mastercard.png"
		},
		{
			name: 'PayPal',
			picture: "/images/image/paypal.png"
		},
		{
			name: 'Visa',
			picture: "/images/image/visa.png"
		}
	];

	const option = [ 'Mastercard', 'Visa', 'Paypal' ];

	const image = [ "/images/image/mastercard.png", "/images/image/paypal.png", "/images/image/visa.png" ];

	const { getRootProps, getRadioProps } = useRadioGroup({
		name: 'framework',
		defaultValue: 'react',
		onChange: console.log
	});

	const handleButtonClick = () => {
		setPaymentIsLoading(true)

		setTimeout(()=>{
			setPaymentIsLoading(false)
			setPaymentSuccess(true)
		}, 2000)
	}

	const handleRedirection = () => {
		setPaymentSuccess(false)
		router.push('/dashboard/club-management')
	}

	return (
		<Flex h="100vh" direction={{ base: 'column-reverse', md: 'row' }}>

			<FormImage
				image="/images/image/hero-bg.jpg"
				title="Club Admin Platform"
				body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut purus rhoncus lectus."
			/>

			<FormDetails
				hasFormFooter={false}
				buttonText="MAKE YOUR PAYMENT"
				coloredTitle="Choose"
				title="Payment method"
				subTitle="Please fill in the following details to bring your dream to life"
                hasArror={true}
				hasOtherLinks={false}
				handleButtonClick={handleButtonClick}
			>
				<HStack spacing="24px" mb="32px" >
					{option.map((value, index) => {
						const radio = getRadioProps({ value });
						return (
							<PaymentCard key={value} picture={image[index]} value={value} radio={radio}/>
						);
					})}
				</HStack>
			</FormDetails>
            <PaymentModal isOpen={paymentLoading} onClose={()=>setPaymentIsLoading(false)}/>
            <SuccessModal isOpen={paymentSuccess} onClose={handleRedirection}/>

		</Flex>
	);
};

export default PaymentMethod;
