import {
    Flex,
    FormControl,
    GridItem,
    FormLabel,
    Input,
    FormErrorMessage,
    Text,
    chakra
} from '@chakra-ui/react';
import { FormImage, FormDetails } from '@/components/Form';
import React from 'react';

const ResetPassword = () => {
    return (
        <Flex h="100vh" direction={{ base: 'column-reverse', md: 'row' }}>
            <FormImage image="/images/image/login-coach.jpg" title="Reset" body="PASSWORD" />
            <FormDetails
                hasAccount={true}
                buttonText="SET NEW PASSWORD"
                coloredTitle="Set New"
                title="Password"
                subTitle="Create a new Password">
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
                    <GridItem colSpan={1}>
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
