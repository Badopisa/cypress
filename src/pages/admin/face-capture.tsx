import React from 'react'
import { Flex, Box, Center, InputGroup,FormLabel,InputRightElement , Input, FormErrorMessage, Text, Stack, Checkbox, Link, Spacer} from '@chakra-ui/react';
import { FormImage, FormDetails } from '@/components/Form';
import {AiFillEyeInvisible} from 'react-icons/ai'


const FaceCapture = () => {
    return (
        <Flex h="calc(100vh)" direction={{ base: 'column-reverse', md: 'row' }}>
			<FormImage image="/images/image/login-coach.jpg" title="GET STARTED AS" body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut purus rhoncus lectus posuere elit et." hasRole role="A COACH"/>
			<FormDetails
				hasFormFooter={false}
				buttonText="TAKE PICTURE"
				coloredTitle="Face"
				title="Your Potential"
				subTitle="2 of 2"
                mt="1"
                hasArror={true}
    
			>
			<>
                <Center>
                <Box boxSize='xs' bg='grey' rounded={18}>
                </Box>
                </Center>
                <Text textAlign='center' fontWeight='md' fontSize='xs'>Keep your head up and make sure your face fits into the centre</Text>
			</>
			</FormDetails>
		</Flex>
    )
}

export default FaceCapture
