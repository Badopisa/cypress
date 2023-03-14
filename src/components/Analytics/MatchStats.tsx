import { Box, VStack, Flex, Img, Spacer, Text, Avatar, HStack } from '@chakra-ui/react';
import { RootStateOrAny, useSelector } from 'react-redux';
import React from 'react';

const MatchStats = () => {
    const { videoAnalyticsDetails, analyticsId, teamLogos } = useSelector(
        (state: RootStateOrAny) => state.analytics
    );
    const matchStats = [
        {
            statsType: 'Shot Attempts',
            team1Stats: videoAnalyticsDetails?.club_stats[1]?.shots,
            team2Stats: videoAnalyticsDetails?.club_stats[0]?.shots
        },
        {
            statsType: 'Ball Possession',
            team1Stats: videoAnalyticsDetails?.club_stats[1]?.ball_possession,
            team2Stats: videoAnalyticsDetails?.club_stats[0]?.ball_possession
        },
        {
            statsType: 'Free Kicks',
            team1Stats: videoAnalyticsDetails?.club_stats[1]?.free_kick,
            team2Stats: videoAnalyticsDetails?.club_stats[0]?.free_kick
        },
        {
            statsType: 'Penalties',
            team1Stats: videoAnalyticsDetails?.club_stats[1]?.penalty,
            team2Stats: videoAnalyticsDetails?.club_stats[0]?.penalty
        },
        {
            statsType: 'Fouls',
            team1Stats: videoAnalyticsDetails?.club_stats[1]?.foul,
            team2Stats: videoAnalyticsDetails?.club_stats[0]?.foul
        },
        {
            statsType: 'Yellow cards',
            team1Stats: videoAnalyticsDetails?.club_stats[1]?.yellow_cards,
            team2Stats: videoAnalyticsDetails?.club_stats[0]?.yellow_cards
        },
        {
            statsType: 'Red cards',
            team1Stats: videoAnalyticsDetails?.club_stats[1]?.red_cards,
            team2Stats: videoAnalyticsDetails?.club_stats[0]?.red_cards
        }
    ];

    return (
        <Box bg="lightWhite" borderRadius="lg" p={8}>
            <VStack w="100%" alignItems="left">
                <HStack justifyContent={'center'} w={'full'}>
                    <Box p="4">
                        {videoAnalyticsDetails?.club_stats?.map((stats: any) => {
                            if (stats?.pitch_side === 'right') return;
                            return (
                                <VStack>
                                    <Avatar
                                        w={'80px'}
                                        h={'80px'}
                                        mb={'20px'}
                                        src={teamLogos.team_a.image}
                                        name={teamLogos.team_a.team_name}
                                    />
                                    <Text fontSize="16px" fontWeight={'400'} color={'black2'}>
                                        {teamLogos?.team_a?.team_name}
                                    </Text>
                                </VStack>
                            );
                        })}
                    </Box>
                    <Box w={'100px'} />
                    <VStack p="4">
                        <Text fontSize="14px" fontWeight={'400'} color={'grey3'}>
                            {videoAnalyticsDetails.league}
                        </Text>
                        <Text fontSize="20px" fontWeight={'400'} color={'black2'}>
                            {videoAnalyticsDetails?.club_stats[1].goals} -{' '}
                            {videoAnalyticsDetails?.club_stats[0].goals}
                        </Text>
                    </VStack>
                    <Box w={'100px'} />
                    <Box p="4">
                        {videoAnalyticsDetails?.club_stats?.map((stats: any) => {
                            if (stats?.pitch_side === 'left') return;
                            return (
                                <VStack>
                                    <Avatar
                                        w={'80px'}
                                        h={'80px'}
                                        mb={'20px'}
                                        src={teamLogos.team_b.image}
                                        name={teamLogos.team_b.team_name}
                                    />
                                    <Text fontSize="16px" fontWeight={'400'} color={'black2'}>
                                        {teamLogos?.team_b?.team_name}
                                    </Text>
                                </VStack>
                            );
                        })}
                    </Box>
                </HStack>
                {matchStats.map((data, index) => (
                    <>
                        <Flex key={index} borderRadius="lg" px={3}>
                            <HStack w={'full'} justifyContent={'space-between'} p="2">
                                <Text fontSize="14px" fontWeight={'400'} color={'black2'}>
                                    {data.team1Stats}
                                </Text>
                                <Box w={'80%'} position={'relative'}>
                                    <Box
                                        position={'absolute'}
                                        right={'0'}
                                        w={
                                            (data.team1Stats /
                                                (data.team1Stats + data.team2Stats)) *
                                                100 +
                                            '%'
                                        }
                                        borderRadius={'3px'}
                                        h={'17px'}
                                        bg={data.team1Stats > data.team2Stats ? 'green2' : 'grey3'}
                                    />
                                    <Box w={'100%'} borderRadius={'3px'} h={'17px'} bg={'grey5'} />
                                </Box>
                            </HStack>
                            <Spacer />
                            <VStack alignItems={'center'} w={'40%'} p="2">
                                <Text fontSize="14px" fontWeight={'400'} color={'black2'}>
                                    {data.statsType}
                                </Text>
                            </VStack>
                            <Spacer />
                            <HStack w={'full'} justifyContent={'space-between'} p="2">
                                <Box h={'17px'} w={'80%'} position={'relative'}>
                                    <Box
                                        position={'absolute'}
                                        right={'0'}
                                        w={
                                            (data.team2Stats /
                                                (data.team1Stats + data.team2Stats)) *
                                                100 +
                                            '%'
                                        }
                                        borderRadius={'3px'}
                                        h={'17px'}
                                        bg={data.team1Stats < data.team2Stats ? 'green2' : 'grey3'}
                                    />
                                    <Box w={'100%'} borderRadius={'3px'} h={'17px'} bg={'grey5'} />
                                </Box>
                                <Text fontSize="14px" fontWeight={'400'} color={'black2'}>
                                    {data.team2Stats}
                                </Text>
                            </HStack>
                        </Flex>
                        <Spacer />
                    </>
                ))}
            </VStack>
        </Box>
    );
};
export default MatchStats;
