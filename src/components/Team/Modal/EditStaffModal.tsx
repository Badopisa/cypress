import {
    Button,
    VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    Divider,
    useToast,
    ModalHeader,
    Text
} from '@chakra-ui/react';
import { MdMode, MdDelete, MdShare, MdPersonAddAlt1, MdPeople } from 'react-icons/md';

import React, {useEffect, useState } from 'react';
import Confirmation from './Confirmation';
import EditStaffDetails from './EditStaffDetails';
import { removeStaffFromTeam } from '@/store/actions/staffActions';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

type ManageStaffType = {
    isOpen: boolean;
    onClose: any;
    setCreateStaff?: any;
    setCreateExistingStaff?: any;
    create?: string;
    existing?: string;
    newStaffButton?: boolean;
    edit?: string;
    share?: string;
    remove?: string;
};

const ManageStaffModal = ({
    isOpen,
    onClose,
    create,
    existing,
    newStaffButton = false,
    setCreateStaff,
    setCreateExistingStaff,
    edit,
    share,
    remove
}: ManageStaffType) => {
    const [editStaff, setEditStaff] = useState<boolean>(false);
    const [select, setSelected] = useState<boolean>(false);
    const { newStaff }: { newStaff: any } = useSelector((state: RootStateOrAny) => state.staff);
    const { currentTeam }: { currentTeam: any } = useSelector(
        (state: RootStateOrAny) => state.team
    );
    const dispatch = useDispatch();
    const toast = useToast();

    useEffect(() => {
    }, [newStaff]);


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
        dispatch(
            removeStaffFromTeam(
                newStaff.id,
                newStaff.role,
                currentTeam.id,
                newStaff.club_id,
                toast,
                onClose
            )
        );
    };

    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={() => onClose(false)}>
                <ModalOverlay />
                <ModalContent
                    px={'40px'}
                    py={newStaffButton ? '40px' : '104px'}
                    h="auto"
                    bg="white"
                    color="black2"
                    rounded="1.125rem">
                    {newStaffButton && (
                        <ModalHeader
                            mb={'20px'}
                            textAlign="center"
                            fontSize="40px"
                            fontWeight="700">
                            Add new staff
                            <Text mt={'10px'} fontSize="16px" color="grey4" fontWeight={'400'}>
                                Select one
                            </Text>
                        </ModalHeader>
                    )}

                    <VStack alignItems={'flex-start'}>
                        {create && (
                            <>
                                <Button
                                    mb={'12px'}
                                    size={'lg'}
                                    w={'100%'}
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
                                    size={'lg'}
                                    bg={'lightWhite'}
                                    w={'100%'}
                                    color={'black2'}
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
                                    size={'lg'}
                                    w={'100%'}
                                    _hover={{
                                        backgroundColor: 'black',
                                        color: 'white'
                                    }}
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
                                    variant={'text'}
                                    size={'lg'}
                                    borderRadius={'0px'}
                                    w={'100%'}
                                    _hover={{
                                        backgroundColor: 'black',
                                        color: 'white'
                                    }}
                                    leftIcon={<MdShare color="black" />}
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
                                    variant={'text'}
                                    size={'lg'}
                                    borderRadius={'0px'}
                                    w={'100%'}
                                    color={'red'}
                                    onClick={handleDeleteStaff}
                                    px={8}>
                                    {remove}
                                </Button>
                                <Divider color="primary" />
                            </>
                        )}{' '}
                        {/*<Button*/}
                        {/*    variant={'text'}*/}
                        {/*    size={'lg'}*/}
                        {/*    borderRadius={'0px'}*/}
                        {/*    w={'100%'}*/}
                        {/*    _hover={{*/}
                        {/*        backgroundColor: 'black',*/}
                        {/*        color: 'white'*/}
                        {/*    }}*/}
                        {/*    onClick={() => onClose(false)}*/}
                        {/*    px={12}>*/}
                        {/*    Close*/}
                        {/*</Button>*/}
                        {/*<Divider color="primary" orientation="horizontal" />*/}
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
