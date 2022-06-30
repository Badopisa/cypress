import BlankTeam from '@/components/Team/BlankTeam';
import PlayerCard from '@/components/Team/PlayerCard';
import TeamCard from '@/components/Team/TeamCard';
// import { teams } from '@/data/TeamData';
import { TeamDataType } from '@/types/TeamDataType';
import { Box, Button, Center, Flex, SimpleGrid, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const AllStaffs = ({ allStaffs, isLoading, teams }: any) => {
    const [searchText, setSearchText] = useState('');

    return (
        <>
            <Flex direction="row">
                <Button
                    w="116px"
                    fontSize="xs"
                    fontWeight="semibold"
                    variant="outline"
                    _hover={{ bg: 'white', color: 'dark', fontWeight: 'bold' }}
                    // onClick={handleCreateTeam}
                >
                    CREATE A STAFF
                </Button>
                <Button
                    bg="grey"
                    color="white"
                    fontSize="sm"
                    ml="8"
                    w="83"
                    _hover={{
                        bg: 'primary',
                        color: 'white',
                        fontWeight: 'bold'
                    }}>
                    {teams?.length}/100
                </Button>
            </Flex>
            <Box>
                {isLoading ? (
                    <Center my="16">
                        <Spinner size="xl" />
                    </Center>
                ) : allStaffs?.length > 0 ? (
                    <SimpleGrid
                        columns={{ base: 1, sm: 2, lg: 4 }}
                        width="min(90%, 1200px)"
                        spacing={{ base: '14px', md: '40px' }}
                        mt={8}
                        mb={8}>
                        {allStaffs.map((staff: any) => (
                            <PlayerCard
                                image={staff?.photo}
                                key={staff.id}
                                name={staff.name}
                                position={staff.position}
                                team={staff.team}
                                // click={() => handlePlayerSelect(team)}
                            />
                        ))}
                    </SimpleGrid>
                ) : (
                    <BlankTeam image="/images/image/jersy.png" title="No staff created yet" />
                )}
            </Box>
        </>
    );
};

export default AllStaffs;
