import React, { useState } from 'react';
import { Text, Box, Stack, Button, SimpleGrid, HStack, Icon } from '@chakra-ui/react';
import GuestWrapper from '@/components/Layout/GuestWrapper/GuestWrapper';
import { teams } from '@/data/TeamData';
import FooterHero from '@/components/Layout/Footer/FooterHero';

const About = () => {
    const [activeCard, setActiveCard] = useState<number | null>(null);

    return (
        <GuestWrapper>
            <Box
                bgRepeat="no-repeat"
                backgroundSize="cover"
                py={32}
                h="100vh"
                bgImage="linear-gradient(rgba(0, 0, 0, 0.9),rgba(0, 0, 0, 0.9)) , url('/images/image/about.jpg')"
                w="full">
                <Stack direction="column" color="white" align="center" spacing={8} py={8}>
                    <Text fontSize="md" fontWeight="medium">
                        HOME / ABOUT US
                    </Text>
                    <Text
                        color="yellow"
                        fontWeight="semibold"
                        fontSize={{ base: '2xl', md: '6xl' }}>
                        Who{' '}
                        <Text as="span" color="white">
                            We Are
                        </Text>
                    </Text>
                    <Text boxSize={{ base: '80%', md: '40%' }} align="center">
                        Sonalysis is our aim at providing/delivering in real time detailed analytics
                        of a soccer game to users right from their comfort in Africa and beyond. We
                        hope to distribute information to both technical and non-technical users by
                        making our application user friendly and easily accessible. Creating a web
                        application that can collate analytical data from a soccer match that will
                        be accessible to anyone.
                    </Text>
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={6}>
                        <Button variant="action" fontWeight="semibold" px={8}>
                            REQUEST A DEMO
                        </Button>
                        <Button variant="outline" fontWeight="semibold" px={8}>
                            CONTACT US
                        </Button>
                    </Stack>
                </Stack>
            </Box>
            <Stack direction="column" bg="black" align="center" py={16}>
                <Text color="white" fontWeight="semibold" fontSize="5xl">
                    Meet{' '}
                    <Text as="span" color="yellow">
                        Our Team
                    </Text>
                </Text>
                <Text color="white" boxSize="50%" align="center">
                    Our mission is to create a soccer analytics applications that can compete with
                    the likes of Sportloginq for real time analysis of soccer games and real time
                    delivery.
                </Text>

                <SimpleGrid columns={[1, null, 4]} spacing={8} py={12}>
                    {teams.map((team, index) => (
                        <Box
                            key={index}
                            boxSize="2xs"
                            bgRepeat="no-repeat"
                            backgroundSize="cover"
                            backgroundImage={team.image}
                            onMouseOver={() => setActiveCard(team.id)}
                            onMouseLeave={() => setActiveCard(null)}>
                            {activeCard === team.id && (
                                <Stack
                                    rounded={3}
                                    direction="column"
                                    spacing={6}
                                    py={14}
                                    align="center"
                                    h="full"
                                    color="dark"
                                    bgGradient={
                                        'linear(to-r, rgba(255,255,0,0.5), rgba(255,255,0,0.5))'
                                    }>
                                    <Text fontSize="xl" fontWeight="semibold">
                                        {team.name}
                                    </Text>
                                    <Text fontSize="md" fontWeight="normal">
                                        {team.role}
                                    </Text>
                                    <HStack spacing={8}>
                                        {team.socials.map((social, key) => (
                                            <Icon
                                                key={key}
                                                as={social.icon}
                                                w={6}
                                                h={6}
                                                color="black"
                                            />
                                        ))}
                                    </HStack>
                                </Stack>
                            )}
                        </Box>
                    ))}
                </SimpleGrid>
                <FooterHero />
            </Stack>
        </GuestWrapper>
    );
};

export default About;
