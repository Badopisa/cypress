import React from 'react';
import { Heading, Flex, VStack, Button, Box, Text, SimpleGrid, Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const FooterHero = () => {
    const router = useRouter();
    return (
        <Center color="white">
            <Flex
                w="80%"
                direction={{ base: 'column', md: 'row' }}
                px={{ base: 4, md: 12 }}
                py={{ base: 4, md: 12 }}
                bgImage="linear-gradient(rgba(48, 0, 107, 0.9),rgba(129, 26, 255, 0.5)) , url('/images/image/groupBanner.png')"
                backgroundSize="cover"
                backgroundPosition="center center"
                zIndex="1"
                transform="auto"
                translateY={50}>
                <SimpleGrid
                    textAlign={{ base: 'center', md: 'start' }}
                    px={{ base: 0, md: 14 }}
                    columns={{ base: 1, sm: 1, md: 2 }}>
                    <VStack w={{ base: 'full', md: 'xl' }}>
                        <Heading
                            as="h2"
                            fontSize={{ base: '3xl', md: '5xl' }}
                            fontWeight="semibold">
                            Start Analyzing Your Game Today!
                        </Heading>
                        <Text py={{ base: 2 }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor, nullam
                            id aliquam.
                        </Text>
                    </VStack>
                    <Box py={{ base: 0, md: 14 }} px={{ base: 0, md: 40 }}>
                        <Button onClick={() => router.push('/admin/registration')} variant="action">
                            GET STARTED
                        </Button>
                    </Box>
                </SimpleGrid>
            </Flex>
        </Center>
    );
};

export default FooterHero;
