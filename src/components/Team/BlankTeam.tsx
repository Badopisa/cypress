import React from 'react'
import {
	Text,
	Box,
	Center,
    Flex,
    Image
} from '@chakra-ui/react';

const BlankTeam = ({title, image}: {title:string, image:string}) => {
    return (
        
        <Box mt={6} w="100%" bg="dark" borderRadius="10px" p="18px" mb={12}>
            <Flex textAlign="center" mt="auto" direction="column">
                <Center mt="24px" mb="24px">
                    <Image src={image} alt="jersy" h="66px" />
                </Center>
                <Text fontSize="18px" fontWeight="500" mb={4}>
                    {title}
                </Text>
                <Center>
                    <Text fontSize="14px" fontWeight="400" mb={8} w={{base:'100%',md:"30%"}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor, nullam id aliquam.
                    </Text>
                </Center>
            </Flex>
         </Box>
    )
}

export default BlankTeam
