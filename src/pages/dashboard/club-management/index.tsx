import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute'
import React from 'react'
import {
	Text,
	Box,
	Image,
	HStack,
	VStack,
	Flex,
	Spacer,
	Avatar,
	Center,
	Button,
	Tabs,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	InputGroup,
	InputLeftElement,
	Input
} from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import { useRouter } from 'next/router';
import BlankTeam from '@/components/Team/BlankTeam';

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

const ClubManagement = () =>  {

    const router = useRouter()

    const handleCreateTeam = () => {
        router.push('/dashboard/club-management/create-team')
    }
    
  return (
    <>
        <DashboardDesktopNav/>
        <Box
            mt={8}
            w={{ base: '100%', md: '90%' }}
            h={{ base: 'auto', md: '270px' }}
            sx={boxStyles}
            borderRadius="15"
        >
            
            <VStack>
                <Text fontSize={{base:'3xl', md:"5xl" }} fontWeight="bold" w="80%" pt={{base:8}}>
                    Build your own Football Gaints
                </Text>
                <Text fontSize="md" pb={{base:8}}>
                    Create your own football club and build your team{' '}
                </Text>
            </VStack>

        </Box>

        <Box color="white" mt={6} w={{base:'100%',md:"90%"}} p={{base:'4px'}}>
            <Text  fontSize="lg" fontWeight="semibold">
                Club Management
            </Text>
            <Flex direction={{base:"column-reverse", md:"row"}}>
                <Tabs variant="unstyled" mt={{base:8, md:4}} alignContent="center" w={{base:'100%',md:"50%"}}>
                    
                    <TabList bg="dark" color="white" w={{base:'100%',md:"371px"}} rounded={5} p={{base: '0',md:"8px 16px"}}>
                        <Tab _selected={TabSelectedStyle}>Teams</Tab>
                        <Spacer />
                        <Tab _selected={TabSelectedStyle}>All Players</Tab>
                        <Spacer />
                        <Tab _selected={TabSelectedStyle}>Staff</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel p='16px 0px'>
                            <Flex direction="row">
                                <Button
                                    w="116px"
                                    fontSize="xs"
                                    fontWeight="semibold"
                                    variant="outline"
                                    _hover={{ bg: 'white', color: 'dark', fontWeight: 'bold' }}
                                    onClick={handleCreateTeam}
                                >
                                    CREATE A TEAM
                                </Button>
                                <Button bg="grey" color="white" fontSize="sm" ml="8" w="83"
                                    _hover={{ bg: 'primary', color: 'white', fontWeight: 'bold'}}
                                >
                                    0/100
                                </Button>
                            </Flex>
                        </TabPanel>
                        <TabPanel />
                        <TabPanel />
                    </TabPanels>
                </Tabs>
                <Spacer />
                <Flex direction="row" mt={6}>
                    <InputGroup w="279px">
                        <InputLeftElement pointerEvents="none" children={<BsSearch color="grey" />} />
                        <Input type="tel" placeholder="Search for your team" />
                    </InputGroup>
                    <Button bg="grey" _hover={{color: "white"}} color="white" fontSize="sm" ml="8px">
                        Search
                    </Button>
                </Flex>
            </Flex>
            <BlankTeam image="/images/image/jersy.png" title="No team created yet"/>
        </Box>
    </>
  )
}

export default authenticatedRoute(ClubManagement)