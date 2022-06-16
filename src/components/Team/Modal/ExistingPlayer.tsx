import {
    Button,
    VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Input,
    Flex,
    Text,
    Avatar,
    SimpleGrid,
    Image,
    Stack,
    FormControl, useToast,
} from '@chakra-ui/react';

import {SearchIcon} from '@chakra-ui/icons';
import React, {useEffect, useState} from 'react';
import {allPlayers} from '@/data/AllPlayers';
import Confirmation from './Confirmation';
import {addSelectedPlayersToTeam, checkSelectedPlayer} from "@/store/actions/playerActions";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {filterPlayers, filterTeam, getAllPlayers} from "@/store/actions/teamActions";

type ExistingPlayerType = {
    isOpen: boolean;
    onClose: (value: boolean) => void;
    image?: string;
    setSelected?: (value: boolean) => void;
    title?: string;
    buttonTitle?: string;
};
const ExistingPlayer = ({
                            isOpen,
                            onClose,
                            image,
                            setSelected,
                            title = 'Add Existing Player',
                            buttonTitle = 'ADD PLAYER',
                        }: ExistingPlayerType) => {
    const {selectedPlayers}: { selectedPlayers: any } = useSelector((state: RootStateOrAny) => state.player)
    const {
        filteredPlayers,
        teams,
        currentTeam
    }: { filteredPlayers: any, teams: any, currentTeam: any } = useSelector((state: RootStateOrAny) => state.team)
    const [searchText, setSearchText] = useState('');
    const toast = useToast();
    const dispatch = useDispatch();

    const [selectConfirmation, setSelectedConfirmation] =
        useState<boolean>(false);

    const handleSelect = () => {
        dispatch(addSelectedPlayersToTeam(selectedPlayers, currentTeam.id, toast, onClose, setSelectedConfirmation))
    };
    const handleSelectExistingPlayer = (id: number) => {
        dispatch(checkSelectedPlayer(id));
    };

    useEffect(() => {
        console.log('called')
        dispatch(getAllPlayers())
    }, [teams]);


    useEffect(() => {
        console.log('refreshed', filteredPlayers)
    }, [filteredPlayers]);

    const handlePlayerSearch = (e: React.FormEvent<HTMLInputElement>) => {
        const text = e.currentTarget.value;
        setSearchText(text);
        if (text.length < 1 || text.length > 2) {
            dispatch(filterPlayers(text));
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={() => onClose(false)}>
                <ModalOverlay />
                <ModalContent
                    w='xl'
                    px={8}
                    h='auto'
                    bg='grey'
                    color='white'
                    borderRadius='18px'
                >
                    <ModalHeader
                        p='24px 24px 4px'
                        textAlign='center'
                        fontSize='18px'
                        fontWeight='600'
                    >
                        {title}
                    </ModalHeader>
                    <ModalBody mt={5}>
                        <VStack spacing={4}>
                            <Flex direction='row' w='100%'>
                                <FormControl
                                    p='0.2em'
                                    bg='black'
                                    display='flex'
                                    borderRadius='lg'
                                >
                                    <SearchIcon alignSelf='center' ml={2} color='grey' />
                                    <Input
                                        variant={'solid'}
                                        bg='transparent'
                                        value={searchText}
                                        onChange={handlePlayerSearch}
                                        id={'text'}
                                        type={'text'}
                                        placeholder={'Search for players'}
                                        aria-label={'Search for Players'}
                                    />
                                </FormControl>
                            </Flex>
                        </VStack>

                        <Stack w='100%' spacing={8}>
                            <SimpleGrid
                                columns={{base: 1, sm: 2, lg: 3}}
                                mt={8}
                                spacing={8}
                                overflowY='auto'
                            >
                                {filteredPlayers
                                    .map((player: any) => (
                                        <VStack
                                            key={player.id}
                                            onClick={() => handleSelectExistingPlayer(player.id)}
                                            cursor={'pointer'}
                                        >
                                            <Avatar
                                                bg='ash'
                                                boxSize={{base: '2rem', md: '4rem'}}
                                                src={player.photo}
                                                position={'relative'}
                                                top={0}
                                                zIndex={1}
                                            />
                                            {selectedPlayers.includes(player.id) && (
                                                <Image
                                                    src={'/icons/checked.svg'}
                                                    alt='checked'
                                                    w={8}
                                                    h={8}
                                                    color='primary'
                                                    position={'absolute'}
                                                    zIndex={3}
                                                />
                                            )}
                                            <Text fontSize={'xxs'} fontWeight='semibold'>
                                                {`${player.first_name} ${player.last_name}`}
                                            </Text>
                                            <Text fontSize={'xxs'}>{player.position}</Text>
                                        </VStack>
                                    ))
                                }
                            </SimpleGrid>
                        </Stack>
                    </ModalBody>

                    <ModalFooter w='full' py={{base: 4, md: 8}}>
                        <VStack spacing={4} w='full'>
                            {selectedPlayers?.length > 0 && (
                                <Button variant='action' w='full' onClick={handleSelect}>
                                    {buttonTitle}
                                </Button>
                            )}
                        </VStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Confirmation
                jersyPng={'/images/imgs/success.svg'}
                isOpen={selectConfirmation}
                onClose={setSelectedConfirmation}
                body={'Sonalysis will notify this player of the changes made'}
                title='New Player Added'
                buttonTitle={'OKAY, THANK YOU'}
            />
        </>
    );
};

export default ExistingPlayer;
