import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
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
    Img,
    FormControl,
    FormLabel,
    FormHelperText
} from '@chakra-ui/react';
const Profile = () => {
    return (
        <> 
         <DashboardDesktopNav hasArrow />
         <Text p="40px" color="black2" fontSize="40px" fontWeight="700">Profile</Text>
         <Text p="40px">Personal information settings</Text>
            <VStack width="200%" justifyContent="space-aside">
                <Box>
                    <FormControl p="10px">
                       <FormLabel >Last name</FormLabel>
                       <Input type="Text" name="Title" />
                       <FormHelperText></FormHelperText>
                     </FormControl>
                </Box>
            </VStack>
            <HStack width="400%" justifyContent="space-between">
                <Spacer>
                <Box maxW="480px">
                   <FormControl p="10px">
                       <FormLabel >First name</FormLabel>
                       <Input type="Text" name="Title" />
                       <FormHelperText></FormHelperText>
                     </FormControl>
              
                 </Box>
                  <Box maxW="480px">
                    <FormControl p="10px">
                       <FormLabel >Date of birth</FormLabel>
                       <Input type="Text" name="Title" />
                       <FormHelperText></FormHelperText>
                   </FormControl>
                    </Box>


                    <Box maxW="480"> 
                     <FormControl p="10px">
                       <FormLabel>Phone number</FormLabel>
                       <Input type="Text" name="Title" />
                       <FormHelperText></FormHelperText>
                   </FormControl>
                    </Box>
                 </Spacer>
                
            </HStack>
          
        </>  
    )
};
export default authenticatedRoute(Profile);