import {
  Text,
  Avatar,
  Flex,
  Center,
  Box,
  Heading,
  Img,
  Stack,
  HStack,
} from '@chakra-ui/react';

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
      <Stack py={4}>
        <Flex justify='center' gap={2}>
          <Avatar src={image} size={'l'} placeSelf={'center'} mr={4} />
          <Box>
            {' '}
            <Img src='/icons/more_vert.svg' alt='edit' />
          </Box>
        </Flex>

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
      </Stack>
    </Box>
  );
};

export default PlayerCard;
