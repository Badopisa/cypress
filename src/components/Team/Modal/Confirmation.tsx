import {
    Text,
    Button,
    Center,
    VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    Image
} from '@chakra-ui/react';

type ConfirmationType = {
    jersyPng: string;

    isOpen: boolean;
    onClose: any;
    playerName?: string;
    body?: string;
    title?: string;
    buttonTitle?: string;
};

const Confirmation = ({
    isOpen,
    onClose,
    playerName,
    body = 'You are about to move this player from their current team',
    title,
    buttonTitle = 'CONTINUE'
}: ConfirmationType) => {
    return (
        <Modal isOpen={isOpen} onClose={() => onClose(false)}>
            <ModalOverlay />
            <ModalContent w="xs" py={5} h="auto" bg="ash" color="white" rounded="1.125rem">
                <ModalBody>
                    <Center>
                        <VStack>
                            <Image
                                w={'40'}
                                src="/images/image/confirmation.gif"
                                alt="confirmation"
                            />

                            <Text fontSize="lg" fontWeight="semibold" color="white">
                                {playerName}
                            </Text>
                            {title && (
                                <Text
                                    fontSize="sm"
                                    fontWeight="medium"
                                    color="white"
                                    mt={0}
                                    display={'flex'}>
                                    {title}
                                </Text>
                            )}
                            <Text w="70%" align="center" fontSize="sm" fontWeight="medium" pt={2}>
                                {body}
                            </Text>
                        </VStack>
                    </Center>
                </ModalBody>

                <ModalFooter w="full">
                    <VStack w="full" py={{ base: 4, md: 4 }}>
                        <Button variant="action" w="full" onClick={() => onClose(false)}>
                            {buttonTitle}
                        </Button>
                    </VStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default Confirmation;
