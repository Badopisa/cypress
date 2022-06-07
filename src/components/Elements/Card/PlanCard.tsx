import React, { ReactElement } from 'react';
import {
  Box,
  Text,
  Button,
  HStack,
  VStack,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';

type PlanCardType = {
  title: string;
  price: number;
  time: string;
  benefits: string[];
  hasFooter?: boolean;
  handleSubscription?: (
    title: string,
    time: string,
    price: number,
    benefits: string[]
  ) => void;
};
const PlanCard = ({
  title,
  price,
  time,
  benefits,
  hasFooter = true,
  handleSubscription,
}: PlanCardType) => {
  return (
    <Box
      mb={4}
      shadow='base'
      borderWidth='1px'
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor='gray.200'
      borderRadius={'xl'}
    >
      <Box position='relative' w={270}>
        <Box py={5} px={8}>
          <Text fontWeight='500' mb='3' fontSize='sm'>
            {title}
          </Text>
          <Text fontSize='md' mb='8' fontWeight='600'>
            ${price} / {time}
          </Text>
          <List spacing={3} textAlign='start'>
            {benefits.map((benefit, index) => (
              <ListItem key={index}>
                <ListIcon as={FaCheckCircle} color='primary' />
                {benefit}
              </ListItem>
            ))}
          </List>
          {hasFooter && (
            <Box w='80%' pt={7}>
              <Button
                onClick={() =>
                  handleSubscription
                    ? handleSubscription(title, time, price, benefits)
                    : null
                }
                w='full'
                variant='action'
              >
                CHOOSE PLAN
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PlanCard;
