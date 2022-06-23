import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  CircularProgressLabel,
  CircularProgress,
  Flex,
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
import React, { useRef, useState } from 'react';
import ModalLayout from '../../modal';
import ChangingProgressProvider from './ChangingProgressProvider';

import PropTypes from 'prop-types';
import { FileDrop } from 'react-file-drop';

interface UploadTypes {
  inputRef: React.RefObject<HTMLInputElement>;
}

const UploadVideoModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [step, setStep] = useState<number>(1);
  const [fileName, setName] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const percentage = 0;

  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const fileHandler = (file: any) => {
    const extension = file[0].name.split('.')[1]?.toLowerCase();

    if (extension !== undefined) {
      const fName = Object.keys(file).map((name) => {
        return {
          name: file[name].name,
          icon: file[name].name.split('.')[1]?.toUpperCase().trim(),
        };
      });
      setName(fName[0].name);
      console.log('file name is', fName);
      console.log('files name is', fName[0].name);
      console.log('extension name is', extension);
    } else {
      alert('file type not supported');
    }
  };

  const filePicker = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
    // inputRef.current.click();
  };

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
          {step === 0 ? (
            <Text fontSize='3xl'>Upload and Analyze video</Text>
          ) : step === 1 ? (
            <Text fontSize='3xl'>Video is Uploading...</Text>
          ) : (
            <Text fontSize='3xl'>Video has been uploaded</Text>
          )}
          <Text>
            It helps if the video is a high quality video as it gives a more
            precise analysis
          </Text>
          <Grid
            textAlign='center'
            placeContent='center'
            border={'2px dashed'}
            borderColor={'primary'}
            borderRadius='lg'
            p='2rem'
          >
            <VStack spacing={4} px='4'>
              {fileName ? (
                <ChangingProgressProvider
                  values={[
                    0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70,
                    75, 80, 85, 90, 95, 100,
                  ]}
                >
                  {(percentage: number) => (
                    <Box style={{ width: '30%' }}>
                      <CircularProgress
                        value={percentage}
                        color='green.400'
                        thickness={'10px'}
                      >
                        <CircularProgressLabel>{`${15}%`}</CircularProgressLabel>
                      </CircularProgress>
                    </Box>
                  )}
                </ChangingProgressProvider>
              ) : (
                <Img src='/icons/video-upload.svg' alt='upload file' />
              )}
              <FileDrop
                onTargetClick={filePicker}
                onDrop={(f) => fileHandler(f)}
              >
                <input
                  accept='.mp4'
                  value=''
                  style={{ visibility: 'hidden', opacity: 0 }}
                  ref={inputRef}
                  type='file'
                  onChange={(e) => fileHandler(e.target.files)}
                />
                {fileName ? (
                  <Flex bg={'lightAsh'} p={3} justify={'center'} gap={4}>
                    {' '}
                    <Img src='/icons/file-icon.svg' alt='file icon' />
                    <Text>{fileName}</Text>{' '}
                    <Img src='/icons/edit-pen.svg' alt='edit' />{' '}
                  </Flex>
                ) : (
                  <Text>Upload video from your device</Text>
                )}
              </FileDrop>
            </VStack>
          </Grid>
          <Stack spacing={4}>
            <FormControl id='link'>
              <FormLabel>Paste Link</FormLabel>
              <Input type='text' placeholder='Insert Google doc link' />
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

            <Button
              onClick={onClose}
              size='lg'
              bg='lightAsh'
              color={'white'}
              variant='action'
            >
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
