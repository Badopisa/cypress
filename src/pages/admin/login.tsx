import React from 'react'
import {
    Flex,
    FormControl,
    GridItem,
    InputGroup,
    FormLabel,
    InputRightElement,
    Input,
    FormErrorMessage,
    Text,
    Stack,
    Checkbox,
    Link,
    Spacer
} from '@chakra-ui/react';
import {FormImage, FormDetails} from '@/components/Form';
import {AiFillEyeInvisible} from 'react-icons/ai'


const Login = () => {
    return (
        <Flex h="calc(100vh)" direction={{base: 'column-reverse', md: 'row'}}>
            <FormImage image="/images/image/login-coach.jpg" title="GET STARTED AS"
                       body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut purus rhoncus lectus posuere elit et."
                       hasRole role="A COACH" />
            <FormDetails
                hasFormFooter={false}
                buttonText="LOGIN"
                coloredTitle="Unlock"
                title="Your Potential"
                subTitle="Please fill in the following details to bring your dream to life"
            >
                <>
                    <GridItem colSpan={1}>
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input id="email" name="email" type="email" placeholder="example@gmail.com" />
                            <FormErrorMessage>Email is required and must be valid.</FormErrorMessage>
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <InputGroup>
                                <Input id="password" type="password" placeholder="At least 8+ characters" />
                                <InputRightElement>
                                    <AiFillEyeInvisible color='green.500' />
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>Password is required.</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                    <Stack direction='row'>
                        <Checkbox>Remember me</Checkbox>
                        <Spacer />
                        <Link href='/'>
                            Forgot Password?
                        </Link>
                    </Stack>
                </>
            </FormDetails>
        </Flex>
    )
}

export default Login
