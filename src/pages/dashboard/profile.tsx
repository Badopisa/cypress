import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import ImageUpload from '@/components/Elements/ImageUpload';
import React from 'react';
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
const Profile = () => {
    const [profilePicture, setProfilePicture] = React.useState<any>(null);
    return (
        <> 
         <DashboardDesktopNav hasArrow />
         <Text p="40px" color="black2" fontSize="40px" fontWeight="700">Profile</Text>
         <Text p="40px">Personal information settings</Text>
         <Box>
            <HStack width="800px"justifyContent="space-between">
                <Box>
            <ImageUpload
                        defaultImage="/images/image/defaultImage.svg"
                        w="100px"
                        h="100px"
                        rounded="full"
                        setSelectedImage={setProfilePicture}
                        selectedImage={profilePicture}
                    />
                     </Box>
                    <Button bg="lightWhite" color="lightwhite" type="submit"> Change picture</Button>
                   
            </HStack>
            </Box>
            <VStack width="700%" justifyContent="space-between">
                <Spacer>
                <HStack maxW="1000px">
                   <FormControl p="10px">
                       <FormLabel >First name</FormLabel>
                       <Input type="Text" name="Title" />
                       <FormHelperText></FormHelperText>
                     </FormControl>
                     <FormControl p="10px">
                       <FormLabel >Last name</FormLabel>
                       <Input type="Text" name="Title" />
                       <FormHelperText></FormHelperText>
                     </FormControl>
              
                 </HStack>
                  <HStack maxW="1000px">
                    <FormControl p="10px">
                       <FormLabel >Date of birth</FormLabel>
                       <Input type="Text" name="Title" />
                       <FormHelperText></FormHelperText>
                   </FormControl>
                    <FormControl p="10px">
                       <FormLabel > Country</FormLabel>
                       <Input type="Text" name="Title" />
                       <FormHelperText></FormHelperText>
                   </FormControl>
                    </HStack>


                    <Box maxW="480"> 
                     <FormControl p="10px">
                       <FormLabel>Phone number</FormLabel>
                       <Input type="Text" name="Title" />
                       <FormHelperText></FormHelperText>
                   </FormControl>
                    </Box>
                 </Spacer>
            </VStack>
            <Spacer>
            <Button type="submit"> Save changes</Button>
            </Spacer>
          
        </>  
    )
};
export default authenticatedRoute(Profile);