import { Text, Avatar, Flex, Center } from '@chakra-ui/react';

const TeamCard = ({
    name,
    noOfPlayers,
    noOfStaff,
    image,
    click
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
            direction="column"
            align="center"
            bg="grey6"
            rounded={10}
            py={{ base: 6, md: 6 }}
            onClick={click}
            cursor={'pointer'}>
            <Center>
                <Avatar name={name} src={image} w={'66px'} h={'66px'} />
            </Center>
            <Text fontSize="14px" color={'black2'} fontWeight="semibold">
                {name}
            </Text>
            <Text fontSize="12px" color={'black2'} fontWeight="medium">
                {noOfPlayers} Players
            </Text>
            <Text fontSize="xs" color="black5" fontWeight="normal">
                {noOfStaff} Staff
            </Text>
        </Flex>
    );
};

export default TeamCard;
