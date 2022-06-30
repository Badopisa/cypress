import { uploadedVideosData } from '@/data/AnalyticsData';
import { SearchIcon } from '@chakra-ui/icons';
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Img,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player';
import Video from '@/components/Analytics/Video';
import { UserDataType } from '@/types/AuthDataType';
import { TeamDataType } from '@/types/TeamDataType';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { fetchTeams, getAllPlayers } from '@/store/actions/teamActions';

const PlayerVideo = () => {
  const router = useRouter();

  const [selected, setSelected] = useState(true);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showControl, setShowControl] = useState<boolean>(false);

  const dispatch = useDispatch();

  const {
    filteredData,
    allPlayers,
  }: {
    filteredData: TeamDataType[] | [];
    teams: TeamDataType[] | [];
    allPlayers: any;
  } = useSelector((state: RootStateOrAny) => state.team);
  const { user }: { user: UserDataType } = useSelector(
    (state: RootStateOrAny) => state.auth
  );

  useEffect(() => {
    dispatch(getAllPlayers(user?.clubs[0]?.id));
  }, []);

  const handleOpenComparisonResult = () => {
    router.push(
      '/dashboard/analytics/player-comparison/video-comparison-result'
    );
  };
  return (
    <>
      <VStack spacing={8} align='left'>
        <FormControl id='choosePlayer1' w={{ base: '100%', md: '50%' }}>
          <FormLabel>Choose Player</FormLabel>
          <Select placeholder=''>
            {allPlayers?.map((player: any) => (
              <option
                key={player.id}
                value={`${player.first_name} ${player.last_name}`}
                selected
              >
                {`${player.first_name} ${player.last_name}`}
              </option>
            ))}
          </Select>
        </FormControl>
        <Text fontSize={'xl'}>Selected Videos</Text>
        <Box bg='dark' p={4} w={{ base: '100%', md: '40%' }}>
          {/* {selected ? (
            <>
              <Flex gap={5}>
                <Img src='/images/imgs/football-match.svg' w={'60px'} />
                <Text>ManchesterUnited vs Chelsea</Text>
              </Flex>
            </>
          ) : (
            <>
              {' '}
              <Text>The videos that you select will be shown right here</Text>
              <Text>Note: Only two videos can be selected at a time</Text>
            </>

          )} */}

          <HStack spacing={4}>
            {allPlayers?.length > 0 &&
              allPlayers.map((player: any) => (
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
        </Box>
        <Button
          variant='action'
          w={{ base: '100%', md: '40%' }}
          onClick={handleOpenComparisonResult}
        >
          COMPARE
        </Button>
        <Text fontSize={'xl'}>Video Uploads</Text>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify={'space-between'}
          alignItems={'center'}
          w={'100%'}
          mb='4rem'
        >
          <Box my={{ base: 4, md: 0 }}>
            <Stack
              direction={'row'}
              as={'form'}
              spacing={'12px'}
              align='center'
              justify='center'
            >
              <FormControl
                p='0.5em'
                bg='lightAsh'
                display='flex'
                borderRadius='lg'
              >
                <SearchIcon alignSelf='center' ml={2} />
                <Input
                  variant={'solid'}
                  bg='transparent'
                  id={'text'}
                  type={'text'}
                  placeholder={'Search for your videos'}
                  aria-label={'Search for Videos'}
                />
              </FormControl>

              <Img
                src='/icons/search-icon.svg'
                alt='search'
                bg={'lightAsh'}
                p={5}
                borderRadius={'lg'}
              />
            </Stack>
          </Box>
          <Button type={'submit'} variant='actionBare'>
            DESELECT
          </Button>
        </Flex>
        <SimpleGrid columns={[1, 2, 3]} spacing={12}>
          {uploadedVideosData.map((data, index) => (
            <Box key={index}>
              <Video data={data} />
              <Text bg={'dark'} my={2}>
                Teams:{data.players}
              </Text>
              <Text bg={'dark'}>Competition:{data.competition}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </>
  );
};

export default PlayerVideo;
