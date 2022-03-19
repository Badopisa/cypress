import React, { ReactElement } from 'react';
import { VStack, chakra,Text, SimpleGrid, GridItem, Button, Stack, HStack } from '@chakra-ui/react';
import Link from "@/components/Elements/Link/Link"
import {BiArrowBack} from 'react-icons/bi'

type FormDetailsType = {
    children: ReactElement,
    coloredTitle: string,
    title: string,
    subTitle: string,
    buttonText?: string,
    hasFormFooter?: boolean,
    hasAccount?: boolean,
    tW?: string,
    mt?: string,
    hasArror?: boolean,
    hasFooter?: boolean
}

const FormDetails = ({children, coloredTitle,title, subTitle, buttonText, hasFormFooter=false, hasAccount=false, tW="90%", mt="20", hasArror, hasFooter=true}: FormDetailsType) => {
  return (
        <VStack bgColor="black" color="white" w="full" h="full"  p={{base: 20, sm: 20}}  spacing={10} alignItems="flex-start">
            {
                hasArror &&
                <HStack spacing={6} py={{base:2, md:4}}>
                    <BiArrowBack size='1.25rem'/>
                    <Text >Back</Text>
                </HStack>
            }
            <VStack mt={mt} spacing={1} alignItems="flex-start">
                <Text fontSize="3xl" fontWeight="semibold">
                    <chakra.span color="yellow">
                        {coloredTitle}&nbsp;
                    </chakra.span>
                    {title}          
                </Text>
                <Text w={tW}>{subTitle}</Text>
            </VStack>
            <SimpleGrid columns={1}  rowGap={5} w="80%">
                {children}
                {

                    hasFooter &&

                    <>
                        <GridItem colSpan={1}>
                            <Button variant="action" size="lg" w="full">{buttonText}</Button>
                        </GridItem>
                        <Stack >
                            {
                                hasAccount ?

                                <Text align={'center'}>
                                    Already have an account? <Link href="/login" fontWeight="semibold">Login</Link>
                                </Text>

                                :

                                <Text align={'center'}>
                                    Don't Have an Account? <Link href="/registration" fontWeight="semibold">Get Started</Link>
                                </Text>
                            }
                        </Stack>
                        
                        {
                            hasFormFooter && <Stack>
                            <Text align={'center'}>
                                <Link href="/forgot-password"> <Text fontWeight="semibold">Forgot Password</Text></Link>
                            </Text>
                        </Stack>
                        }
                    </>
                }
            </SimpleGrid>

            
        </VStack>
  );
}

export default FormDetails