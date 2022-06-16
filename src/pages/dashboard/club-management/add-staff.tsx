import {authenticatedRoute} from '@/components/Layout/AuthenticatedRoute'
import React, {useState} from 'react'
import {
    Text,
    Box,
    Spacer,
    VStack,
    Stack,
    Center,
    Button,
    SimpleGrid,
} from '@chakra-ui/react'
import DashboardDesktopNav from '@/components/Layout/AuthenticatedRoute/DesktopNav';
import {useRouter} from 'next/router';
import Steps from '@/components/Team/Steps';
import BlankTeam from '@/components/Team/BlankTeam';
import ExistingPlayer from '@/components/Team/Modal/ExistingPlayer';
import Confirmation from '@/components/Team/Modal/Confirmation';
import PlayerCard from '@/components/Team/PlayerCard';
import NewStaff from '@/components/Team/Modal/NewStaff';

const AddStaff = () => {
    const [create, setCreate] = useState<boolean>(false);
    const [existing, setExisting] = useState<boolean>(false);
    const [select, setSelected] = useState<boolean>(false)
    const [finish, setFinish] = useState<boolean>(false)
    const handleCreate = () => {
        setCreate(true);
    };
    const handleExist = () => {
        setExisting(true);
    };
    const handleFinish = () => {
        setFinish(true)
    }
    const router = useRouter()

    return (
        <>
            <DashboardDesktopNav hasArrow />
            <Box color="white" py={{base: 8, md: 8}} px={{base: 4, md: 8}}>
                <Text fontSize="3xl" fontWeight="medium">
                    Create Team
                </Text>
                <Steps current={3} />
            </Box>
            <Box px={{base: 8, md: 8}} color="white">
                <Text fontSize="md" fontWeight="medium">
                    Create or add existing Staffs
                </Text>
                <Stack direction={{base: 'column', md: 'row'}} py={{base: 8, md: 8}} w="80%" spacing={{base: 1, md: 4}}>
                    <Button
                        fontSize="xs"
                        variant="action"
                        onClick={handleCreate}
                        w="full"
                    >
                        ADD A STAFF
                    </Button>
                    <Spacer />
                    <Button
                        fontSize="xs"
                        variant="outline"
                        onClick={handleExist}
                        w="full"
                    >
                        ADD EXISTING STAFF
                    </Button>
                    <Spacer />
                    <Button px={6} bg="grey" color="white" fontSize="xs" ml="8" w="83"
                    >
                        0/5
                    </Button>
                </Stack>
                <SimpleGrid minChildWidth={{base: '100%', md: '166px'}} spacing={{base: '14px', md: '40px'}} mt={8}
                            mb={8}>
                    <PlayerCard image='/images/image/jersy.png' name='Edinson Cavani' position='Forward'
                                status='Pending Invite' />
                    <PlayerCard image='/images/image/jersy.png' name='John Doe' position='Center'
                                status='Wolves FC B Team' />
                    <PlayerCard image='/images/image/jersy.png' name='Edinson Cavani' position='Forward'
                                status='Pending Invite' />
                    <PlayerCard image='/images/image/jersy.png' name='Edinson Cavani' position='Forward'
                                status='Pending Invite' />
                    <PlayerCard image='/images/image/jersy.png' name='Edinson Cavani' position='Forward'
                                status='Pending Invite' />
                    <PlayerCard image='/images/image/jersy.png' name='Edinson Cavani' position='Forward'
                                status='Pending Invite' />
                    <PlayerCard image='/images/image/jersy.png' name='Edinson Cavani' position='Forward'
                                status='Pending Invite' />
                    <PlayerCard image='/images/image/jersy.png' name='Edinson Cavani' position='Forward'
                                status='Pending Invite' />
                </SimpleGrid>
                <BlankTeam image='/images/image/backroom.png' title='No Backroom Staff' />
                <Center>
                    <VStack mb={10} w={{base: '40%', md: '40%'}} spacing={4} mx={{base: 8, md: 12}}>
                        <Button
                            fontSize="sm"
                            variant='action'
                            px={{base: '80%', md: '50%'}}
                            onClick={handleFinish}
                        >
                            Finish Team Creation
                        </Button>
                        <Text
                            fontSize="sm"
                            onClick={() => router.back()}
                            cursor="pointer"
                        >
                            PREVIOUS STEP
                        </Text>
                    </VStack>
                </Center>

                <ExistingPlayer title="Add Existing Staff" buttonTitle="Add Staff" isOpen={existing}
                                onClose={setExisting} setSelected={setSelected} />

                <NewStaff isOpen={create} onClose={setCreate} />

                <Confirmation
                    jersyPng='/images/image/jersy.png'
                    isOpen={select}
                    onClose={setSelected}
                    playerName='Kareem Benzema'
                    title="Striker"
                />

                <Confirmation
                    jersyPng='/images/image/confirmation.png'
                    isOpen={finish}
                    onClose={setFinish}
                    playerName='Team Created!'
                    body='Sonalysis will notify those that you have newly invited via email'
                    buttonTitle="GO TO TEAM LIST"
                />

            </Box>

        </>
    )
}

export default authenticatedRoute(AddStaff)
