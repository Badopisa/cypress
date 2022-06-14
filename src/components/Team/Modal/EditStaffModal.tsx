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
import Confirmation from './Confirmation';
import EditStaffDetails from './EditStaffDetails';

type ManageStaffType = {
  isOpen: boolean;
  onClose: (value: boolean) => void;
};

const ManageStaffModal = ({ isOpen, onClose }: ManageStaffType) => {
  const [editStaff, setEditStaff] = useState<boolean>(false);
  const [select, setSelected] = useState<boolean>(false);

  const handleEditStaff = () => {
    setEditStaff(true);
  };
  const handleShareStaff = () => {
    console.log('sharing');
  };
  const handleDeleteStaff = () => {
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
            <Button
              variant={'bare'}
              leftIcon={<MdMode color='white' />}
              onClick={handleEditStaff}
              px={8}
            >
              Edit Staff
            </Button>
            <Divider color='primary' />
            <Button
              variant={'bare'}
              leftIcon={<MdShare color='white' />}
              onClick={handleShareStaff}
              px={8}
            >
              Share Staff
            </Button>
            <Divider color='primary' orientation='horizontal' />{' '}
            <Button
              variant={'bare'}
              leftIcon={<MdDelete color='white' />}
              onClick={handleDeleteStaff}
              px={8}
            >
              Remove Staff
            </Button>
            <Divider color='primary' orientation='horizontal' />{' '}
            <Button variant={'bare'} onClick={() => onClose(false)} px={12}>
              Close
            </Button>
            <Divider color='primary' orientation='horizontal' />
          </VStack>
        </ModalContent>
      </Modal>
      <EditStaffDetails
        isOpen={editStaff}
        onClose={setEditStaff}
        setSelected={setSelected}
      />
      <Confirmation
        jersyPng={'/images/imgs/success.svg'}
        isOpen={select}
        onClose={setSelected}
        body={'Sonalysis will notify this Staff of the changes made'}
        title='Changes Saved'
        buttonTitle={'OKAY, THANK YOU'}
      />
    </>
  );
};

export default ManageStaffModal;
