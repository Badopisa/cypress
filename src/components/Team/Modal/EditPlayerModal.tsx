import {
  Button,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  Divider,
} from '@chakra-ui/react';
import { MdMode, MdDelete, MdShare } from 'react-icons/md';

import React, { useState } from 'react';
import EditPlayerDetails from './EditPlayerDetails';
import Confirmation from './Confirmation';

type ManagePlayerType = {
  isOpen: boolean;
  onClose: () => void;
};

const ManagePlayerModal = ({ isOpen, onClose }: ManagePlayerType) => {
  const [editPlayer, setEditPlayer] = useState<boolean>(false);
  const [select, setSelected] = useState<boolean>(false);

  const handleEditPlayer = () => {
    setEditPlayer(true);
  };
  const handleSharePlayer = () => {
    console.log('sharing');
  };
  const handleDeletePlayer = () => {
    console.log('delete');
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          w='xs'
          py={5}
          h='auto'
          bg='ash'
          color='white'
          rounded='1.125rem'
        >
          <VStack alignItems={'flex-start'}>
            <Button
              variant={'bare'}
              leftIcon={<MdMode color='white' />}
              onClick={handleEditPlayer}
              px={8}
            >
              Edit Player
            </Button>
            <Divider color='primary' />
            <Button
              variant={'bare'}
              leftIcon={<MdShare color='white' />}
              onClick={handleSharePlayer}
              px={8}
            >
              Share Player
            </Button>
            <Divider color='primary' orientation='horizontal' />{' '}
            <Button
              variant={'bare'}
              leftIcon={<MdDelete color='white' />}
              onClick={handleDeletePlayer}
              px={8}
            >
              Remove Player
            </Button>
            <Divider color='primary' orientation='horizontal' />{' '}
            <Button variant={'bare'} onClick={onClose} px={12}>
              Close
            </Button>
            <Divider color='primary' orientation='horizontal' />
          </VStack>
        </ModalContent>
      </Modal>
      <EditPlayerDetails
        isOpen={editPlayer}
        onClose={setEditPlayer}
        setSelected={setSelected}
      />
      <Confirmation
        jersyPng={'/images/imgs/success.svg'}
        isOpen={select}
        onClose={setSelected}
        body={'Sonalysis will notify this player of the changes made'}
        title='Changes Saved'
        buttonTitle={'OKAY, THANK YOU'}
      />
    </>
  );
};

export default ManagePlayerModal;
