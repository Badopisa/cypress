import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute'
import React from 'react'
import {Text,
	Box,
	HStack,
	Avatar,
    VStack,
    Stack,
    FormControl, 
    GridItem, 
    FormLabel, 
    Input, 
    FormErrorMessage,
    Select,
    Button,
    Link,
	} from '@chakra-ui/react'
import { AiFillPicture } from 'react-icons/ai';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import { useRouter } from 'next/router';
import Steps from '@/components/Team/Steps';

const boxStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    textShadow: '0 0 120px black',
    px: 4,
    background: `url("/images/image/coach.jpg") center/cover no-repeat`
};

const TabSelectedStyle = {
     color: 'white', bg: 'primary', rounded: '5px' 
}

const CreateTeam = () =>  {

    const router = useRouter()

  return (
    <>
        <DashboardDesktopNav hasArrow/>
        <Box color="white" py={{base:12, md:12}} px={{base:4, md:8}}>
            <Text fontSize="3xl" fontWeight="medium">
                Create Team
            </Text>
            <Steps current={1}/>
        </Box>
        <Box color="white" px={{base:4, md:8}}>
            <Stack spacing={24} direction={{base:'column', md:'row'}} >
                <VStack>
                    <Avatar bg='dark' boxSize='7.5rem' icon={<AiFillPicture size='3.75rem' color='white' />} />
                    <Link fontSize='sm' fontWeight='medium' color='blue'>
                        Upload Your Logo
                    </Link>
                </VStack>
                <VStack spacing={10}>
                    <HStack spacing={8}>
                        <GridItem >
                            <FormControl >
                                <FormLabel htmlFor="lastname">
                                    CLUB NAME
                                </FormLabel>
                                <Input id="lastname"  name="lastname"   type="text" placeholder="eg.ClubFC"/>
                                <FormErrorMessage>Club Name is required.</FormErrorMessage>
                            </FormControl>
                        </GridItem>
                        <GridItem >
                            <FormControl >
                                <FormLabel htmlFor="lastname">
                                    ABBREVIATION
                                </FormLabel>
                                <Input id="lastname"  name="lastname"   type="text" placeholder="eg.ClubFC"/>
                                <FormErrorMessage>Abbreviation is required.</FormErrorMessage>
                            </FormControl>
                        </GridItem>
                    </HStack>
                    <GridItem colSpan={2} w='full'>
                        <FormControl >
                            <FormLabel htmlFor="country">
                                LOCATION
                            </FormLabel>
                            <Select name='country' variant='outline' placeholder='Select Country' >
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                            <FormErrorMessage>Location is required.</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                    <Button variant='action' w='full' fontSize='sm' fontWeight='normal' >NEXT</Button>
                </VStack>
                </Stack>
        </Box>
    </>
  )
}

export default authenticatedRoute(CreateTeam)