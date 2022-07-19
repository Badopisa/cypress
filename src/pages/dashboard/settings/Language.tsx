import { VStack, FormControl, Text, Select } from '@chakra-ui/react';
import React from 'react';

const Language = () => {
    const languages = [
        {
            id: 1,
            name: 'English'
        },
        {
            id: 2,
            name: 'Spanish'
        }
    ];
    const handleSelectedLanguage = (e: any) => {
        const selectedLanguage = e.target.value;
        console.log(`${selectedLanguage} is selected`);
    };
    return (
        <VStack w={{ base: '100%', md: '40%' }} align={'left'}>
            <Text mb={6} fontWeight={'bold'}>
                Language
            </Text>

            <FormControl w={'60%'}>
                <Select id="players" onChange={handleSelectedLanguage}>
                    {languages.map((language: any) => (
                        <option key={language.id} value={language.name}>
                            {language.name}
                        </option>
                    ))}
                </Select>
            </FormControl>
        </VStack>
    );
};

export default Language;
