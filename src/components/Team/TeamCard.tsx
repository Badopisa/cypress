import { Text, Avatar, Flex, Center } from '@chakra-ui/react';

const TeamCard = ({
  name,
  noOfPlayers,
  noOfStaff,
  image,
  click,
}: {
  name: string;
  noOfPlayers?: number;
  noOfStaff?: number;
  image: string;
  click?: () => void;
}) => {
  return (
    <Flex
      gap={3}
      direction='column'
      align='center'
      bg='dark'
      rounded={10}
      py={{ base: 6, md: 6 }}
      onClick={click}
      cursor={'pointer'}
    >
      <Center>
        <Avatar src={image} boxSize='10' />
      </Center>
      <Text fontSize='sm' fontWeight='semibold'>
        {name}
      </Text>
      <Text fontSize='xs' fontWeight='medium'>
        {noOfPlayers} Players
      </Text>
      <Text fontSize='xs' color='muted' fontWeight='normal'>
        {noOfStaff}Staff
      </Text>
    </Flex>
  );
};

export default TeamCard;
