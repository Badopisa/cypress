import { Text, Avatar, Center, Box, Img, Stack } from '@chakra-ui/react';

const PlayerCard = ({
    name,
    position,
    image,
    team,
    click
}: {
    name: string;
    position?: string;
    status?: string;
    image?: string;
    team?: string;
    click?: () => void;
}) => {
    return (
        <Box
            bg="grey6"
            borderRadius="10px"
            position={'relative'}
            // key={index}
            // maxW={'250px'}
            px={'33px'}
            pt={'19px'}
            onClick={click}
            cursor={'pointer'}>
            <Stack py={4}>
                <Center>
                    <Avatar name={name} src={image} size={'xl'} />
                </Center>

                <Box color={'black2'} p={2}>
                    <Stack spacing={3} align={'center'} mb={5}>
                        <Text fontSize="20px" fontWeight="500">
                            {name}
                        </Text>
                        <Text color={'grey2'} fontSize="20px" fontWeight="500">
                            No. {position}
                        </Text>
                        <Text fontSize="20px" fontWeight="500">
                            {team}
                        </Text>
                    </Stack>
                </Box>
                <Box position={'absolute'} right={4} top={4}>
                    {' '}
                    <Img src="/icons/more_vert.svg" alt="edit" />
                </Box>
            </Stack>
        </Box>
    );
};

export default PlayerCard;
