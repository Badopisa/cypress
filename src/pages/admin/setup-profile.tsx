import React, { useState } from 'react';
import {
  Flex,
  FormControl,
  GridItem,
  Button,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
  SimpleGrid,
  Select,
  Center,
  Text,
  InputGroup,
  InputRightElement,
  HStack,
  useToast,
  chakra,
} from '@chakra-ui/react';
import { FormImage, FormDetails } from '@/components/Form';
import { AiOutlinePicture } from 'react-icons/ai';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { adminRegistration } from '@/store/actions/authActions';
import { useRouter } from 'next/router';
import { BiArrowBack } from 'react-icons/bi';

const ClubAdminRegistration = () => {
  const { isLoading } = useSelector((state: RootStateOrAny) => state.msg);
  const dispatch = useDispatch();
  const toast = useToast();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (values: any) => {
    const payload = {
      photo: '',
      role: 'owner',
      club_name: values.name,
      email: values.email,
      password: values.password,
      first_name: values.firstname,
      last_name: values.lastname,
      country: values.country,
    };
    dispatch(adminRegistration(payload, toast, router));
  };

  return (
    <Flex
      h='auto'
      direction={{ base: 'column-reverse', md: 'row' }}
      bg='primary'
    >
      <FormImage
        image='/images/image/login-coach.jpg'
        title='GET STARTED AS'
        body='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut purus rhoncus lectus posuere elit et.'
        hasRole
        role='A COACH'
      />
      <VStack
        bgColor='black'
        color='white'
        w='full'
        h='full'
        py={10}
        px={{ base: 2, sm: 20 }}
        spacing={3}
        alignItems={{ base: 'center', md: 'flex-start' }}
      >
        <HStack spacing={6}>
          <BiArrowBack size='1.25rem' />
          <Text>Back</Text>
        </HStack>
        <VStack spacing={1} alignItems='flex-start'>
          <Text fontSize='3xl' fontWeight='semibold'>
            <chakra.span color='yellow'>Set Up&nbsp;</chakra.span>
            Your Profile
          </Text>
          <Text>1 of 2</Text>
        </VStack>
        <SimpleGrid columns={1} rowGap={5} w='80%'>
          <VStack>
            <Center boxSize='3.75rem' rounded='100%' bg='#000' m='auto'>
              <AiOutlinePicture size='24px' />
            </Center>
            <Text color='blue' textAlign='center'>
              Upload Your Logo
            </Text>
          </VStack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid mb={4} columns={2} spacing={3}>
              <GridItem>
                <FormControl>
                  <FormLabel htmlFor='firstname'>Firstname</FormLabel>
                  <Input
                    {...register('firstname', {
                      required: 'Firstname is required',
                      minLength: { value: 4, message: 'Firstname is Required' },
                    })}
                    id='firstname'
                    placeholder='Enter your firstname'
                  />
                  <FormErrorMessage>
                    {errors.firstname && 'First Name is required'}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel htmlFor='lastname'>Lastname</FormLabel>
                  <Input
                    {...register('lastname', {
                      required: 'Lastname is required',
                      minLength: { value: 4, message: 'Lastname is Required' },
                    })}
                    id='lastname'
                    placeholder='Enter your lastname'
                  />
                  <FormErrorMessage>
                    {errors.lastname && 'First name is required'}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
            </SimpleGrid>
            <SimpleGrid mb={4} columns={2} spacing={3}>
              <GridItem>
                <FormControl>
                  <FormLabel htmlFor='dob'>DATE OF BIRTH</FormLabel>
                  <Input
                    {...register('dob', {
                      required: 'Date of Birth is required',
                    })}
                    id='dob'
                    placeholder='Enter your Date of Birth'
                    type='date'
                  />
                  <FormErrorMessage>
                    {errors.dob && 'Date of birth is required'}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel htmlFor='age'>Age</FormLabel>
                  <Input
                    {...register('age', {
                      required: 'Age is required',
                    })}
                    id='age'
                    placeholder='Enter your age'
                  />
                  <FormErrorMessage>
                    {errors.age && 'Age is required'}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
            </SimpleGrid>
            <SimpleGrid mb={4} columns={2} spacing={3}>
              <GridItem>
                <FormControl>
                  <FormLabel htmlFor='s_date'>START DATE</FormLabel>
                  <Input
                    {...register('s_date', {
                      required: 'Start Date is Required',
                    })}
                    id='s_date'
                    placeholder='Enter your Start Date'
                    type='date'
                  />
                  <FormErrorMessage>
                    {errors.s_date && 'Start Date is required'}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel htmlFor='e_date'>END DATE</FormLabel>
                  <Input
                    {...register('e_date', {
                      required: 'End date is required',
                    })}
                    id='e_date'
                    type='date'
                    placeholder='Enter your End Date'
                  />
                  <FormErrorMessage>
                    {errors.e_date && 'End date is required'}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
            </SimpleGrid>
            <FormControl mb={4}>
              <FormLabel htmlFor='phoneNumber'>PHONE NUMBER</FormLabel>
              <Input
                {...register('phoneNumber', {
                  required: 'Phone number is required',
                  minLength: { value: 4, message: 'Phone number is Required' },
                })}
                id='phoneNumber'
                type='tel'
                placeholder='901-912-35646'
              />
              <FormErrorMessage>
                {errors.phoneNumber && 'Phone number is required'}
              </FormErrorMessage>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor='ePhoneNumber'>
                EMMERGENCY PHONE NUMBER
              </FormLabel>
              <Input
                {...register('ePhoneNumber', {
                  required: 'Emmergency Phone number is required',
                  minLength: {
                    value: 4,
                    message: 'Emmergency Phone number is Required',
                  },
                })}
                id='ePhoneNumber'
                type='tel'
                placeholder='901-912-35646'
              />
              <FormErrorMessage>
                {errors.phoneNumber && 'Emergency phone number is required'}
              </FormErrorMessage>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor='experience'>YEARS OF EXPERIENCE</FormLabel>
              <Input
                {...register('experience', {
                  required: 'Years of Experience is required',
                })}
                id='email'
                type='number'
                placeholder='Enter your years of experience'
              />
              <FormErrorMessage>
                {errors.experience && 'Experience is required'}
              </FormErrorMessage>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor='country'>Country</FormLabel>
              <Select
                {...register('country', {
                  required: 'Country is required',
                  minLength: { value: 4, message: 'Country is Required' },
                })}
                variant='outline'
                placeholder='Select Country'
              >
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
              </Select>
              <FormErrorMessage>
                {errors.country && 'Country is Required'}
              </FormErrorMessage>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor='email'>Company Email</FormLabel>
              <Input
                {...register('email', {
                  required: 'Email is required',
                })}
                id='email'
                type='email'
                placeholder='Enter your email'
              />
              <FormErrorMessage>
                {errors.email && 'Email is Required'}
              </FormErrorMessage>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor='link'>LINK TO PORTFOLIO</FormLabel>
              <Input
                {...register('link')}
                id='link'
                type='tel'
                placeholder='Your Portfolio'
              />
              <FormErrorMessage>
                {errors.phoneNumber && 'Link to portfolio is Required'}
              </FormErrorMessage>
            </FormControl>
            <Button
              isLoading={isLoading}
              type='submit'
              variant='action'
              size='lg'
              w='full'
            >
              CONTINUE
            </Button>
          </form>
        </SimpleGrid>
      </VStack>
    </Flex>
  );
};

export default ClubAdminRegistration;
