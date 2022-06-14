import {
  Button,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  Divider,
} from '@chakra-ui/react';
import {
  MdMode,
  MdDelete,
  MdShare,
  MdPeople,
  MdPersonAddAlt1,
} from 'react-icons/md';

import React, { useState } from 'react';
import EditPlayerDetails from './EditPlayerDetails';
import Confirmation from './Confirmation';

type ManagePlayerType = {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  setCreatePlayer?: (value: boolean) => void;
  setCreateExistingPlayer?: (value: boolean) => void;

  create?: string;
  existing?: string;
  edit?: string;
  share?: string;
  remove?: string;
};

const ManagePlayerModal = ({
  isOpen,
  onClose,
  create,
  existing,
  setCreatePlayer,
  setCreateExistingPlayer,

  edit,
  share,
  remove,
}: ManagePlayerType) => {
  const [editPlayer, setEditPlayer] = useState<boolean>(false);
  const [select, setSelected] = useState<boolean>(false);

  const handleCreatePlayer = () => {
    setCreatePlayer?.(true);
  };
  const handleCreateExistingPlayer = () => {
    setCreateExistingPlayer?.(true);
  };

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
      <Modal isOpen={isOpen} onClose={() => onClose(false)}>
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
            {create && (
              <>
                <Button
                  variant={'bare'}
                  leftIcon={<MdPersonAddAlt1 color='white' />}
                  onClick={handleCreatePlayer}
                  px={8}
                >
                  {create}
                </Button>
                <Divider color='primary' orientation='horizontal' />
              </>
            )}
            {existing && (
              <>
                <Button
                  variant={'bare'}
                  leftIcon={<MdPeople color='white' />}
                  onClick={handleCreateExistingPlayer}
                  px={8}
                >
                  {existing}
                </Button>
                <Divider color='primary' orientation='horizontal' />
              </>
            )}
            {edit && (
              <>
                <Button
                  variant={'bare'}
                  leftIcon={<MdMode color='white' />}
                  onClick={handleEditPlayer}
                  px={8}
                >
                  {edit}
                </Button>
                <Divider color='primary' orientation='horizontal' />
              </>
            )}
            {share && (
              <>
                <Button
                  variant={'bare'}
                  leftIcon={<MdShare color='white' />}
                  onClick={handleSharePlayer}
                  px={8}
                >
                  Share Player
                </Button>
                <Divider color='primary' orientation='horizontal' />
              </>
            )}
            {remove && (
              <>
                <Button
                  variant={'bare'}
                  leftIcon={<MdDelete color='white' />}
                  onClick={handleDeletePlayer}
                  px={8}
                >
                  {remove}
                </Button>
                <Divider color='primary' />
              </>
            )}{' '}
            <Button variant={'bare'} onClick={() => onClose(false)} px={12}>
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
