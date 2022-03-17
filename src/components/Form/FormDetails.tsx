import React, { ReactElement } from 'react';
import { VStack, chakra,Text, SimpleGrid, GridItem, Button, Stack } from '@chakra-ui/react';
import Link from "@/components/Elements/Link/Link"

type FormDetailsType = {
    children: ReactElement,
    coloredTitle: string,
    title: string,
    subTitle: string,
    buttonText: string,
    hasFormFooter?: boolean,
    hasAccount?: boolean,
    tW?: string
}

const FormDetails = ({children, coloredTitle,title, subTitle, buttonText, hasFormFooter=false, hasAccount=false, tW="90%"}: FormDetailsType) => {
  return (
        <VStack bgColor="black" color="white" w="full" h="full"  p={{base: 20, sm: 20}}  spacing={10} alignItems="flex-start">
            <VStack mt="20" spacing={1} alignItems="flex-start">
                <Text fontSize="3xl" fontWeight="semibold">
                    <chakra.span color="yellow">
                        {coloredTitle}&nbsp;
                    </chakra.span>
                    {title}          
                </Text>
                <Text w={tW}>{subTitle}</Text>
            </VStack>
            <SimpleGrid columns={1}  rowGap={10} w="80%">
                {children}
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
            </SimpleGrid>

            
        </VStack>
  );
}

export default FormDetails