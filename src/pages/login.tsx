import { Flex,FormControl, Button, FormLabel, Input, FormErrorMessage,VStack, SimpleGrid, Text, InputGroup, InputRightElement, chakra, useToast} from '@chakra-ui/react'
import { FormImage} from '@/components/Form';
import { useForm } from "react-hook-form";
import {AiFillEyeInvisible} from 'react-icons/ai'
import { useDispatch, useSelector,RootStateOrAny } from 'react-redux';
import Link from "@/components/Elements/Link/Link"
import { adminLogin } from '@/store/actions/authActions';
import { useRouter } from 'next/router'

const Login = () => {

  const {
      handleSubmit,
      register,
      formState: { errors }
  } = useForm();

  const {isLoading}= useSelector((state: RootStateOrAny) => state.msg)
  const dispatch = useDispatch()
  const router = useRouter()
  const toast = useToast()

  const onSubmit = (value: any) => {
      const payload = {
        email: value.email,
        password: value.password
      }
      dispatch(adminLogin(payload, toast, router))
  }
	return (
    <main>
		<Flex h="100vh" direction={{ base: 'column-reverse', md: 'row' }}>
			<FormImage image="/images/image/login-coach.jpg" title="CONTINUE AS" body="A Coach" />
        <VStack bgColor="black" color="white" w="full" h="full"  p={{base: 2, sm: 20}}  spacing={10} alignItems={{base: "center", md:"flex-start"}}>
                    <VStack mt={10} spacing={1} alignItems={{base:"center", md: "flex-start"}}>
                        <Text fontSize="3xl" fontWeight="semibold">
                            <chakra.span color="yellow">
                              Continue&nbsp;
                            </chakra.span>
                            Your Analysis Coach          
                        </Text>
                        <Text w={{base: "90%"}} align={{base:"center", md: "start"}}>Welcome back and get to see what has been happening since you’ve been gone</Text>
                    </VStack>
                    <SimpleGrid columns={1}  rowGap={5} w="80%">   
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl mb={8} isInvalid={errors.email}>
                            <FormLabel htmlFor="email">
                                Email
                            </FormLabel>
                            <Input  
                                {...register("email", {
                                    required: "Email is required",
                                    minLength: { value: 4, message: "Email is Required" }
                                })} id="email"  type="email" placeholder="Enter your email"/>
                            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl mb={10} isInvalid={errors.password}>
                            <FormLabel htmlFor="password">
                                Password
                            </FormLabel>
                            <InputGroup>
                                <Input {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 4, message: "Password is Required" }
                                })} id="password"  type="password" placeholder="At least 8+ characters"/>
                                <InputRightElement children={<AiFillEyeInvisible color='green.500' />} />
                            </InputGroup>
                            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                        </FormControl>
                        <Button isLoading={isLoading} type="submit" variant="action" size="lg" w="full">LOGIN</Button>
                    </form>  
                    <Text align={'center'}>
                        Don't Have an Account? <Link href="/registration" fontWeight="semibold">Get Started</Link>
                    </Text>  
                    <Text align={'center'}>
                        <Link href="/forgot-password"> <Text fontWeight="semibold">Forgot Password</Text></Link>
                    </Text>
                </SimpleGrid>
             </VStack>
		  </Flex>
    </main>
	);
};

export default Login;

