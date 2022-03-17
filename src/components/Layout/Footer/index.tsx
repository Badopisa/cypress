import React from 'react'
import {Box, Divider, Stack, Text, Spacer,Image,} from '@chakra-ui/react'
import Link from "@/components/Elements/Link/Link"

const Footer = () => {
  return (
    <Box>
        <Divider borderColor='divider' />
        <Stack 
          bg='dark' 
          color='white'
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
          <Link href="/"><Text>Terms &amp; Conditions</Text></Link>
          <Spacer/>
          <Link href="/"><Text>Privacy Policy</Text></Link>
          <Spacer/>
        </Stack>
    </Box>
  )
}

export default Footer