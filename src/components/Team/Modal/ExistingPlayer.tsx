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
    FormControl,
} from '@chakra-ui/react';

import {SearchIcon} from '@chakra-ui/icons';
import {useEffect, useState} from 'react';
import {allPlayers} from '@/data/AllPlayers';
import Confirmation from './Confirmation';
import {checkSelectedPlayer} from "@/store/actions/playerActions";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {getAllPlayers} from "@/store/actions/teamActions";

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
    const {allPlayers}: { allPlayers: any } = useSelector((state: RootStateOrAny) => state.team)
    const dispatch = useDispatch();

    const [selectConfirmation, setSelectedConfirmation] =
        useState<boolean>(false);

    const handleSelect = () => {
        setSelectedConfirmation(true);
        onClose(true);
    };
    const handleSelectExistingPlayer = (id: number) => {
        dispatch(checkSelectedPlayer(id));
    };

    useEffect(() => {
        console.log('called')
        dispatch(getAllPlayers())
    }, []);

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
                                {allPlayers
                                    .map((player) => (
                                        <VStack
                                            key={index}
                                            onClick={() => handleSelectExistingPlayer(player.id)}
                                            cursor={'pointer'}
                                        >
                                            <Avatar
                                                bg='ash'
                                                boxSize={{base: '2rem', md: '4rem'}}
                                                src={player.file}
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
                                                {player.playerName}
                                            </Text>
                                            <Text fontSize={'xxs'}>{player.playerPosition}</Text>
                                        </VStack>
                                    ))
                                    .slice(0, 6)}
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
