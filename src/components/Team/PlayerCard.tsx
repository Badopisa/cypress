import {Text, Avatar, Center, Box, Img, Stack} from '@chakra-ui/react';

const PlayerCard = ({
                        name,
                        position,
                        status,
                        image,
                        team,
                        click,
                    }: {
    name: string;
    position?: string;
    status?: string;
    image: string;
    team?: string;
    click?: () => void;
}) => {
    return (
        <Box
            bg='dark'
            borderRadius='lg'
            // key={index}
            onClick={click}
            cursor={'pointer'}
        >
            <Stack py={4} position={'relative'}>
                <Center>
                    <Avatar src={image} size={'xl'} />
                </Center>

                <Box p={2}>
                    <Stack spacing={3} align={'center'} mb={5}>
                        <Text fontSize='sm' fontWeight='semibold'>
                            {name}
                        </Text>
                        <Text fontSize='xs' fontWeight='medium'>
                            {position}
                        </Text>
                        <Text fontSize='xs' fontWeight='medium'>
                            {team}
                        </Text>
                    </Stack>
                </Box>
                <Box position={'absolute'} right={4} top={4}>
                    {' '}
                    <Img src='/icons/more_vert.svg' alt='edit' />
                </Box>
            </Stack>
        </Box>
    );
};

export default PlayerCard;
