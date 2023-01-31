import { Box, Flex, HStack, Spacer, Text, useRadio, useRadioGroup, VStack } from '@chakra-ui/react';
import { FormDetails } from '@/components/Form';

import React, { useState } from 'react';
import NavBar from '@/components/Layout/NavBar';
import AvatarIcon from '@/assets/avatarIcon';
import { useRouter } from 'next/router';

const Registration = () => {
    const [selected, setSelected] = useState('');
    const router = useRouter();
    const options = [
        {
            title: 'Club Admin',
            subtitle: 'Create your club account and start analyzing'
        },
        {
            title: 'Coach/Player',
            subtitle: 'Use your email access to set up your profile and start analyzing'
        }
    ];

    const handleContinue = () => {
        if (selected === options[0].title) {
            router.push('/admin/verify-email');
        } else if (selected === options[1].title) {
            router.push('/coachAndPlayer/registration');
        }
    };

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'register',
        defaultValue: '',
        onChange: (value) => {
            setSelected(value);
        }
    });

    const group = getRootProps();
    return (
        <>
            <NavBar login />
            <Flex
                direction={'column'}
                bg="white"
                color={'black'}
                minHeight="completeY"
                alignItems="center"
                justifyContent="center">
                <FormDetails
                    hasAccount={true}
                    buttonText="Continue"
                    title="Welcome! First things first"
                    subtitle={`Select one to proceed`}
                    noBackButton
                    disableButton={!selected}
                    // loading={loading}
                    handleButtonClick={handleContinue}>
                    <HStack justifyContent={'space-between'} w={'full'} {...group}>
                        {options.map((value: any) => {
                            const radio = getRadioProps({ value: value.title });
                            return (
                                <RadioCard
                                    key={value.title}
                                    {...radio}
                                    title={value.title}
                                    subtitle={value.subtitle}
                                />
                            );
                        })}
                    </HStack>
                </FormDetails>
            </Flex>
        </>
    );
};

export default Registration;

function RadioCard(props: any) {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input: any = getInputProps();
    const checkbox = getCheckboxProps();

    return (
        <Box as="label">
            <input {...input} />
            <VStack
                {...checkbox}
                w={'310px'}
                h={'256px'}
                mb={'40px'}
                alignItems={'flex-start'}
                cursor="pointer"
                borderWidth="1px"
                position="relative"
                borderRadius="8px"
                borderColor={'grey5'}
                _checked={{
                    bg: 'white',
                    borderWidth: '3px',
                    borderColor: 'slateBlue'
                }}
                px={'42px'}
                py={'42px'}>
                {input?.checked && (
                    <Box position={'absolute'} top={0} left={0} w={'100%'} h={'100%'} bg={'primary'} opacity={0.1} />
                )}
                <Box
                    {...checkbox}
                    w={'20px'}
                    h={'20px'}
                    _checked={{
                        bg: 'slateBlue'
                    }}
                    borderRadius="100%"
                    background={'grey6'}
                    borderColor={'grey5'}
                    position="absolute"
                    top={'20px'}
                    right={'20px'}
                />
                <AvatarIcon size={'25px'} stroke={input?.checked ? 'slateBlue' : ''} />
                <Spacer h={'22px'} />
                <Text fontSize={'20px'}>{props?.title}</Text>
                <Spacer h={'20px'} />
                <Text w={'110%'} color={'grey3'} fontSize={'16px'}>
                    {props?.subtitle}
                </Text>
            </VStack>
        </Box>
    );
}
