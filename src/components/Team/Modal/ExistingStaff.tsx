import {
    Button,
    VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Input,
    Flex,
    Text,
    Avatar,
    SimpleGrid,
    Image,
    Stack,
    FormControl,
    useToast
} from '@chakra-ui/react';

import { SearchIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import Confirmation from './Confirmation';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { filterStaffs } from '@/store/actions/teamActions';
import { UserDataType } from '@/types/AuthDataType';
import {
    addSelectedStaffsToTeam,
    checkSelectedStaff,
    getAllStaffs
} from '@/store/actions/staffActions';

type ExistingStaffType = {
    isOpen: boolean;
    onClose: (value: boolean) => void;
    image?: string;
    setSelected?: (value: boolean) => void;
    title?: string;
    buttonTitle?: string;
};
const ExistingStaff = ({
    isOpen,
    onClose,
    title = 'Add Existing Staffs',
    buttonTitle = 'ADD STAFF'
}: ExistingStaffType) => {
    const { user }: { user: UserDataType } = useSelector((state: RootStateOrAny) => state.auth);
    const { filteredStaffs, currentTeam }: { filteredStaffs: any; currentTeam: any } = useSelector(
        (state: RootStateOrAny) => state.team
    );
    const { selectedStaffs }: { selectedStaffs: any } = useSelector(
        (state: RootStateOrAny) => state.staff
    );
    const [searchText, setSearchText] = useState('');
    const toast = useToast();
    const dispatch = useDispatch();

    const [selectConfirmation, setSelectedConfirmation] = useState<boolean>(false);

    const handleSelect = () => {
        dispatch(
            addSelectedStaffsToTeam(
                selectedStaffs,
                currentTeam.id,
                user?.clubs[0]?.id,
                toast,
                onClose,
                setSelectedConfirmation
            )
        );
    };
    const handleSelectStaff = (id: string, role: string) => {
        dispatch(checkSelectedStaff(id, role, currentTeam.id));
    };

    useEffect(() => {
        console.log('called');
        dispatch(getAllStaffs(user?.clubs[0]?.id));
    }, []);

    const handleStaffSearch = (e: React.FormEvent<HTMLInputElement>) => {
        const text = e.currentTarget.value;
        setSearchText(text);
        if (text.length < 1 || text.length > 2) {
            dispatch(filterStaffs(text));
        }
    };
    return (
        <>
            <Modal isOpen={isOpen} onClose={() => onClose(false)}>
                <ModalOverlay />
                <ModalContent w="xl" px={8} h="auto" bg="grey" color="white" borderRadius="18px">
                    <ModalHeader
                        p="24px 24px 4px"
                        textAlign="center"
                        fontSize="18px"
                        fontWeight="600">
                        {title}
                    </ModalHeader>
                    <ModalBody mt={5}>
                        <VStack spacing={4}>
                            <Flex direction="row" w="100%">
                                <FormControl p="0.2em" bg="black" display="flex" borderRadius="lg">
                                    <SearchIcon alignSelf="center" ml={2} color="grey" />
                                    <Input
                                        variant={'solid'}
                                        bg="transparent"
                                        id={'text'}
                                        type={'text'}
                                        onChange={handleStaffSearch}
                                        value={searchText}
                                        placeholder={'Search for players'}
                                        aria-label={'Search for Players'}
                                    />
                                </FormControl>
                            </Flex>
                        </VStack>

                        <Stack w="100%" spacing={8}>
                            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} mt={8} spacing={8}>
                                {filteredStaffs?.map((staff: any) => (
                                    <VStack
                                        key={staff.id}
                                        onClick={() =>
                                            handleSelectStaff(staff?.user?.id, staff?.role)
                                        }
                                        cursor={'pointer'}>
                                        <Avatar
                                            bg="ash"
                                            boxSize={{ base: '2rem', md: '4rem' }}
                                            src={staff?.user?.photo}
                                            position={'relative'}
                                            top={0}
                                            zIndex={1}
                                        />
                                        {selectedStaffs.some(
                                            (contStaff: any) => contStaff['id'] === staff?.user?.id
                                        ) && (
                                            <Image
                                                src={'/icons/checked.svg'}
                                                alt="checked"
                                                w={8}
                                                h={8}
                                                color="primary"
                                                position={'absolute'}
                                                zIndex={3}
                                            />
                                        )}
                                        <Text fontSize={'xxs'} fontWeight="semibold">
                                            {`${staff?.user?.first_name} ${staff?.user?.last_name}`}
                                        </Text>
                                        <Text fontSize={'xxs'}>{staff?.user?.position}</Text>
                                    </VStack>
                                ))}
                            </SimpleGrid>
                        </Stack>
                    </ModalBody>

                    <ModalFooter w="full" py={{ base: 4, md: 8 }}>
                        <VStack spacing={4} w="full">
                            {selectedStaffs?.length > 0 && (
                                <Button variant="action" w="full" onClick={handleSelect}>
                                    {buttonTitle}
                                </Button>
                            )}
                        </VStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Confirmation
                jersyPng={'/images/imgs/success.svg'}
                isOpen={selectConfirmation}
                onClose={setSelectedConfirmation}
                body={'Sonalysis will notify this player of the changes made'}
                title="New Player Added"
                buttonTitle={'OKAY, THANK YOU'}
            />
        </>
    );
};

export default ExistingStaff;
