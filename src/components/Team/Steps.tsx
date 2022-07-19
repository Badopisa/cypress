import {
    Text,
    HStack,
    Flex,
    CircularProgress,
    CircularProgressLabel,
    Image
} from '@chakra-ui/react';

const imageUrl = '/images/image/checked.svg';

const Steps = ({ current }: { current: number }) => {
    return (
        <Flex
            direction={{ base: 'column', md: 'row' }}
            justifyContent="space-between"
            w="90%"
            mt="2rem">
            <HStack>
                <CircularProgress value={100} color={current !== 1 ? 'white' : '#FFC300'}>
                    <CircularProgressLabel boxSize={current > 1 ? '5rem' : ''}>
                        {current > 1 ? <Image src={imageUrl} alt="checked" mt="2.5px" /> : '1'}
                    </CircularProgressLabel>
                </CircularProgress>
                <Text color={current > 1 ? '#00BB4C' : '#FFC300'} fontSize="lg" fontWeight="medium">
                    Team Information
                </Text>
            </HStack>
            <HStack mt={{ base: '0.5rem' }}>
                <CircularProgress value={100} color={current !== 2 ? 'white' : '#FFC300'}>
                    <CircularProgressLabel boxSize={current > 2 ? '5rem' : ''}>
                        {current > 2 ? <Image src={imageUrl} alt="checked" mt="2.5px" /> : '2'}
                    </CircularProgressLabel>
                </CircularProgress>
                <Text color={current > 2 ? '#00BB4C' : '#FFC300'} fontSize="lg" fontWeight="medium">
                    Add Your Players
                </Text>
            </HStack>
            <HStack mt={{ base: '0.5rem' }}>
                <CircularProgress value={100} color={current !== 3 ? 'white' : '#FFC300'}>
                    <CircularProgressLabel boxSize={current > 3 ? '5rem' : ''}>
                        {current > 3 ? <Image src={imageUrl} alt="checked" mt="2.5px" /> : '3'}
                    </CircularProgressLabel>
                </CircularProgress>
                <Text color={current > 3 ? '#00BB4C' : '#FFC300'} fontSize="lg" fontWeight="medium">
                    Backroom Staff
                </Text>
            </HStack>
        </Flex>
    );
};

export default Steps;
