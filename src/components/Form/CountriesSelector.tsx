import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react';
import { FieldErrors, FieldValues, UseFormRegisterReturn } from 'react-hook-form';

export function CountriesSelector(props: {
    errors: FieldErrors<FieldValues>;
    useFormRegisterReturn: UseFormRegisterReturn;
    map: any;
}) {
    return (
        <FormControl data-testid="countries-dropdown" mb={5}>
            <FormLabel color="#C9D0CD" fontSize="14px" htmlFor="country">
                COUNTRY
            </FormLabel>
            <Select variant="outline" placeholder="Select Country" {...props.useFormRegisterReturn}>
                {props.map}
            </Select>
            <FormErrorMessage>{props.errors.country && 'Country is required'}</FormErrorMessage>
        </FormControl>
    );
}
