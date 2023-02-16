import React from 'react';
import {FormControl, FormErrorMessage, FormLabel, Select, Text} from '@chakra-ui/react';
import { FieldErrors, FieldValues, UseFormRegisterReturn } from 'react-hook-form';

export function CountriesSelector(props: {
    errors: any;
    useFormRegisterReturn: UseFormRegisterReturn;
    map: any;
}) {
    return (
        <FormControl
            data-testid="countries-dropdown"
            mb={'32px'}
            isInvalid={!!props.errors.country}>
            <FormLabel mb={'10px'} htmlFor="country">
                Country
            </FormLabel>
            <Select
                id="email"
                focusBorderColor="purple"
                borderColor={'grey5'}
                size={'lg'}
                borderRadius={'6px'}
                _placeholder={{
                    opacity: 1,
                    color: 'inputText',
                    fontSize: '16px',
                    fontWeight: '400'
                }}
                placeholder="Select country"
                {...props.useFormRegisterReturn}>
                {props.map}
            </Select>
            <FormErrorMessage>
                {props.errors.country && (
                    <Text color={'red'}>{`${props.errors.country.message}`}</Text>
                )}
            </FormErrorMessage>
        </FormControl>
    );
}
