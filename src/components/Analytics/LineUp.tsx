import { allEventsData } from '@/data/AnalyticsData';
import {
    FormControl,
    Select,
    Box,
    Avatar,
    Text,
    Flex,
    Heading,
    Stack,
    SimpleGrid,
    Img
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

const LineUp = () => {
    const router = useRouter();

    const handleOpenPlayerDetails = () => {
        router.push('/dashboard/analytics/playerDetails');
    };
    return (
        <>
            <FormControl w="50%">
                <Select bg="ash" outline="none" placeholder="">
                    <option value="option1" selected>
                        {' '}
                        Manchester United vs{' '}
                    </option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </Select>
            </FormControl>
            <Text>Below are the players gotten from the analyzed video</Text>
            <SimpleGrid columns={[1, 2, 3]} spacing={8}>
                {allEventsData
                    .map((data, index) => (
                        <Box
                            bg="dark"
                            borderRadius="lg"
                            key={index}
                            onClick={handleOpenPlayerDetails}>
                            <Stack align="center" py={4}>
                                <Flex justify="center" gap={2}>
                                    <Avatar src="/images/imgs/player.svg" size={'xl'} />
                                    <Box>
                                        <Img src="/icons/edit-pen.svg" alt="edit" />
                                    </Box>
                                </Flex>
                                <Box p={2}>
                                    <Stack spacing={3} align={'center'} mb={5}>
                                        <Heading
                                            fontSize={'xl'}
                                            fontWeight={500}
                                            fontFamily={'body'}>
                                            {data.playerName}
                                        </Heading>
                                        <Text>{data.playerPosition}</Text>
                                        <Text color="ash">{data.jerseyNo}</Text>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Box>
                    ))
                    .slice(0, 11)}
            </SimpleGrid>
        </>
    );
};
export default LineUp;
