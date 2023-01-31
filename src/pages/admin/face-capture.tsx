import React from 'react';
import { Flex, Box, Center, Text } from '@chakra-ui/react';
import { FormImage, FormDetails } from '@/components/Form';

const FaceCapture = () => {
    return (
        <Flex h="calc(100vh)" direction={{ base: 'column-reverse', md: 'row' }}>
            <FormImage
                image="/images/image/login-coach.jpg"
                title="GET STARTED AS"
                body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut purus rhoncus lectus posuere elit et."
                designation="A COACH"
                hasRole
            />
            <FormDetails
                hasFormFooter={false}
                buttonText="TAKE PICTURE"
                // coloredTitle="Face"
                title="Your Potential"
                subtitle="2 of 2"
                mt="1"
                // hasArror={true}
            >
                <>
                    <Center>
                        <Box boxSize="xs" bg="grey" rounded={18} />
                    </Center>
                    <Text textAlign="center" fontWeight="md" fontSize="xs">
                        Keep your head up and make sure your face fits into the centre
                    </Text>
                </>
            </FormDetails>
        </Flex>
    );
};

export default FaceCapture;
