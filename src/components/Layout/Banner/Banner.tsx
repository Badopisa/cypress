import React from 'react';
import { Flex, Text, Heading, VStack } from '@chakra-ui/react';

const Banner = ({
    heading,
    subHeading,
    content
}: {
    heading: string;
    subHeading: string;
    content: string;
}) => {
    return (
        <Flex
            mt="4"
            bg="black"
            color="white"
            backgroundImage="/images/image/banner2.png"
            justifyContent="center"
            py={{ base: 4, md: 8 }}
            px={{ base: 6 }}>
            <VStack alignContent="center" spacing={4}>
                <Text align="center" fontSize={{ base: 'xl', md: '5xl' }}>
                    <Text as="span" color="yellow">
                        {heading}
                    </Text>{' '}
                    {subHeading}
                </Text>
                <Text align="center" fontSize="sm">
                    {content}
                </Text>
            </VStack>
        </Flex>
    );
};

export default Banner;
