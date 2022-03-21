import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Img,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalContent,
  ModalOverlay,
  Select,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import ModalLayout from '../modal';

const UploadVideoModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Grid
          textAlign='center'
          placeContent='center'
          p='2em'
          bg='ash'
          color='white'
          borderRadius='lg'
          gap='2em'
        >
          <Text fontSize='3xl'>Upload and Analyze video</Text>
          <Text>
            It helps if the video is a high quality video as it gives a more
            precise analysis
          </Text>
          <Grid
            textAlign='center'
            placeContent='center'
            border={'2px dashed'}
            borderRadius='lg'
            p='2rem'
          >
            <VStack spacing={4} px='4'>
              <Img src='/images/icons/empty-file.svg' alt='empty file' />
              <Text>Upload video from your device</Text>
            </VStack>
          </Grid>
          <Stack spacing={4}>
            <FormControl id='email' isRequired>
              <FormLabel>Paste Link</FormLabel>
              <Input type='text' placeholder='Insert google doc link' />
            </FormControl>
            <FormLabel>Choose Teams</FormLabel>
            <HStack>
              <FormControl id='choose-teams' isRequired>
                <Select variant='outline' placeholder='Choose' />
              </FormControl>

              <FormControl>
                <Select variant='outline' placeholder='Choose' />
              </FormControl>
            </HStack>

            <Button size='lg' bg='lightAsh' color={'white'} variant='action'>
              Submit
            </Button>
            <Button size='lg' bg='transparent' color={'white'} variant='action'>
              Cancel
            </Button>
          </Stack>
        </Grid>
      </ModalContent>
    </Modal>
  );
};

export default UploadVideoModal;
