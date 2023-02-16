import {
    Text,
    Avatar,
    Center,
    Box,
    Img,
    Stack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    useToast,
    Spinner,
    HStack,
    VStack
} from '@chakra-ui/react';
import EditPlayerDetails from '@/components/Team/Modal/EditPlayerDetails';
import React, { useState } from 'react';
import { removePlayerFromTeam, saveNewPlayerData } from '@/store/actions/playerActions';
import newPlayer from '@/components/Team/Modal/NewPlayer';
import { useDispatch } from 'react-redux';
import Confirmation from '@/components/Team/Modal/Confirmation';

const PlayerCard = ({
    id,
    teamId,
    clubId,
    name,
    position,
    image,
    number,
    team,
    click,
    hasMenu = false,
    player
}: {
    id?: any;
    player?: any;
    teamId?: any;
    clubId?: any;
    hasMenu?: boolean;
    name?: string;
    position?: string;
    number?: any;
    status?: string;
    image?: string;
    team?: string;
    click?: () => void;
}) => {
    const [editPlayer, setEditPlayer] = useState<boolean>(false);
    const [select, setSelected] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast();
    const dispatch = useDispatch();

    const handleDeletePlayer = () => {
        setLoading(true);
        dispatch(removePlayerFromTeam(id, teamId, clubId, toast, setLoading));
    };

    return (
        <>
            <Box
                bg="lightWhite"
                borderRadius="10px"
                position={'relative'}
                // key={index}
                // maxW={'250px'}
                borderWidth={'1px'}
                _hover={{
                    // transform: 'scale(1.05)'
                    borderColor: 'slateBlue',
                    borderWidth: '1px'
                }}
                rounded={10}
                py={{ base: 6, md: '20px' }}
                onClick={click}
                cursor={'pointer'}>
                <Stack>
                    <Center>
                        <Avatar mb={'5px'} name={name} src={image} w={'66px'} h={'66px'} />
                    </Center>

                    <VStack alignItems={'center'} color={'black2'}>
                        <Text fontSize="14px" fontWeight="400">
                            {loading ? (
                                <HStack>
                                    <Spinner /> <Text color={'grey3'}>removing {name}...</Text>
                                </HStack>
                            ) : (
                                name
                            )}
                        </Text>
                        <Text mb={'5px'} color={'black2'} fontSize="12px" fontWeight="400">
                            {position}
                        </Text>
                        {number && (
                            <Text color={'grey3'} fontSize="12px" fontWeight="400">
                                No. {number}
                            </Text>
                        )}
                    </VStack>
                    {hasMenu && (
                        <Menu>
                            <MenuButton position={'absolute'} right={4} top={4}>
                                <Img src="/icons/more_vert.svg" alt="edit" />
                            </MenuButton>
                            <MenuList bg={'lightWhite'}>
                                <MenuItem
                                    onClick={() => {
                                        dispatch(saveNewPlayerData(player));
                                        setEditPlayer(true);
                                    }}
                                    fontSize={'16px'}
                                    color={'black2'}
                                    fontWeight="400"
                                    _hover={{ background: 'primary', color: 'white' }}>
                                    Edit {name}
                                </MenuItem>
                                <MenuItem
                                    onClick={handleDeletePlayer}
                                    fontSize={'16px'}
                                    color={'black2'}
                                    fontWeight="400"
                                    _hover={{ background: 'primary', color: 'white' }}>
                                    Remove {name}
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    )}
                </Stack>
            </Box>
            <EditPlayerDetails isOpen={editPlayer} onClose={setEditPlayer} />
            <Confirmation
                jersyPng={'/images/imgs/success.svg'}
                isOpen={select}
                onClose={setSelected}
                body={`${name} has been removed`}
                title={`${name} removed!`}
                buttonTitle={'OKAY, THANK YOU'}
            />
        </>
    );
};

export default PlayerCard;
