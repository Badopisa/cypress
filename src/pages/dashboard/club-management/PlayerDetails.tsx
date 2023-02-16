import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import { Avatar, Box, Button, Center, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import Confirmation from '@/components/Team/Modal/Confirmation';

import BlankTeam from '@/components/Team/BlankTeam';

import PlayerVideos from './PlayerVideos';
import PlayerStatistics from './PlayerStatistics';
import { RootStateOrAny, useSelector } from 'react-redux';
import EditPlayerModal from '@/components/Team/Modal/EditPlayerModal';

const PlayerDetails = () => {
    const { newPlayer }: { newPlayer: any } = useSelector((state: RootStateOrAny) => state.player);
    const [editPlayer, setEditPlayer] = useState<boolean>(false);
    const [select, setSelected] = useState<boolean>(false);
    const [display, setDisplay] = useState(1);
    const [stats, setStats] = useState(null);

    const handleEditPlayer = () => {
        setEditPlayer(true);
    };

    return (
        <>
            <DashboardDesktopNav hasArrow />
            <Box>
                <Text fontSize={'40px'} fontWeight="700" color={'black2'}>
                    Club management
                </Text>
                <Flex
                    justify="space-between"
                    w={'100%'}
                    my={8}
                    alignItems={'center'}
                    direction={{ base: 'column', md: 'row' }}>
                    <HStack>
                        <Avatar
                            name={`${newPlayer?.first_name} ${newPlayer?.last_name}`}
                            w={'80px'}
                            h={'80px'}
                            // boxSize={{ base: '5rem', md: '7.5rem' }}
                            mr={'10px'}
                            src={newPlayer?.photo}
                        />
                        <VStack alignItems={'flex-start'}>
                            <Text color={'black2'} fontSize={'16px'} fontWeight="400">
                                {newPlayer?.first_name} {newPlayer?.last_name}
                            </Text>
                            <Text color={'grey3'} fontSize={'14px'} fontWeight="400">
                                No. {newPlayer?.jersey_number} {newPlayer?.position} ~{' '}
                                {newPlayer?.videos?.totalVideos} videos
                            </Text>
                        </VStack>
                    </HStack>

                    {/*<Wrap w={'35%'} alignSelf={{ base: 'self-start', md: 'self-end' }}>*/}
                    {/*    <Tag fontSize={'sm'} p={2} color="white" bg="dark">*/}
                    {/*        {newPlayer?.player?.team?.name} Team*/}
                    {/*    </Tag>*/}
                    {/*    <Tag fontSize={'sm'} p={2} color="white" bg="dark">*/}
                    {/*        {newPlayer?.player?.position}*/}
                    {/*    </Tag>*/}
                    {/*    <Tag p={2} color="white" bg="dark">*/}
                    {/*        {newPlayer?.player?.videos?.totalVideos} videos*/}
                    {/*    </Tag>*/}
                    {/*    <Tag fontSize={'sm'} p={2} color="white" bg="dark">*/}
                    {/*        {newPlayer?.player?.country}*/}
                    {/*    </Tag>*/}
                    {/*    <Tag fontSize={'sm'} p={2} color="white" bg="dark">*/}
                    {/*        Invite Pending*/}
                    {/*    </Tag>*/}
                    {/*</Wrap>*/}

                    <HStack>
                        <Button
                            // onClick={handleEditTeam}
                            size={'lg'}
                            mr={'40px'}
                            w={'200px'}
                            disabled
                            fontSize={'16px'}>
                            Send message
                        </Button>
                        <Button
                            onClick={handleEditPlayer}
                            size={'lg'}
                            bg={'lightWhite'}
                            color={'black2'}
                            w={'200px'}
                            fontSize={'16px'}>
                            More options
                        </Button>
                    </HStack>
                </Flex>
                {newPlayer?.videos.length > 0 || (
                    <Center h={'100%'}>
                        <BlankTeam
                            image="/images/image/jersy.png"
                            title="No videos available for this player"
                        />
                    </Center>
                )}
                {newPlayer?.videos.length > 0 && display === 1 && (
                    <PlayerVideos player={newPlayer} setStats={setStats} setDisplay={setDisplay} />
                )}
                {newPlayer?.videos.length > 0 && display === 2 && (
                    <PlayerStatistics setDisplay={setDisplay} stats={stats} />
                )}
            </Box>
            <EditPlayerModal
                isOpen={editPlayer}
                onClose={setEditPlayer}
                edit="Edit player"
                share="Share player"
                remove="Remove player"
            />
            {/*<EditPlayerDetails isOpen={editPlayer} onClose={setEditPlayer} />*/}
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

export default authenticatedRoute(PlayerDetails);
