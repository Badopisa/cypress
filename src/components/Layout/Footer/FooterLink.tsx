import React from 'react'
import {Stack, Text,Image,SimpleGrid, Heading, VStack, HStack, Input, Button} from '@chakra-ui/react'
import Link from "@/components/Elements/Link/Link"

const FooterLink = () => {
  return (

    <SimpleGrid
        px={{base: 4, md: 12 }}
        py={{base: 20, md: 24 }}
        columns={{base: 1, md: 4}}
        spacing={10}
    >
        <Stack align={{ base: 'center', lg: 'flex-start' }}>
            <Heading size="sm" py={2}>
                SONALYSIS
            </Heading>
            <Link href="/"><Text variant="linkText" align="start" fontWeight="medium"> Home </Text></Link>
            <Link href="/about-us"><Text variant="linkText" align="start" fontWeight="medium"> About </Text></Link>
            <Link href="/blog"><Text variant="linkText" align="start" fontWeight="medium"> Blog </Text></Link>
            <Link href="/contact"><Text variant="linkText" align="start" fontWeight="medium"> Contact us </Text></Link>
        </Stack>
        <Stack align={{ base: 'center', lg: 'flex-start' }}>
            <Heading size="sm" py={2}>
                PRODUCT
            </Heading>
            <Text variant="linkText" align="start" fontWeight="medium" cursor="pointer"> Request a Demo </Text>
            <Text variant="linkText"  align="start" fontWeight="medium"> Login </Text>
            <Text variant="linkText"  align="start" fontWeight="medium"> Pricing </Text>
        </Stack>
        <Stack align={{ base: 'center', lg: 'flex-start' }}>
            <Heading size="sm" py={2}>
                HELP
            </Heading>
            <Text variant="linkText"  align="start" fontWeight="medium"> Getting started </Text>
            <Text variant="linkText"  align="start" fontWeight="medium"> FAQs </Text>
        </Stack>
        <VStack spacing={4} color='grey' align={{ base: 'center', lg: 'flex-start' }}>
            <Text color='white' fontSize='lg' fontWeight='semibold'>SUBSCRIBE</Text>
            <HStack>
              <Input id="email"  name="email"  type="email" placeholder="Enter your email"/>
              <Button variant='actionWhite'>SEND</Button>
            </HStack>
            <HStack color='white' align={{ base: 'center', lg: 'flex-start' }} spacing={8}>
                <Image src="/icons/facebook.svg"/>
                <Image src="icons/twitter.svg"/>
                <Image src="icons/LinkedIn.svg"/>
            </HStack>
        </VStack> 
    </SimpleGrid>
    
  )
}

export default FooterLink