import { matchStatsData, playerStatsData } from '@/data/AnalyticsData';
import {
  VStack,
  HStack,
  FormControl,
  Img,
  Select,
  Text,
  Box,
  Stack,
  Button,
  Tag,
  TagCloseButton,
  TagLabel,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TableContainer,
  Flex,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { TeamDataType } from '@/types/TeamDataType';
import { fetchTeams } from '@/store/actions/teamActions';
import { UserDataType } from '@/types/AuthDataType';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { fetchPlayerStatistics } from '@/store/actions/comaprisonAction';

const PlayerVsPlayer = () => {
  const [currentTeamPlayers, setCurrentTeamPlayers] = useState([{}]);

  const [selectedPlayers, setSelectedPlayers] = useState(['']);

  const dispatch = useDispatch();

  const {
    filteredData,
    teams,
  }: {
    filteredData: TeamDataType[] | [];
    teams: TeamDataType[] | [];
  } = useSelector((state: RootStateOrAny) => state.team);
  const { user }: { user: UserDataType } = useSelector(
    (state: RootStateOrAny) => state.auth
  );
  const playersStats: any = useSelector(
    (state: any) => state.playersStatistics.playersStatistics
  );

  useEffect(() => {
    if (filteredData.length < 1) {
      dispatch(fetchTeams(user?.clubs[0].id));
    }
  }, []);

  const displayPlayerStats = () => {
    const playerIds = selectedPlayers.map((player: any) => {
      const id = currentTeamPlayers?.filter(
        (currentPlayer: any) =>
          `${currentPlayer.first_name} ${currentPlayer.last_name}` == player
      )[0].id;
      return id || null;
    });
    dispatch(fetchPlayerStatistics(playerIds));
  };

  const handleSelectedTeam = (e: any) => {
    const value = e.target.value;
    const currentTeam = filteredData.filter(
      (team) => team.name === e.target.value
    )[0];
    setCurrentTeamPlayers(currentTeam.players);
  };

  const handleSelectedPlayer = (e: any) => {
    const players = selectedPlayers.filter((player) => player);
    setSelectedPlayers([...players, e.target.value]);
  };
  const handleRemoveSelectedPlayer = (playerName: string) => {
    const players = selectedPlayers.filter((player) => player != playerName);
    setSelectedPlayers(players);
  };
  return (
    <>
      <Text m={8}>You can select more that two players for comparison</Text>

      <Stack w={'80%'} mb={8}>
        <FormControl
          w={'60%'}
          bg={'lightAsh'}
          borderRadius={'lg'}
          pl={8}
          my={8}
        >
          <HStack>
            <Img src='/images/imgs/manu.svg' w={'30px'} />
            <Select
              outline='none'
              border={'none'}
              onChange={handleSelectedTeam}
            >
              {filteredData.map((data: TeamDataType) => (
                <option key={data.id} value={data.name} selected>
                  {data.name}
                </option>
              ))}
            </Select>
          </HStack>
        </FormControl>
        <FormControl w={'60%'}>
          <Select id='players' onChange={handleSelectedPlayer}>
            {currentTeamPlayers.length > 0 &&
              currentTeamPlayers.map((player: any) => (
                <option
                  key={player.id}
                  value={`${player.first_name} ${player.last_name}`}
                  disabled={selectedPlayers.includes(
                    `${player.first_name} ${player.last_name}`
                  )}
                >
                  {`${player.first_name} ${player.last_name}`}
                </option>
              ))}
          </Select>
        </FormControl>

        <HStack spacing={4}>
          {selectedPlayers.length > 0 &&
            selectedPlayers.map((player) => (
              <Tag
                size={'md'}
                key={player}
                borderRadius={'lg'}
                variant='outline'
                my={8}
              >
                <TagLabel>{player}</TagLabel>
                <TagCloseButton
                  onClick={() => handleRemoveSelectedPlayer(player)}
                />
              </Tag>
            ))}
        </HStack>
        <HStack gap={8}>
          <Button variant='action' px={4} onClick={displayPlayerStats}>
            COMPARE
          </Button>
          <Button variant='outline' px={4}>
            SHARE STATS
          </Button>
        </HStack>
      </Stack>
      <Flex justifyContent='space-between' width={'90%'} my={'4rem'}>
        <Text fontWeight={'semibold'}>Player Stats</Text>
        <FormControl width={'20%'}>
          <Select>
            <option value={'All matches'}>All matches</option>
            <option value={'All matches'}>All matches</option>
            <option value={'All matches'}>All matches</option>
          </Select>
        </FormControl>
      </Flex>
      <TableContainer
        overflow={'auto'}
        width={'90%'}
        bg={'dark'}
        borderRadius={'lg'}
        mt={8}
      >
        <Table p={8}>
          <Thead p={8}>
            <Tr>
              <Th borderBottom={'none'}></Th>
              <Th borderBottom={'none'} width={'4px'}>
                Goals Scored
              </Th>
              <Th borderBottom={'none'}>Shots Attempts</Th>
              <Th borderBottom={'none'}>Ball Possession</Th>
              <Th borderBottom={'none'}>Long Pass Acc.</Th>
              <Th borderBottom={'none'}>Short Pass Acc.</Th>
              <Th borderBottom={'none'}>Speed</Th>
              <Th borderBottom={'none'}>Free Kicks</Th>
              <Th borderBottom={'none'}>Penalties</Th>
              <Th borderBottom={'none'}>Yellow Cards</Th>
              <Th borderBottom={'none'}>Red Cards</Th>
            </Tr>
          </Thead>
          <Tbody>
            {playersStats?.map((stat: any) => (
              <Tr key={stat.id}>
                <Td>{`${stat.player.first_name} ${stat.player.last_name}`}</Td>
                <Td>{stat.goal}</Td>
                <Td>{`${70}%`}</Td>
                <Td>{`${50}%`}</Td>
                <Td>{`${stat.long_pass}%`}</Td>
                <Td>{`${stat.short_pass}%`}</Td>
                <Td>{`${stat.speed}%`}</Td>
                <Td>{stat.free_kick}</Td>
                <Td>{stat.penalty}</Td>
                <Td>{stat.yellow_card}</Td>
                <Td>{stat.red_card}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PlayerVsPlayer;
