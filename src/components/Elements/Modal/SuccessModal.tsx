import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Image,
	VStack,
	Text,
	Center,
} from '@chakra-ui/react';
import PlanCard from '@/components/Elements/Card/PlanCard';
import { PlanData } from '@/data/PlanData';

const SuccessModal = ({isOpen, onClose}: {isOpen: boolean, onClose: () => void}) => {
    const {yearly} = PlanData
    return (
        <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent w="xs" h="auto" bg="grey" color='white'>
            <Center >
                <Image src="/images/image/confirmation.png" alt="confirmation" />
            </Center>
            <ModalHeader px={{base:4, md:4}} textAlign="center" fontSize="md">
                Subscription Successfull
            </ModalHeader>
            <ModalBody>
                <Text mb={10} textAlign="center">You can cancel this plan anytime</Text>
                <PlanCard hasFooter={false} title='BASIC' benefits={yearly.basic.benefits}  price={yearly.basic.price} time='month'/>
            </ModalBody>
            <ModalFooter w="full">
                <VStack spacing={6} w="full">
                    <Button bg="primary" _hover={{ bg: 'primary' }} w="full" onClick={onClose}>
                        GO TO CLUB MANAGEMENT
                    </Button>

                </VStack>
            </ModalFooter>
        </ModalContent>
    </Modal>
    )
}

export default SuccessModal
