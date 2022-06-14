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

import { SearchIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { playerData } from '@/data/PlayerData';
import Confirmation from './Confirmation';

type ExistingPlayerType = {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  image?: string;
  setSelected?: (value: boolean) => void;
  title?: string;
  buttonTitle?: string;
};
const ExistingPlayer = ({
  isOpen,
  onClose,
  image,
  setSelected,
  title = 'Add Existing Player',
  buttonTitle = 'ADD PLAYER',
}: ExistingPlayerType) => {
  const [isPlayerSelected, setIsPlayerSelected] = useState<boolean>(false);
  const [selectedPlayers, setSelectedPlayers] = useState<any>([]);

  const [selectConfirmation, setSelectedConfirmation] =
    useState<boolean>(false);

  const handleSelect = () => {
    setSelectedConfirmation(true);
    onClose(true);
  };
  const handleSelectExisitngPlayer = (id: number) => {
    setIsPlayerSelected(true);
    if (selectedPlayers.includes(id)) {
      setSelectedPlayers((ids: number[]) =>
        ids.filter((playerId) => playerId !== id)
      );
    } else {
      setSelectedPlayers((ids: number[]) => [...ids, id]);
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
                {playerData
                  .map((player, index) => (
                    <VStack
                      key={index}
                      onClick={() => handleSelectExisitngPlayer(player.id)}
                      cursor={'pointer'}
                    >
                      <Avatar
                        bg='ash'
                        boxSize={{ base: '2rem', md: '4rem' }}
                        src={player.file}
                        position={'relative'}
                        top={0}
                        zIndex={1}
                      />
                      {selectedPlayers.includes(player.id) && (
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
                        {player.playerName}
                      </Text>
                      <Text fontSize={'xxs'}>{player.playerPosition}</Text>
                    </VStack>
                  ))
                  .slice(0, 6)}
              </SimpleGrid>
            </Stack>
          </ModalBody>

          <ModalFooter w='full' py={{ base: 4, md: 8 }}>
            <VStack spacing={4} w='full'>
              {isPlayerSelected && (
                <Button variant='action' w='full' onClick={handleSelect}>
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

export default ExistingPlayer;
