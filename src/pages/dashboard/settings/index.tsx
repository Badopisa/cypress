import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import React, { useState } from 'react';
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
    FormHelperText,
    Container
} from '@chakra-ui/react';





const Settings = () => {
    const [tab, setTab] = useState<number>(1);

    return (
        <><><></><DashboardDesktopNav hasArrow />
            <Text p="40px" color="black2" fontSize="40px" fontWeight="700">Setteings</Text></>
            <Box>
                <VStack width="600%" justifyContent="space-between">
                  <Spacer>
                    <HStack maxW="900px">
                    <FormControl p="10px">
                       <FormLabel >Change password</FormLabel>
                       <Input type="Text" name="Title" />
                       <FormHelperText></FormHelperText>
                     </FormControl>
                     <Button bg="lightWhite" color="Black">Change password</Button>
                    </HStack>
                    
                    <HStack maxW="900px">
                    <FormControl p="10px">
                       <FormLabel >Change email</FormLabel>
                       <Input type="Text" name="Title" />
                       <FormHelperText></FormHelperText>
                     </FormControl>
                     <Button  bg="lightWhite" color="Black">Change email</Button>
                    </HStack>

                       <HStack maxW="800px" justifyContent="space-between">
                       <FormControl p="10px">
                       <FormLabel >Notifications</FormLabel>
                       <Input type="Text" name="Title" />
                       <FormHelperText></FormHelperText>
                     </FormControl>
                     <Button></Button>
                        </HStack> 

                        <HStack maxW="800px">
                        <FormControl p="10px">
                       <FormLabel >Appearance</FormLabel>
                       <Input type="Text" name="Title" />
                       <FormHelperText></FormHelperText>
                     </FormControl>
                  
                        </HStack>

                        <HStack maxW="800px">
                        <FormControl p="10px">
                       <FormLabel >Language</FormLabel>
                       <Input type="Text" name="Title" />
                       <FormHelperText></FormHelperText>
                     </FormControl>
                        </HStack>
                   
                  </Spacer>

                </VStack>

                </Box></>

           
    );
};

export default authenticatedRoute(Settings)