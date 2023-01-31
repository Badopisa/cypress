import { Flex, FormControl, GridItem, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import { FormImage, FormDetails } from '@/components/Form';
import React from 'react';

const ResetPassword = () => {
    return (
        <Flex h="100vh" direction={{ base: 'column-reverse', md: 'row' }}>
            <FormImage
                image="/images/image/login-coach.jpg"
                title="GET STARTED AS"
                body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut purus rhoncus lectus posuere elit et."
                hasRole
                designation="A COACH"
            />
            <FormDetails
                hasAccount={true}
                buttonText="SET NEW PASSWORD"
                // coloredTitle="Set New"
                title="Password"
                subtitle="Create a new Password">
                <>
                    <GridItem colSpan={1}>
                        <FormControl>
                            <FormLabel htmlFor="password">New Password</FormLabel>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your new password"
                            />
                            <FormErrorMessage>Password is required.</FormErrorMessage>
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={1} my={5}>
                        <FormControl>
                            <FormLabel htmlFor="password">Confirm Password</FormLabel>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Confirm Password"
                            />
                            <FormErrorMessage>Password is required.</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                </>
            </FormDetails>
        </Flex>
    );
};

export default ResetPassword;
