import React from 'react';
import { Box, Text, Center, Image, VStack, useRadio, UseRadioProps } from '@chakra-ui/react';
import { AiFillCheckCircle } from 'react-icons/ai';


const PaymentCard = ({
    radio,
    value,
    picture
}: {
    picture: string;
    value: string;
    radio: UseRadioProps;
}) => {
    const { getInputProps, getCheckboxProps } = useRadio(radio);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
        <Box as="label" w="124px" h="107px" bg="#242424" rounded="15px" position="relative">
            <input {...input} />

            <Center mt="18px">
                <VStack>
                    <Image src={picture} alt={value} />
                    <Text>{value}</Text>
                </VStack>
            </Center>
            <Center
                {...checkbox}
                position="absolute"
                w="100%"
                h="100%"
                top="0"
                left="0"
                cursor="pointer"
                opacity={0}
                rounded="15px"
                _checked={{
                    bg: 'rgba(0,0,0,0.7)',
                    opacity: 1
                }}
                _focus={{
                    boxShadow: 'outline'
                }}>
                <AiFillCheckCircle size="24px" color="#811AFF" />
            </Center>
        </Box>
    );
};

export default PaymentCard;
