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
    Center
} from '@chakra-ui/react';
import PlanCard from '@/components/Elements/Card/PlanCard';

const SuccessModal = ({
    isOpen,
    onClose,
    selectedBenefits,
    selectedPrice,
    selectedTitle,
    selectedTime
}: {
    isOpen: boolean;
    onClose: () => void;
    selectedBenefits: string[];
    selectedPrice: number;
    selectedTitle: string;
    selectedTime: string;
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent w="xs" h="auto" bg="grey" color="white">
                <Center>
                    <Image w={'40'} src="/images/image/confirmation.gif" alt="confirmation" />
                </Center>
                <ModalHeader px={{ base: 4, md: 4 }} textAlign="center" fontSize="md">
                    Subscription Successfull
                </ModalHeader>
                <ModalBody>
                    <Text mb={10} textAlign="center">
                        You can cancel this plan anytime
                    </Text>
                    <PlanCard
                        hasFooter={false}
                        title={selectedTitle}
                        benefits={selectedBenefits}
                        price={selectedPrice}
                        time={selectedTime}
                    />
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
    );
};

export default SuccessModal;
