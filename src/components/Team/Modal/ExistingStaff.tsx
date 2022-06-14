import {
  Button,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  Flex,
  Text,
  Avatar,
  SimpleGrid,
  Image,
  Stack,
  FormControl,
} from '@chakra-ui/react';

import { staffData } from '@/data/StaffData';
import { SearchIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import Confirmation from './Confirmation';

type ExistingStaffType = {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  image?: string;
  setSelected?: (value: boolean) => void;
  title?: string;
  buttonTitle?: string;
};
const ExistingStaff = ({
  isOpen,
  onClose,
  image,
  setSelected,
  title = 'Add Existing Staffs',
  buttonTitle = 'ADD STAFF',
}: ExistingStaffType) => {
  const [isStaffSelected, setIsStaffSelected] = useState<boolean>(false);
  const [selectedStaffs, setSelectedStaffs] = useState<any>([]);
  const [selectConfirmation, setSelectedConfirmation] =
    useState<boolean>(false);

  const handleSelect = () => {
    setSelectedConfirmation(true);
    onClose(true);
  };
  const handleSelectExisitngStaff = (id: number) => {
    setIsStaffSelected(true);
    if (selectedStaffs.includes(id)) {
      setSelectedStaffs((ids: number[]) =>
        ids.filter((staffId) => staffId !== id)
      );
    } else {
      setSelectedStaffs((ids: number[]) => [...ids, id]);
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => onClose(false)}>
        <ModalOverlay />
        <ModalContent
          w='xl'
          px={8}
          h='auto'
          bg='grey'
          color='white'
          borderRadius='18px'
        >
          <ModalHeader
            p='24px 24px 4px'
            textAlign='center'
            fontSize='18px'
            fontWeight='600'
          >
            {title}
          </ModalHeader>
          <ModalBody mt={5}>
            <VStack spacing={4}>
              <Flex direction='row' w='100%'>
                <FormControl
                  p='0.2em'
                  bg='black'
                  display='flex'
                  borderRadius='lg'
                >
                  <SearchIcon alignSelf='center' ml={2} color='grey' />
                  <Input
                    variant={'solid'}
                    bg='transparent'
                    id={'text'}
                    type={'text'}
                    placeholder={'Search for players'}
                    aria-label={'Search for Players'}
                  />
                </FormControl>
              </Flex>
            </VStack>

            <Stack w='100%' spacing={8}>
              <SimpleGrid
                columns={{ base: 1, sm: 2, lg: 3 }}
                mt={8}
                spacing={8}
              >
                {staffData
                  .map((staff, index) => (
                    <VStack
                      key={index}
                      onClick={() => handleSelectExisitngStaff(staff.id)}
                    >
                      <Avatar
                        bg='ash'
                        boxSize={{ base: '2rem', md: '4rem' }}
                        src={staff.file}
                        position={'relative'}
                        top={0}
                        zIndex={1}
                      />
                      {selectedStaffs.includes(staff.id) && (
                        <Image
                          src={'/icons/checked.svg'}
                          alt='checked'
                          w={8}
                          h={8}
                          color='primary'
                          position={'absolute'}
                          zIndex={3}
                        />
                      )}
                      <Text fontSize={'xxs'} fontWeight='semibold'>
                        {staff.staffName}
                      </Text>
                      <Text fontSize={'xxs'}>{staff.staffPosition}</Text>
                    </VStack>
                  ))
                  .slice(0, 6)}
              </SimpleGrid>
            </Stack>
          </ModalBody>

          <ModalFooter w='full' py={{ base: 4, md: 8 }}>
            <VStack spacing={4} w='full'>
              {isStaffSelected && (
                <Button variant='action' w='full'>
                  {buttonTitle}
                </Button>
              )}
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Confirmation
        jersyPng={'/images/imgs/success.svg'}
        isOpen={selectConfirmation}
        onClose={setSelectedConfirmation}
        body={'Sonalysis will notify this player of the changes made'}
        title='New Player Added'
        buttonTitle={'OKAY, THANK YOU'}
      />
    </>
  );
};

export default ExistingStaff;
