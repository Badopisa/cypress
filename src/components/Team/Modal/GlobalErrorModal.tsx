import {
  Modal,
  ModalOverlay,
  ModalContent,
  Image,
  Button,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

const GlobalErrorModal = ({
  isOpen,
  onClose,
  globalError,
}: {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  globalError: boolean;
}) => {
  const fullSize = '100vw';

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)} size={'full'}>
      <ModalOverlay />
      <ModalContent
        py={12}
        bg='grey'
        color='white'
        justifyContent={'center'}
        alignItems={'center'}
      >
        <VStack spacing={8}>
          <Image src={'/icons/error.svg'} alt='Error' />
          <Text fontSize={'xm'}>
            Ooops...it seems like an error has occurred
          </Text>
          <Button variant={'action'} onClick={() => onClose(globalError)}>
            TRY AGAIN
          </Button>
        </VStack>
      </ModalContent>
    </Modal>
  );
};

export default GlobalErrorModal;
