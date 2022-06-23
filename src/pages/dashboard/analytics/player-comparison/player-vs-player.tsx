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
import React, { useState } from 'react';
import { allPlayers, playersStat } from '@/data/AllPlayers';

const PlayerVsPlayer = () => {
  const [selectedClub, setSelectedClub] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState(['']);
  // const selectedPlayers: string[] = [];

  const handleSelectedPlayer = (e: any) => {
    selectedPlayers.push(e.target.value);
    console.log('selected players', selectedPlayers);
  };
  const handleRemoveSelectedPlayer = () => {};
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
            <Select outline='none' border={'none'}>
              <option value='option1' selected>
                Choose team
              </option>
              <option value='option2'>Manchester United</option>
              <option value='option3'>Arsenal</option>
              <option value='option4'>Manchester United</option>
              <option value='option5'>Arsenal</option>
            </Select>
          </HStack>
        </FormControl>
        <FormControl w={'60%'}>
          <Select id='players' onChange={handleSelectedPlayer}>
            {allPlayers.map((player) => (
              <option key={player.id} value={player.playerName}>
                {player.playerName}
              </option>
            ))}
          </Select>
        </FormControl>

        <HStack spacing={4}>
          {selectedPlayers.length > 1 &&
            selectedPlayers.map((player) => (
              <Tag
                size={'md'}
                key={player}
                borderRadius={'lg'}
                variant='outline'
                my={8}
              >
                <TagLabel>{player}</TagLabel>
                <TagCloseButton onClick={handleRemoveSelectedPlayer} />
              </Tag>
            ))}
        </HStack>
        <HStack gap={8}>
          <Button variant='action' px={4}>
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
            {playersStat.map((stat) => (
              <Tr key={stat.id}>
                <Td>{stat.playerName}</Td>
                <Td>{stat.goalsScored}</Td>
                <Td>{`${stat.shotsAttempts}%`}</Td>
                <Td>{`${stat.ballPossession}%`}</Td>
                <Td>{`${stat.longPass}%`}</Td>
                <Td>{`${stat.shortPass}%`}</Td>
                <Td>{`${stat.speed}%`}</Td>
                <Td>{stat.freeKicks}</Td>
                <Td>{stat.penalties}</Td>
                <Td>{stat.yellowCards}</Td>
                <Td>{stat.redCards}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PlayerVsPlayer;
