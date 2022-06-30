import { Modal, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react';

const ModalLayout = ({ children }: { children: React.ReactNode }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [size, setSize] = React.useState('md');
    const handleSizeClick = (newSize: string) => {
        setSize(newSize);
        onOpen();
    };

    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'];

    return (
        <Modal onClose={onClose} size={size} isOpen={isOpen}>
            <ModalOverlay />
            {children}
        </Modal>
    );
};

export default ModalLayout;
