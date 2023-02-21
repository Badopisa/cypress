import {
    Box,
    Text,
    Input,
    InputGroup,
    useDisclosure,
    useOutsideClick,
    InputLeftElement
} from '@chakra-ui/react';
import Countries from './countries.json';
import { AsYouType } from 'libphonenumber-js';
import { PhoneNumberInputProps } from './types';
import { useState, useEffect, useRef } from 'react';
import { Country, SearchOnList } from './SearchOnList';
import Flag from 'react-world-flags';

export const PhoneNumberInput = ({
    onChange,
    id,
    useFormRegisterReturn
}: PhoneNumberInputProps) => {
    const ref = useRef(null);
    const [number, setNumber] = useState('');
    const [country, setCountry] = useState('');
    const [countryFlag, setCountryFlag] = useState(`NG`);
    const { isOpen, onToggle, onClose } = useDisclosure();

    useOutsideClick({
        ref: ref,
        handler: () => onClose()
    });
    useEffect(() => {
        setCountry('+234');
    }, []);

    useEffect(() => {
        if (country !== '' || number !== '') {
            onChange(`${country}${number}`);
        }
    }, [country, number, onChange]);

    const onCountryChange = (item: Country) => {
        const parsedNumber = new AsYouType().input(`${country}${number}`);

        setCountry(item?.dial_code);
        setCountryFlag(item?.code);
        onChange(parsedNumber);
        onClose();
    };

    const onPhoneNumberChange = (event: any) => {
        const value = event.target.value;
        const parsedNumber = new AsYouType().input(`${country}${number}`);
        console.log('parsed1', parsedNumber);

        setNumber(value);
        onChange(parsedNumber);
    };

    return (
        <>
            <Box as="section" ref={ref} position="relative">
                <InputGroup>
                    <InputLeftElement width="6.5em" cursor="pointer" onClick={onToggle}>
                        <Box ml="20px" mr="10px" mt={'8px'} width="50%" flex={1}>
                            <Flag height="1rem" code={countryFlag || ''} />
                        </Box>
                        <Text mt={'6px'}>
                            {country ? (
                                <Text color="grey2" fontWeight="bold">
                                    {country}
                                </Text>
                            ) : (
                                <Text fontWeight="bold" color="grey5">
                                    +234
                                </Text>
                            )}
                        </Text>
                        <Box
                            ml="10px"
                            borderLeftWidth="2px"
                            mt={'10px'}
                            borderColor="grey4"
                            height="60%"
                        />
                    </InputLeftElement>
                    <Input
                        id={id}
                        pl="7em"
                        type="tel"
                        value={number}
                        placeholder="901-912-35646"
                        {...useFormRegisterReturn}
                        onChange={onPhoneNumberChange}
                        focusBorderColor="purple"
                        borderColor={'grey5'}
                        size={'lg'}
                        borderRadius={'6px'}
                        _placeholder={{
                            opacity: 1,
                            color: 'grey5',
                            fontSize: '16px',
                            fontWeight: '400'
                        }}
                    />
                </InputGroup>

                {isOpen ? <SearchOnList data={Countries} onChange={onCountryChange} /> : null}
            </Box>
        </>
    );
};
