import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    VStack,
    Center,
    Spinner,
    Text
} from '@chakra-ui/react';

const PaymentModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent w="xs" h="auto" bg="black" color="white" py={{ base: 4, md: 8 }}>
                <Center my={6}>
                    {' '}
                    <Spinner
                        thickness="4px"
                        speed="0.95s"
                        emptyColor="black"
                        color="primary"
                        size="xl"
                    />
                </Center>
                <ModalHeader p="16px 24px 4px" textAlign="center" fontSize="lg">
                    You are being redirected
                </ModalHeader>
                <ModalBody textAlign="center">
                    <Text>Sonalysis is redirecting you to another window to make your payment</Text>
                </ModalBody>

                <ModalFooter w="100%">
                    <VStack spacing={6} w="100%">
                        <Button bg="primary" _hover={{ bg: 'primary' }} w="full">
                            CONTINUE
                        </Button>
                        <Button bg="black" _hover={{ bg: 'primary' }} onClick={onClose} w="full">
                            CANCEL
                        </Button>
                    </VStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default PaymentModal;
