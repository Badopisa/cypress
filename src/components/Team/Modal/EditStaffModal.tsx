import { Button, VStack, Modal, ModalOverlay, ModalContent, Divider } from '@chakra-ui/react';
import { MdMode, MdDelete, MdShare, MdPersonAddAlt1, MdPeople } from 'react-icons/md';

import React, { useState } from 'react';
import Confirmation from './Confirmation';
import EditStaffDetails from './EditStaffDetails';

type ManageStaffType = {
    isOpen: boolean;
    onClose: (value: boolean) => void;
    setCreateStaff?: (value: boolean) => void;
    setCreateExistingStaff?: (value: boolean) => void;
    create?: string;
    existing?: string;
    edit?: string;
    share?: string;
    remove?: string;
};

const ManageStaffModal = ({
    isOpen,
    onClose,
    create,
    existing,
    setCreateStaff,
    setCreateExistingStaff,
    edit,
    share,
    remove
}: ManageStaffType) => {
    const [editStaff, setEditStaff] = useState<boolean>(false);
    const [select, setSelected] = useState<boolean>(false);

    const handleCreateStaff = () => {
        setCreateStaff?.(true);
    };
    const handleCreateExistingStaff = () => {
        setCreateExistingStaff?.(true);
    };
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
                <ModalContent w="xs" py={5} h="auto" bg="ash" color="white" rounded="1.125rem">
                    <VStack alignItems={'flex-start'}>
                        {create && (
                            <>
                                <Button
                                    variant={'bare'}
                                    leftIcon={<MdPersonAddAlt1 color="white" />}
                                    onClick={handleCreateStaff}
                                    px={8}>
                                    {create}
                                </Button>
                                <Divider color="primary" orientation="horizontal" />
                            </>
                        )}
                        {existing && (
                            <>
                                <Button
                                    variant={'bare'}
                                    leftIcon={<MdPeople color="white" />}
                                    onClick={handleCreateExistingStaff}
                                    px={8}>
                                    {existing}
                                </Button>
                                <Divider color="primary" orientation="horizontal" />
                            </>
                        )}
                        {edit && (
                            <>
                                <Button
                                    variant={'bare'}
                                    leftIcon={<MdMode color="white" />}
                                    onClick={handleEditStaff}
                                    px={8}>
                                    {edit}
                                </Button>
                                <Divider color="primary" orientation="horizontal" />
                            </>
                        )}
                        {share && (
                            <>
                                <Button
                                    variant={'bare'}
                                    leftIcon={<MdShare color="white" />}
                                    onClick={handleShareStaff}
                                    px={8}>
                                    Share Staff
                                </Button>
                                <Divider color="primary" orientation="horizontal" />
                            </>
                        )}
                        {remove && (
                            <>
                                <Button
                                    variant={'bare'}
                                    leftIcon={<MdDelete color="white" />}
                                    onClick={handleDeleteStaff}
                                    px={8}>
                                    {remove}
                                </Button>
                                <Divider color="primary" />
                            </>
                        )}{' '}
                        <Button variant={'bare'} onClick={() => onClose(false)} px={12}>
                            Close
                        </Button>
                        <Divider color="primary" orientation="horizontal" />
                    </VStack>
                </ModalContent>
            </Modal>
            <EditStaffDetails isOpen={editStaff} onClose={setEditStaff} setSelected={setSelected} />
            <Confirmation
                jersyPng={'/images/imgs/success.svg'}
                isOpen={select}
                onClose={setSelected}
                body={'Sonalysis will notify this Staff of the changes made'}
                title="Changes Saved"
                buttonTitle={'OKAY, THANK YOU'}
            />
        </>
    );
};

export default ManageStaffModal;
