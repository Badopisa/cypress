import { Flex, FormControl, GridItem, FormLabel, Input, FormErrorMessage} from '@chakra-ui/react';
import { FormImage, FormDetails } from '@/components/Form';

const Login = () => {
	return (
        <main>
		<Flex h="100vh" direction={{ base: 'column-reverse', md: 'row' }}>
			<FormImage image="/images/image/login-coach.jpg" title="CONTINUE AS" body="A Coach" />
			<FormDetails
				hasFormFooter={true}
				buttonText="LOGIN"
				coloredTitle="Continue"
				title="Your Analysis Coach"
				subTitle="Welcome back and get to see what has been happening since you’ve been gone"
			>
				<>
          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" name="email" type="email" placeholder="john@doe.com" />
              <FormErrorMessage>Email is required and must be valid.</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem colSpan={1}>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input id="password" name="password" type="password" placeholder="Enter your password" />
              <FormErrorMessage>Password is required.</FormErrorMessage>
            </FormControl>
          </GridItem>
        </>
			</FormDetails>
		</Flex>
        </main>
	);
};

export default Login;

