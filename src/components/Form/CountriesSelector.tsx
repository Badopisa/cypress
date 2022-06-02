import React from "react";
import {FormControl, FormErrorMessage, FormLabel, Select} from "@chakra-ui/react";
import {FieldErrors, FieldValues, UseFormRegisterReturn} from "react-hook-form";

export function CountriesSelector(props: { errors: FieldErrors<FieldValues>, useFormRegisterReturn: UseFormRegisterReturn, map: any }) {
    return <FormControl data-testid="countries-dropdown" mb={5} isInvalid={props.errors.country}>
        <FormLabel htmlFor="country">
            Country
        </FormLabel>
        <Select
            variant="outline" placeholder="Select Country" {...props.useFormRegisterReturn}>
            {props.map}
        </Select>
        <FormErrorMessage>{props.errors.country && props.errors.country.message}</FormErrorMessage>
    </FormControl>;
}
