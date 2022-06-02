import {
    Box,
    Text,
    Input,
    InputGroup,
    useDisclosure,
    useOutsideClick,
    InputLeftElement,
    FormErrorMessage
} from "@chakra-ui/react";
import Countries from "./countries.json";
import { AsYouType } from "libphonenumber-js";
import { PhoneNumberInputProps } from "./types";
import { useState, useEffect, useRef } from "react";
import { Country, SearchOnList } from "./SearchOnList";
import Flag from "react-world-flags";

export const PhoneNumberInput = ({ onChange, id, useFormRegisterReturn }: PhoneNumberInputProps) => {
    const ref = useRef(null);
    const [number, setNumber] = useState("");
    const [country, setCountry] = useState("");
    const [countryFlag, setCountryFlag] = useState(`NG`);
    const { isOpen, onToggle, onClose } = useDisclosure();

    useOutsideClick({
        ref: ref,
        handler: () => onClose()
    });

    useEffect(() => {
        if (country !== "" || number !== "") {
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

        setNumber(value);
        onChange(parsedNumber);
    };

    return (
        <>
            <Box as="section" ref={ref} position="relative">
                <InputGroup>
                    <InputLeftElement width="6.5em" cursor="pointer" onClick={onToggle}>
                        <Box ml="20px" mr="10px" width="50%" flex={1}>
                            <Flag height="1rem" code={countryFlag || ""} />
                        </Box>
                        <Text fontSize="14px">
                            {country ? <Text fontWeight="bold">{country}</Text> : <Text fontWeight="bold" color="gray">+234</Text>}
                        </Text>
                        <Box ml="10px"  borderLeftWidth="1px" borderColor="#5E5E5E" height="40%" />
                    </InputLeftElement>
                    <Input
                        id={id}
                        pl="7em"
                        type="tel"
                        value={number}
                        placeholder="901-912-35646"
                        {...useFormRegisterReturn}
                        onChange={onPhoneNumberChange}
                    />
                </InputGroup>

                {isOpen ? (
                    <SearchOnList data={Countries} onChange={onCountryChange} />
                ) : null}
            </Box>
        </>
    );
};
