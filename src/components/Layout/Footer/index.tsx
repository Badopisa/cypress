import React from 'react'
import {Box, Divider, Stack, Text, Spacer,Image,SimpleGrid, Heading, VStack, HStack, Input, Button} from '@chakra-ui/react'
import Link from "@/components/Elements/Link/Link"
import FooterLink from '@/components/Layout/Footer/FooterLink'

const Footer = () => {
  return (
    <Box  
      bg='dark' 
      color='white'
    >
     <FooterLink/>
    <Divider borderColor='divider' />
    <Stack 
      direction={['column', 'row']}
      align='center'
      px={{base: 4, md: 12 }}
      py={{base: 4, md: 12 }}
    >
      <Stack 
        direction={['column', 'row']} 
        spacing={2} align='center'
      >
        <Text>Copyright © 2021 Sonalysis. </Text>
        <Text as='span' color='yellow' >All rights reserved</Text>
      </Stack>
      <Spacer/>
      <Image src='/images/logos/logo.svg' alt='logo'/>
      <Spacer/>
      <Link href="/"><Text variant="linkText">Terms &amp; Conditions</Text></Link>
      <Spacer/>
      <Link href="/"><Text variant="linkText">Privacy Policy</Text></Link>
      <Spacer/>
    </Stack>
    </Box>
  )
}

export default Footer