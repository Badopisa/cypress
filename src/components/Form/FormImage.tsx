import React from 'react';
import {VStack, Stack, Text, Container, Heading, Box} from '@chakra-ui/react';


const FormImage = ({
                       image,
                       title,
                       body,
                       isAdmin,
                       hasRole,
                       role
                   }: { image: string, title: string, body: string, isAdmin?: boolean, hasRole?: boolean, role?: string }) => {

    return (
        <VStack bgRepeat="no-repeat" backgroundSize="cover" bgImage={image} w="full" alignItems="flex-start">
            <Box width="100%" height="100%" position="absolute" backgroundColor="#30006B" opacity={0.6} />
            <Container size="container.lg" height="600px" position="relative">
                <Stack
                    spacing={3}
                    w={'full'}
                    maxW={'lg'}
                    position="absolute"
                    top="60%"
                    left="15%"
                    transform="translate(0, -50%)"
                    color="white"
                >
                    {
                        isAdmin ?
                            <>
                                <Text fontSize="54px" lineHeight="63px" variant="title">
                                    {title}
                                </Text>
                                <Text fontSize="18" fontWeight="light">
                                    {body}
                                </Text>

                            </>
                            :
                            <>
                                <Text fontSize="25" fontWeight="light">
                                    {title}
                                </Text>
                                {
                                    hasRole &&
                                    <Text fontSize="4xl" fontWeight="black">
                                        {role}
                                    </Text>
                                }
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
