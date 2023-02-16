import {
    Text,
    HStack,
    Flex,
    CircularProgress,
    CircularProgressLabel,
    Image,
    VStack,
    Box
} from '@chakra-ui/react';
import React from 'react';

const Steps4 = ({ current }: { current: number }) => {
    const getWidth = () => {
        if (current === 1) return '25%';
        if (current === 2) return '50%';
        if (current === 3) return '75%';
        if (current === 4) return '100%';
    };
    return (
        <VStack alignItems={'flex-start'}>
            <Text
                bgGradient={'linear-gradient(to right, #9741FF, #645EFD, #007DB3)'}
                bgClip={'text'}
                as={'u'}
                fontWeight="500">
                {`${current} of 4`}
            </Text>
            <Box w={'100%'} position={'relative'}>
                <Box position={'absolute'} w={getWidth()} h={'4px'} bg={'primary'} />
                <Box w={'100%'} h={'4px'} bg={'grey100'} />
            </Box>
        </VStack>
    );
};

export default Steps4;
