import BlankTeam from '@/components/Team/BlankTeam';
import PlayerCard from '@/components/Team/PlayerCard';
import TeamCard from '@/components/Team/TeamCard';
import {teams} from '@/data/TeamData';
import {TeamDataType} from '@/types/TeamDataType';
import {
    Box,
    Button,
    Center,
    Flex,
    SimpleGrid,
    Spinner,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React, {useState} from 'react';
import EditStaffDetails from "@/components/Team/Modal/EditStaffDetails";
import Confirmation from "@/components/Team/Modal/Confirmation";
import {getPlayerDetails} from "@/store/actions/playerActions";
import {saveNewStaffData} from "@/store/actions/staffActions";
import {useDispatch} from "react-redux";
import NewStaff from "@/components/Team/Modal/NewStaff";

const AllStaffs = ({allStaffs, isLoading}: any) => {
    const [searchText, setSearchText] = useState('');
    const [createStaff, setCreateStaff] = useState<boolean>(false);
    const [editStaff, setEditStaff] = useState<boolean>(false);
    const [select, setSelected] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleCreateStaff = () => {
        setCreateStaff(true);
    };

    const handleEditStaff = (staff: any) => {
        dispatch(saveNewStaffData(staff))
        setEditStaff(true);
    };

    return (
        <>
            <Flex direction='row'>
                <Button
                    w='116px'
                    fontSize='xs'
                    fontWeight='semibold'
                    variant='outline'
                    _hover={{bg: 'white', color: 'dark', fontWeight: 'bold'}}
                    onClick={handleCreateStaff}
                >
                    CREATE A STAFF
                </Button>
                <Button
                    bg='grey'
                    color='white'
                    fontSize='sm'
                    ml='8'
                    w='83'
                    _hover={{
                        bg: 'primary',
                        color: 'white',
                        fontWeight: 'bold',
                    }}
                >
                    {allStaffs?.length}/100
                </Button>
            </Flex>
            <Box>
                {isLoading ? (
                    <Center my='16'>
                        <Spinner size='xl' />
                    </Center>
                ) : allStaffs.length > 0 ? (
                    <SimpleGrid
                        columns={{base: 1, sm: 2, lg: 4}}
                        width='min(90%, 1200px)'
                        spacing={{base: '14px', md: '40px'}}
                        mt={8}
                        mb={8}
                    >
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
                ) : (
                    <BlankTeam
                        image='/images/image/jersy.png'
                        title='No staff created yet'
                    />
                )}
            </Box>
            <NewStaff isOpen={createStaff} onClose={setCreateStaff} useCurrentTeamID={false} />
            <EditStaffDetails
                isOpen={editStaff}
                onClose={setEditStaff}
                setSelected={setSelected}
            />
            <Confirmation
                jersyPng={'/images/imgs/success.svg'}
                isOpen={select}
                onClose={setSelected}
                body={'Sonalysis will notify this Staff of the changes made'}
                title='Changes Saved'
                buttonTitle={'OKAY, THANK YOU'}
            />
        </>
    );
};

export default AllStaffs;
