import React from 'react'
import {Flex, Avatar, Text, HStack, Button, Spacer} from '@chakra-ui/react'
const PlayerExistingCard = ({name, position, image, click}:{name:string, position: string, image: string, click: ()=> void}) => {
    return (
        <HStack w='100%'>
            <Flex direction="row" alignItems="center">
                    <Avatar name="" src={image} w="33px" h="33px" />
                    <Flex direction="column" ml={2}>
                        <Text fontSize="md" fontWeight="500">
                            {name}
                        </Text>
                        <Text fontSize="sm" fontWeight="400">
                            {position}
                        </Text>
                    </Flex>
                </Flex>
            <Spacer />
            <Button variant="outline" _hover={{ bg: '#811AFF' }} onClick={click}>SELECT</Button>
        </HStack>
    )
}

export default PlayerExistingCard
