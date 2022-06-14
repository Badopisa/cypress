import { matchStatsData } from '@/data/AnalyticsData';
import { Box, VStack, Flex, Img, Spacer, Text } from '@chakra-ui/react';

const MatchStats = () => {
  return (
    <Box bg='dark' borderRadius='lg' p={8}>
      <VStack w='100%' alignItems='left'>
        <Flex>
          <Box p='4'>
            <VStack>
              <Img src='/images/imgs/manu.svg' alt='team 1' />
              <Text>Manchester United</Text>
            </VStack>
          </Box>
          <Spacer />
          <Box p='4'>
            <Text fontSize='xl'>2-0</Text>
          </Box>
          <Spacer />
          <Box p='4'>
            <VStack>
              <Img src='/images/imgs/chelsea.svg' alt='team 2' />
              <Text>Chelsea FC</Text>
            </VStack>
          </Box>
        </Flex>
        {matchStatsData.map((data, index) => (
          <>
            <Flex key={index} bg='black' borderRadius='lg' px={3}>
              <Box p='2'>
                <Text>{data.team1Stats}</Text>
              </Box>
              <Spacer />
              <Box p='2'>
                <Text>{data.statsType}</Text>
              </Box>
              <Spacer />
              <Box p='2'>
                <Text>{data.team2Stats}</Text>
              </Box>
            </Flex>
            <Spacer />
          </>
        ))}
      </VStack>
    </Box>
  );
};
export default MatchStats;
