import React from 'react'
import { VStack,  Text, Center, Box, Image} from '@chakra-ui/react'

const OfferCard = ({title, subTitle, image}: {title: string, subTitle: string, image: string}) => {
    return (
        <Box  px={8} py={12} bg='dark' color='white' rounded={3}>
            <Center>    
                <VStack spacing={8} >
                    <Image  src={image}/>
                    <Text fontSize='3xl' fontWeight='medium'>{title}</Text>
                    <Text align="center" width="90%" fontSize='md' fontWeight='normal' >{subTitle}</Text>
                </VStack>
            </Center>
        </Box>
    )
}
export default OfferCard
