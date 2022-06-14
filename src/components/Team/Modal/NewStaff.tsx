import ImageUpload from '@/components/Elements/ImageUpload';
import {
  Button,
  Center,
  VStack,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  GridItem,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  HStack,
  FormControl,
  Text,
} from '@chakra-ui/react';
import React from 'react';

type NewStaffType = {
  isOpen: boolean;
  onClose: (value: boolean) => void;
};

const NewStaff = ({ isOpen, onClose }: NewStaffType) => {
  const [profilePicture, setProfilePicture] = React.useState<null | File>(null);

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)}>
      <ModalOverlay />
      <ModalContent
        px={6}
        w='auto'
        h='auto'
        bg='grey'
        color='white'
        borderRadius='3xl'
      >
        <ModalHeader py={8} textAlign='center' fontSize='lg' fontWeight='bold'>
          Create New Staff
          <Text fontSize='sm' fontWeight='light'>
            Fill in a staff details and send an invite
          </Text>
        </ModalHeader>
        <ModalBody>
          <Center>
            <VStack mb={6} mt={2}>
              <ImageUpload
                defaultImage='/images/image/default-user-avatar.png'
                w='100px'
                h='100px'
                rounded='full'
                setSelectedImage={setProfilePicture}
                selectedImage={profilePicture}
              />
              <Text fontSize='sm' fontWeight='bold' color='blue'>
                Upload Image
              </Text>
            </VStack>
          </Center>
          <VStack spacing={6}>
            <HStack spacing={6}>
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel fontSize='sm' htmlFor='lastname'>
                    FIRST NAME
                  </FormLabel>
                  <Input
                    id='lastname'
                    name='lastname'
                    type='text'
                    placeholder='eg.John'
                  />
                  <FormErrorMessage>Firstname is required.</FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel fontSize='sm' htmlFor='lastname'>
                    LAST NAME
                  </FormLabel>
                  <Input
                    id='lastname'
                    name='lastname'
                    type='text'
                    placeholder='eg.Dough'
                  />
                  <FormErrorMessage>Lastname is required.</FormErrorMessage>
                </FormControl>
              </GridItem>
            </HStack>
            <HStack spacing={6} w='full'>
              <GridItem w='full'>
                <FormControl>
                  <FormLabel fontSize='sm' htmlFor='country'>
                    Designation
                  </FormLabel>
                  <Select
                    name='country'
                    variant='outline'
                    placeholder='Assistant Keeper Coach'
                  >
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                  </Select>
                  <FormErrorMessage>Designation is required.</FormErrorMessage>
                </FormControl>
              </GridItem>
            </HStack>
            <GridItem colSpan={1} w='full'>
              <FormControl>
                <FormLabel fontSize='sm' htmlFor='lastname'>
                  EMAIL
                </FormLabel>
                <Input
                  id='lastname'
                  name='lastname'
                  type='text'
                  placeholder='example@gmail.com'
                />
                <FormErrorMessage>Email address is required.</FormErrorMessage>
              </FormControl>
            </GridItem>
          </VStack>
        </ModalBody>

        <ModalFooter w='100%'>
          <VStack spacing={4} w='100%' mb='12px'>
            <Button fontSize='sm' variant='action' w='full'>
              ADD STAFF
            </Button>
            <Center>
              <Text w='full' onClick={() => onClose(false)} cursor='pointer'>
                BACK
              </Text>
            </Center>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewStaff;
