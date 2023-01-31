import { useState } from 'react';
import { Box, Flex, Input, List, ListItem, Text } from '@chakra-ui/react';
import Flag from 'react-world-flags';

export type Country = {
    name: string;
    flag: string;
    code: string;
    dial_code: string;
};

export type Props = {
    data: Country[];
    onChange: any;
};

export const SearchOnList = ({ data, onChange }: Props) => {
    const [filteredList, setFilteredList] = useState(data);
    const [selectedItem, setSelectedItem] = useState<Country | undefined>(undefined);

    const handleSearch = (event: any) => {
        const value = event.target.value.toLowerCase();
        const result: any =
            data?.filter((item: any) => {
                return item.name.toLowerCase().includes(value);
            }) || [];
        setFilteredList(result);
    };

    return (
        <Box
            my={1}
            maxH="xs"
            bg="white"
            width="full"
            zIndex={999}
            height="auto"
            overflow="auto"
            borderRadius="lg"
            position="absolute"
            boxShadow="0px 1px 30px rgba(0, 0, 0, 0.1)">
            <Box position="sticky" top="0" padding={4} bg="white">
                <Input
                    size="sm"
                    type="search"
                    autoComplete="on"
                    placeholder="Search Country"
                    onChange={(event) => handleSearch(event)}
                    _focusWithin={{ borderColor: 'purple' }}
                    _invalid={{ bg: 'red', borderColor: 'grey6' }}
                    focusBorderColor="purple"
                    borderColor={'grey5'}
                    borderRadius={'6px'}
                    _placeholder={{
                        opacity: 1,
                        color: 'inputText',
                        fontSize: '16px',
                        fontWeight: '400'
                    }}
                />
            </Box>

            <List>
                {filteredList?.map((item: Country, index: number) => (
                    <ListItem
                        key={index}
                        paddingY={2}
                        paddingX={5}
                        color="#ACB9C4"
                        cursor="pointer"
                        fontWeight="500"
                        textTransform="capitalize"
                        onClick={() => {
                            onChange(item);
                            setSelectedItem(item);
                        }}
                        style={{ transition: 'all .125s ease' }}
                        _hover={{ bg: 'purple', color: 'white' }}
                        sx={
                            item?.code === selectedItem?.code
                                ? { backgroundColor: 'purple', color: 'white' }
                                : {}
                        }>
                        <Flex>
                            <Flag height="20px" width="20px" code={item?.code || ''} />
                            <Text ml={4} as="span">
                                {item?.name}
                            </Text>
                        </Flex>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};
