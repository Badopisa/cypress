import React, { useState } from 'react';
import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  ButtonGroup,
  Spacer,
  Grid,
  Container,
  Box,
  Heading,
  FormControl,
  Input,
  Img,
  useDisclosure,
  FormLabel,
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  Select,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import UploadVideoModal from '@/components/UploadVideoModal';

const AllVideos = () => {
  const [openUploadVideoModal, setOpenUploadVideoModal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box color='white' bgColor='ash' w='100vw' h='100%' p='20'>
        <Grid
          textAlign='center'
          placeContent='center'
          bgImage="url('/images/imgs/hero-bg.jpg')"
          bgSize={'cover'}
          bgPosition={'center center'}
          borderRadius='lg'
          p='4rem'
        >
          <VStack spacing={6} px={useBreakpointValue({ base: 4, md: 8 })}>
            <Heading variant='title'>
              Start Your Analysis by uploading a video
            </Heading>
            <Text>Get to see materics based on teams and players </Text>
            <Button bg='purple' variant='action' onClick={onOpen}>
              {' '}
              UPLOAD A VIDEO
            </Button>
          </VStack>
        </Grid>
        <Box mt='2rem'>
          <Text>Video Uploads</Text>
          <Flex direction={['column', 'row']} justify='space-between'>
            <Flex
              bg='black'
              borderRadius='lg'
              justifyContent='space-between'
              align='center'
              p='0.5em'
              w={{ base: '200px', md: '300px', lg: '400px' }}
            >
              <Text>All</Text>
              <Text>Complete</Text>
              <Text>Incomplete</Text>
            </Flex>
            <Box>
              <Stack
                direction={{ base: 'column', md: 'row' }}
                as={'form'}
                spacing={'12px'}
                align='center'
                justify='center'
              >
                <FormControl
                  p='0.5em'
                  bg='lightAsh'
                  display='flex'
                  borderRadius='lg'
                >
                  <SearchIcon alignSelf='center' ml={2} />
                  <Input
                    variant={'solid'}
                    bg='transparent'
                    id={'text'}
                    type={'text'}
                    placeholder={'Search for your videos'}
                    aria-label={'Search for Videos'}
                  />
                </FormControl>
                <FormControl
                  w={{ base: '100%', md: '40%' }}
                  bg='lightAsh'
                  borderRadius='lg'
                  p='0.5em'
                >
                  <Button
                    w='100%'
                    type={'submit'}
                    bg='transparent'
                    variant='action'
                  >
                    Search
                  </Button>
                </FormControl>
              </Stack>
            </Box>
          </Flex>
        </Box>
        <Grid
          textAlign='center'
          placeContent='center'
          borderRadius='lg'
          p='4rem'
          mt='2rem'
          bg='black'
        >
          <VStack spacing={6} px={useBreakpointValue({ base: 4, md: 8 })}>
            <Img src='/images/icons/empty-file.svg' alt='empty file' />
            <Text as='h1'>No videos uploaded yet</Text>
            <Text mt='1rem'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor,
              nullam id aliquam.
            </Text>
          </VStack>
        </Grid>
      </Box>
      <UploadVideoModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AllVideos;
