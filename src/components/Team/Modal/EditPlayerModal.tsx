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
import { MdMode, MdDelete, MdShare, MdPeople, MdPersonAddAlt1 } from 'react-icons/md';

import React, { useState } from 'react';
import EditPlayerDetails from './EditPlayerDetails';
import Confirmation from './Confirmation';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { removePlayerFromTeam } from '@/store/actions/playerActions';

type ManagePlayerType = {
    isOpen: boolean;
    onClose: any;
    setCreatePlayer?: any;
    setCreateExistingPlayer?: any;

    create?: string;
    existing?: string;
    newPlayerButton?: boolean;
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
    newPlayerButton,
    setCreateExistingPlayer,

    edit,
    share,
    remove
}: ManagePlayerType) => {
    const [editPlayer, setEditPlayer] = useState<boolean>(false);
    const [select, setSelected] = useState<boolean>(false);
    const { newPlayer }: { newPlayer: any } = useSelector((state: RootStateOrAny) => state.player);
    const { currentTeam }: { currentTeam: any } = useSelector(
        (state: RootStateOrAny) => state.team
    );
    const dispatch = useDispatch();
    const toast = useToast();

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
        dispatch(
            removePlayerFromTeam(newPlayer.id, currentTeam.id, newPlayer.club_id, toast, onClose)
        );
    };

    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={() => onClose(false)}>
                <ModalOverlay />
                <ModalContent
                    px={'40px'}
                    py={newPlayerButton ? '40px' : '104px'}
                    h="auto"
                    bg="white"
                    color="black2"
                    rounded="1.125rem">
                    {newPlayerButton && (
                        <ModalHeader
                            mb={'20px'}
                            textAlign="center"
                            fontSize="40px"
                            fontWeight="700">
                            Add new player
                            <Text mt={'10px'} fontSize="16px" color="grey4" fontWeight={'400'}>
                                Select one
                            </Text>
                        </ModalHeader>
                    )}
                    <VStack alignItems={'flex-start'}>
                        {create && (
                            <>
                                <Button
                                    size={'lg'}
                                    w={'100%'}
                                    onClick={handleCreatePlayer}
                                    mb={'12px'}
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
                                    w={'100%'}
                                    color={'black2'}
                                    bg={'lightWhite'}
                                    onClick={handleCreateExistingPlayer}
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
                                    onClick={handleEditPlayer}
                                    px={8}>
                                    {edit}
                                </Button>
                                <Divider color="primary" orientation="horizontal" />
                            </>
                        )}
                        {share && (
                            <>
                                <Button
                                    size={'lg'}
                                    w={'100%'}
                                    bg={'lightWhite'}
                                    color={'black2'}
                                    disabled
                                    onClick={handleSharePlayer}
                                    px={8}>
                                    Share Player
                                </Button>
                                <Divider color="primary" orientation="horizontal" />
                            </>
                        )}
                        {remove && (
                            <>
                                <Button
                                    variant={'text'}
                                    size={'lg'}
                                    w={'100%'}
                                    color={'red'}
                                    onClick={handleDeletePlayer}
                                    px={8}>
                                    {remove}
                                </Button>
                                <Divider color="primary" />
                            </>
                        )}{' '}
                        {/*<Button*/}
                        {/*    size={'lg'}*/}
                        {/*    borderRadius={'0px'}*/}
                        {/*    w={'100%'}*/}
                        {/*    _hover={{*/}
                        {/*        backgroundColor: 'black',*/}
                        {/*        color: 'white'*/}
                        {/*    }}*/}
                        {/*    variant={'text'}*/}
                        {/*    onClick={() => onClose(false)}*/}
                        {/*    px={12}>*/}
                        {/*    Close*/}
                        {/*</Button>*/}
                        {/*<Divider color="primary" orientation="horizontal" />*/}
                    </VStack>
                </ModalContent>
            </Modal>
            <EditPlayerDetails isOpen={editPlayer} onClose={setEditPlayer} />
            <Confirmation
                jersyPng={'/images/imgs/success.svg'}
                isOpen={select}
                onClose={setSelected}
                body={'Sonalysis will notify this player of the changes made'}
                title="Changes Saved"
                buttonTitle={'OKAY, THANK YOU'}
            />
        </>
    );
};

export default ManagePlayerModal;
