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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import UploadVideoModal from '@/components/Analytics/UploadVideoModal';
import { authenticatedRoute } from '@/components/Layout/AuthenticatedRoute';
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import UploadedVideos from './uploaded-videos';

const TabSelectedStyle = {
  color: 'white',
  bg: 'primary',
  rounded: '5px',
};

const AllVideos = () => {
  const [isVideosAvailable, setIsVideosAvailable] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <DashboardDesktopNav hasArrow />
      <Box color='white' h='100%'>
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
            <Button bg='primary' variant='action' onClick={onOpen}>
              {' '}
              UPLOAD A VIDEO
            </Button>
          </VStack>
        </Grid>
        <Box mt='2rem'>
          <Text>Video Uploads</Text>
          <Flex
            direction={{ base: 'column-reverse', md: 'row' }}
            justify='space-between'
          >
            <Tabs
              variant='unstyled'
              mt={{ base: 8, md: 4 }}
              alignContent='center'
              w={{ base: '100%', md: '50%' }}
            >
              <TabList
                bg='dark'
                color='white'
                w={{ base: '100%', md: '371px' }}
                rounded={5}
                p={{ base: '0', md: '8px 16px' }}
              >
                <Tab _selected={TabSelectedStyle}>All</Tab>
                <Spacer />
                <Tab _selected={TabSelectedStyle}>Complete</Tab>
                <Spacer />
                <Tab _selected={TabSelectedStyle}>Incomplete</Tab>
              </TabList>
            </Tabs>
            <Box mt={{ base: 8, md: 4 }}>
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
        {isVideosAvailable ? (
          <UploadedVideos />
        ) : (
          <Grid
            textAlign='center'
            placeContent='center'
            borderRadius='lg'
            p='4rem'
            mt='2rem'
            bg='dark'
          >
            <VStack spacing={6} px={{ base: 4, md: 8 }}>
              <Img src='/images/icons/empty-file.svg' alt='empty file' />
              <Text as='h1'>No videos uploaded yet</Text>
              <Text mt='1rem'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor,
                nullam id aliquam.
              </Text>
            </VStack>
          </Grid>
        )}
      </Box>
      <UploadVideoModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default authenticatedRoute(AllVideos);
