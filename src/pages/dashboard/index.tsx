import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
import React from 'react';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import {
    Text,
    Box,
    SimpleGrid,
    VStack,
    Flex,
    Spacer,
    Center,
    Button,
    Tabs,
    Tab,
    TabList,
    InputGroup,
    InputLeftElement,
    Input,
    Spinner,
    HStack,
    Img
} from '@chakra-ui/react';

const Dashboard = () => {
    return <main>
         <DashboardDesktopNav hasArrow />
         <Text color="black2" fontSize="40px" fontWeight="700">Dashboard</Text>
         <HStack width="100%">
            <Box p="40px" w="341px" h="213px" bg="purple"
             borderRadius="10px"color="white" textStyle="P" 
            verticalAlign="Top" fontFamily="satoshi" 
            lineHeight="30px" fontSize="16px" fontStyle="Medium">
            <HStack width="100%" justifyContent="space-between">
                <Text>Total teams</Text>
                <Img src='images/icons/totalteams.svg' w="24px"></Img>
            </HStack>
            <Text fontSize="40px"color="White" fontWeight="700" p="18px">0</Text>
            <Text><i>No activity this week</i></Text>
         </Box>
            <Box p="40px" w="341px" h="213px" 
             bg="blue"borderRadius="10px"color="white">
                <HStack width="100%" justifyContent="space-between">
                    <Text>Total players</Text>
                   <Img src='images/icons/people.svg' w="30px"></Img>
                </HStack >
                <Text fontSize="40px"color="White" fontWeight="700" p="9.5px">0</Text>
                <Text><i>No activity this week</i></Text>
                </Box>
            <Box p="40px" w="341px" h="213px" bg="babyBlue"
             borderRadius="10px"color="white">
                <HStack width="100%" justifyContent="space-between">
                  <Text>Total staff</Text>
                  <Img src='images/icons/totalstaff.svg' w="30px"></Img>
                </HStack>
                <Text fontSize="40px"color="White" fontWeight="700" p="9.5px">0</Text>
                <Text><i>No activity this week</i></Text>
               </Box>
         </HStack>
         <Spacer h="30px">
            
         </Spacer>
         <Box p="40px" w="100%" bg="lightWhite" h="414px" borderRadius="10px" color="Black2">
            <Text>Team Performance</Text></Box>
         <Spacer h="30px">
         </Spacer>
         <Text color="Black2" fontSize="20px" fontWeight="400">Key Players</Text>
    </main>
};
export default authenticatedRoute(Dashboard);
