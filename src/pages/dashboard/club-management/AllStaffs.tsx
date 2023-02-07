import BlankTeam from '@/components/Team/BlankTeam';
import PlayerCard from '@/components/Team/PlayerCard';
import {
    Box,
    Button,
    Center,
    Flex, Input,
    InputGroup,
    InputLeftElement,
    SimpleGrid,
    Spinner
} from '@chakra-ui/react';
import React, { useState } from 'react';
import EditStaffDetails from '@/components/Team/Modal/EditStaffDetails';
import Confirmation from '@/components/Team/Modal/Confirmation';
import { saveNewStaffData } from '@/store/actions/staffActions';
import { useDispatch } from 'react-redux';
import {BsSearch} from "react-icons/bs";

const AllStaffs = ({ allStaffs, isLoading, setCreateStaff }: any) => {
    const [editStaff, setEditStaff] = useState<boolean>(false);
    const [select, setSelected] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleCreateStaff = () => {
        setCreateStaff(true);
    };

    const handleEditStaff = (staff: any) => {
        dispatch(saveNewStaffData(staff));
        setEditStaff(true);
    };

    return (
        <>
            <Box>
                {isLoading ? (
                    <Center my="16">
                        <Spinner size="xl" />
                    </Center>
                ) : allStaffs?.length > 0 ? (
                    <>
                        <InputGroup w="279px">
                            <InputLeftElement pointerEvents="none">
                                <BsSearch color="grey" />
                            </InputLeftElement>
                            <Input
                                type="text"
                                placeholder="Search for your team"
                                // value={searchText}
                                // onChange={handleTeamSearch}
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
                            />
                        </InputGroup>
                        <SimpleGrid
                            columns={{ base: 1, sm: 2, lg: 4 }}
                            width="min(90%, 1200px)"
                            spacing={{ base: '14px', md: '40px' }}
                            mt={8}
                            mb={8}>
                            {allStaffs.map((staff: any) => (
                                <PlayerCard
                                    image={staff?.user?.photo}
                                    key={staff.id}
                                    name={`${staff?.user.first_name} ${staff?.user.last_name}`}
                                    position={staff?.role}
                                    team={staff?.user.team}
                                    click={() => handleEditStaff(staff)}
                                />
                            ))}
                        </SimpleGrid>
                    </>
                ) : (
                    <BlankTeam image="/images/image/jersy.png" title="No staff created yet" />
                )}
            </Box>
            <EditStaffDetails isOpen={editStaff} onClose={setEditStaff} setSelected={setSelected} />
            <Confirmation
                jersyPng={'/images/imgs/success.svg'}
                isOpen={select}
                onClose={setSelected}
                body={'Sonalysis will notify this Staff of the changes made'}
                title="Changes Saved"
                buttonTitle={'OKAY, THANK YOU'}
            />
        </>
    );
};

export default AllStaffs;
