import {
	Text,
	Avatar,
    Flex,
    Center

} from '@chakra-ui/react';

const PlayerCard = ({name, position, status, image}: {name: string, position?: string, status: string, image: string}) => {
    return (
       <Flex gap={3} direction='column' align='center' bg="dark"  rounded={10} py={{base:6, md:6}}>
           <Center>
                <Avatar src={image} boxSize="10"  />
            </Center>
           <Text fontSize='sm' fontWeight='semibold'>{name}</Text>
           <Text fontSize='xs' fontWeight='medium'>{position}</Text>
           <Text fontSize='xs' color="muted" fontWeight='normal'>{status}</Text>
       </Flex>
    )
}

export default PlayerCard
