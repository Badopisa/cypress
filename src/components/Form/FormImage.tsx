import React from 'react';
import {  VStack, Stack, Text, Container, Heading} from '@chakra-ui/react';


const FormImage = ({image, title, body, isAdmin}: {image: string, title: string, body: string, isAdmin?: boolean}) => {

  return(
        <VStack bgRepeat="no-repeat" backgroundSize="cover" bgImage={image} w="full" alignItems="flex-start">
            <Container size="container.lg" height="600px" position="relative">
              <Stack
                spacing={3}
                w={'full'}
                maxW={'lg'}
                position="absolute"
                top="60%"
                transform="translate(0, -50%)"
                color="white"
                >
                {
                  isAdmin ?
                  <>
                    <Text variant="title">
                      {title}
                    </Text>
                    <Text fontSize="25" fontWeight="light">
                      {body}
                    </Text>
                    
                  </>
                  :
                  <>
                    <Text fontSize="25" fontWeight="light">
                      {title}
                    </Text>
                    <Text variant="title">
                      {body}
                    </Text>
                  </>
                }
              </Stack>
            </Container>
        </VStack>

    )
}

export default FormImage