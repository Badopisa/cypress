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
    useToast,
    InputGroup,
    InputLeftElement,
    HStack,
    Checkbox
} from '@chakra-ui/react';

import { SearchIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import Confirmation from './Confirmation';
import { addSelectedPlayersToTeam, checkSelectedPlayer } from '@/store/actions/playerActions';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { filterPlayers, getAllPlayers } from '@/store/actions/teamActions';
import { UserDataType } from '@/types/AuthDataType';
import { BsSearch } from 'react-icons/bs';

type ExistingPlayerType = {
    isOpen: boolean;
    onClose: any;
    image?: string;
    setSelected?: any;
    title?: string;
    buttonTitle?: string;
};
const ExistingPlayer = ({
    isOpen,
    onClose,
    title = 'Add Existing Player',
    buttonTitle = 'Continue'
}: ExistingPlayerType) => {
    const { selectedPlayers }: { selectedPlayers: any } = useSelector(
        (state: RootStateOrAny) => state.player
    );
    const { filteredPlayers, currentTeam }: { filteredPlayers: any; teams: any; currentTeam: any } =
        useSelector((state: RootStateOrAny) => state.team);
    const { user }: { user: UserDataType } = useSelector((state: RootStateOrAny) => state.auth);
    const [searchText, setSearchText] = useState('');
    const { isLoading } = useSelector((state: RootStateOrAny) => state.msg);
    const toast = useToast();
    const dispatch = useDispatch();

    const [selectConfirmation, setSelectedConfirmation] = useState<boolean>(false);

    const handleSelect = () => {
        dispatch(
            addSelectedPlayersToTeam(
                selectedPlayers,
                currentTeam.id,
                currentTeam.club_id,
                toast,
                onClose,
                setSelectedConfirmation
            )
        );
    };
    const handleSelectExistingPlayer = (id: number) => {
        dispatch(checkSelectedPlayer(id));
    };

    useEffect(() => {
        console.log('called');
        dispatch(getAllPlayers(user?.clubs[0]?.id));
    }, []);

    // useEffect(() => {
    //     console.log('refreshed', filteredPlayers)
    // }, [filteredPlayers]);

    const handlePlayerSearch = (e: React.FormEvent<HTMLInputElement>) => {
        const text = e.currentTarget.value;
        setSearchText(text);
        if (text.length < 1 || text.length > 2) {
            dispatch(filterPlayers(text));
        }
    };

    return (
        <>
            <Modal
                scrollBehavior={'inside'}
                size={'lg'}
                isCentered
                isOpen={isOpen}
                onClose={() => onClose(false)}>
                <ModalOverlay />
                <ModalContent w="xl" px={8} h="auto" bg="white" color="black2" borderRadius="18px">
                    <ModalHeader
                        p="24px 24px 4px"
                        textAlign="center"
                        color={'black2'}
                        fontSize="40px"
                        fontWeight="700">
                        {title}
                    </ModalHeader>
                    <ModalBody mt={5}>
                        <VStack mb={'35px'} spacing={4}>
                            <InputGroup w="100%">
                                <InputLeftElement pointerEvents="none">
                                    <BsSearch color="grey" />
                                </InputLeftElement>
                                <Input
                                    type="text"
                                    placeholder="Search player"
                                    value={searchText}
                                    onChange={handlePlayerSearch}
                                    // value={searchText}
                                    // onChange={handleTeamSearch}
                                    focusBorderColor="purple"
                                    borderColor={'grey5'}
                                    size={'lg'}
                                    borderRadius={'6px'}
                                    _placeholder={{
                                        opacity: 1,
                                        color: 'inputText',
                                        fontSize: '16px',
                                        fontWeight: '400'
                                    }}
                                />
                            </InputGroup>
                        </VStack>

                        <Stack w="100%" spacing={8}>
                            <VStack overflowY="auto">
                                {filteredPlayers?.map((player: any) => (
                                    <HStack
                                        key={player.id}
                                        w={'100%'}
                                        justifyContent={'space-between'}>
                                        <HStack cursor={'pointer'}>
                                            <Avatar
                                                name={`${player.first_name} ${player.last_name}`}
                                                w={'40px'}
                                                h={'40px'}
                                                mr={'10px'}
                                                src={player.photo}
                                                top={0}
                                                zIndex={1}
                                            />
                                            {/*{selectedPlayers.includes(player.id) && (*/}
                                            {/*    <Image*/}
                                            {/*        src={'/icons/checked.svg'}*/}
                                            {/*        alt="checked"*/}
                                            {/*        w={8}*/}
                                            {/*        h={8}*/}
                                            {/*        color="primary"*/}
                                            {/*        position={'absolute'}*/}
                                            {/*        zIndex={3}*/}
                                            {/*    />*/}
                                            {/*)}*/}
                                            <VStack alignItems={'flex-start'}>
                                                <Text
                                                    fontSize={'16px'}
                                                    fontWeight="400"
                                                    color={'black2'}>
                                                    {`${player.first_name} ${player.last_name}`}
                                                </Text>
                                                <Text
                                                    fontSize={'12px'}
                                                    color={'grey3'}
                                                    fontWeight={'400'}>
                                                    No. {player.position}
                                                </Text>
                                            </VStack>
                                        </HStack>
                                        <Checkbox
                                            size={'lg'}
                                            onChange={() => handleSelectExistingPlayer(player.id)}
                                            iconColor={'white'}
                                            borderColor={'grey6'}
                                            _checked={{
                                                background: 'primary',
                                                color: 'white',
                                                borderColor: 'slateBlue'
                                            }}
                                            isChecked={selectedPlayers.includes(player.id)}
                                        />
                                    </HStack>
                                ))}
                            </VStack>
                        </Stack>
                    </ModalBody>

                    <ModalFooter w="full" py={{ base: 4, md: 8 }}>
                        <VStack spacing={4} w="full">
                            {/*{selectedPlayers?.length > 0 && (*/}
                            <Button
                                isLoading={isLoading}
                                size={'lg'}
                                mb={'20px'}
                                w="full"
                                loadingText={'Adding players'}
                                isDisabled={selectedPlayers?.length < 1}
                                onClick={handleSelect}>
                                {buttonTitle}
                            </Button>
                            {/*)}*/}
                        </VStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Confirmation
                jersyPng={'/images/imgs/success.svg'}
                isOpen={selectConfirmation}
                onClose={setSelectedConfirmation}
                body={'Sonalysis will notify these players of the changes made'}
                title="New Players Added"
                buttonTitle={'OKAY, THANK YOU'}
            />
        </>
    );
};

export default ExistingPlayer;
