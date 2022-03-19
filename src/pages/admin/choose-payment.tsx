import PaymentCard from '@/components/Elements/Card/PaymentCard';
import PaymentModal from '@/components/Elements/Modal/PaymentModal';
import SuccessModal from '@/components/Elements/Modal/SuccessModal';
import {
	Flex,
	HStack,
	Button,
	useRadioGroup,
	useDisclosure
} from '@chakra-ui/react';
import { FormImage, FormDetails } from '../../components/Form/index';

// import SuccessfullCard from '../../components/Payment/Success';




const PaymentMethod = () => {
	
    const { isOpen, onOpen, onClose } = useDisclosure();

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
			>
				<HStack spacing="24px" mb="32px">
					{option.map((value, index) => {
						const radio = getRadioProps({ value });
						return (
							<PaymentCard key={value} picture={image[index]} value={value} radio={radio}/>
						);
					})}
				</HStack>
			</FormDetails>
            <PaymentModal isOpen={false} onClose={onClose}/>
            <SuccessModal isOpen={true} onClose={onClose}/>

		</Flex>
	);
};

export default PaymentMethod;
