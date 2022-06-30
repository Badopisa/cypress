import React from 'react';
import { Text, Stack, Spacer, Button, Flex, VStack, Box } from '@chakra-ui/react';

const FeatureCard = ({
    image,
    heading,
    title
}: {
    image: string;
    heading: string;
    title: string;
}) => {
    return (
        <Flex
            height="500px"
            position="relative"
            bg="black"
            color="white"
            backgroundImage={image}
            backgroundSize="cover"
            backgroundPosition="center center"
            rounded={3}
            justifyContent="center">
            <Box position="absolute" top="60%">
                <VStack spacing={2} align="center">
                    <Text fontSize="xs">{title}</Text>
                    <Text fontSize={'3xl'} fontWeight="semibold">
                        {heading}
                    </Text>
                    <Button w="40" variant="action">
                        START
                    </Button>
                </VStack>
            </Box>
        </Flex>
    );
};

export default FeatureCard;
