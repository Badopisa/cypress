import {
    FormControl,
    FormLabel,
    HStack,
    Img,
    Spacer,
    Switch,
    Text,
    VStack
} from '@chakra-ui/react';
import React from 'react';

const Notifications = () => {
    return (
        <VStack w={{ base: '100%', md: '40%' }} align={'left'}>
            <Text mb={8}>Notification Settings</Text>
            <HStack align={'center'}>
                <Img src={'/icons/push-notification.svg'} alt="Push Notification" />
                <FormControl display="flex" alignItems="center" mt={20}>
                    <FormLabel htmlFor="push-notification">Push Notifications</FormLabel>
                    <Spacer />
                    <Text>On</Text>
                    <Spacer />
                    <Switch
                        id="push-notification"
                        size={'lg'}
                        colorScheme={'#5765fb'}
                        _focus={{ boxShadow: 'none' }}
                    />
                </FormControl>
            </HStack>
            <Spacer />

            <HStack mt={20} align={'center'}>
                <Img src={'/icons/sms-notification.svg'} alt="Push Notification" />
                <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="sms-notification">SMS Notifications</FormLabel>
                    <Spacer />
                    <Text>On</Text>
                    <Spacer />
                    <Switch size={'lg'} colorScheme={'#5765fb'} _focus={{ boxShadow: 'none' }} />
                </FormControl>
            </HStack>
            <Spacer />
            <HStack mt={20} align={'center'}>
                <Img src={'/icons/email-notification.svg'} alt="Push Notification" />
                <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="email-notification">Email Notifications</FormLabel>
                    <Spacer />
                    <Text>On</Text>
                    <Spacer />
                    <Switch
                        id="email-notification"
                        size={'lg'}
                        colorScheme="primary"
                        _focus={{ boxShadow: 'none' }}
                    />
                </FormControl>
            </HStack>
        </VStack>
    );
};

export default Notifications;
