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
    useToast,
    InputGroup,
    InputLeftElement,
    HStack,
    Checkbox
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
import { BsSearch } from 'react-icons/bs';

type ExistingStaffType = {
    isOpen: boolean;
    onClose: any;
    image?: string;
    setSelected?: any;
    title?: string;
    buttonTitle?: string;
};
const ExistingStaff = ({
    isOpen,
    onClose,
    title = 'Add existing staffs',
    buttonTitle = 'Continue'
}: ExistingStaffType) => {
    const { user }: { user: UserDataType } = useSelector((state: RootStateOrAny) => state.auth);
    const { filteredStaffs, currentTeam }: { filteredStaffs: any; currentTeam: any } = useSelector(
        (state: RootStateOrAny) => state.team
    );
    const { selectedStaffs }: { selectedStaffs: any } = useSelector(
        (state: RootStateOrAny) => state.staff
    );
    const [searchText, setSearchText] = useState('');
    const { isLoading } = useSelector((state: RootStateOrAny) => state.msg);
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
    }, [dispatch, user?.clubs]);

    const handleStaffSearch = (e: React.FormEvent<HTMLInputElement>) => {
        const text = e.currentTarget.value;
        setSearchText(text);
        if (text.length < 1 || text.length > 2) {
            dispatch(filterStaffs(text));
        }
    };
    return (
        <>
            <Modal
                scrollBehavior={'inside'}
                size={'lg'}
                isCentered
                isOpen={isOpen}
                onClose={() => onClose(false)}>
                <ModalOverlay />
                <ModalContent w="xl" px={8} h="auto" bg="white" color="black2" borderRadius="18px">
                    <ModalHeader
                        p="24px 24px 4px"
                        textAlign="center"
                        color={'black2'}
                        fontSize="40px"
                        fontWeight="700">
                        {title}
                    </ModalHeader>
                    <ModalBody mt={5}>
                        <VStack mb={'35px'} spacing={4}>
                            <InputGroup w="100%">
                                <InputLeftElement pointerEvents="none">
                                    <BsSearch color="grey" />
                                </InputLeftElement>
                                <Input
                                    type="text"
                                    placeholder="Search player"
                                    value={searchText}
                                    onChange={handleStaffSearch}
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
                        </VStack>

                        <Stack w="100%" spacing={8}>
                            <VStack overflowY="auto">
                                {filteredStaffs?.map((staff: any) => (
                                    <HStack
                                        key={staff?.user?.id}
                                        w={'100%'}
                                        justifyContent={'space-between'}>
                                        <HStack key={staff.id} cursor={'pointer'}>
                                            <Avatar
                                                name={`${staff?.user?.first_name} ${staff?.user?.last_name}`}
                                                src={staff?.user?.photo}
                                                w={'40px'}
                                                h={'40px'}
                                                mr={'10px'}
                                                top={0}
                                                zIndex={1}
                                            />
                                            <VStack alignItems={'flex-start'}>
                                                <Text
                                                    fontSize={'16px'}
                                                    fontWeight="400"
                                                    color={'black2'}>
                                                    {`${staff?.user?.first_name} ${staff?.user?.last_name}`}
                                                </Text>
                                                <Text
                                                    fontSize={'12px'}
                                                    color={'grey3'}
                                                    fontWeight={'400'}>
                                                    {staff?.user?.role} ~ {staff?.user?.country}
                                                </Text>
                                            </VStack>
                                        </HStack>
                                        <Checkbox
                                            size={'lg'}
                                            onChange={() =>
                                                handleSelectStaff(staff?.id, staff?.role)
                                            }
                                            iconColor={'white'}
                                            borderColor={'grey6'}
                                            _checked={{
                                                background: 'primary',
                                                color: 'white',
                                                borderColor: 'slateBlue'
                                            }}
                                            isChecked={selectedStaffs.some(
                                                (contStaff: any) => contStaff['id'] === staff?.id
                                            )}
                                        />
                                    </HStack>
                                ))}
                            </VStack>
                        </Stack>
                    </ModalBody>

                    <ModalFooter w="full" py={{ base: 4, md: 8 }}>
                        <VStack spacing={4} w="full">
                            <Button
                                isLoading={isLoading}
                                size={'lg'}
                                mb={'20px'}
                                w="full"
                                loadingText={'Adding staff'}
                                isDisabled={selectedStaffs?.length < 1}
                                onClick={handleSelect}>
                                {buttonTitle}
                            </Button>
                        </VStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Confirmation
                jersyPng={'/images/imgs/success.svg'}
                isOpen={selectConfirmation}
                onClose={setSelectedConfirmation}
                body={'Sonalysis will notify these staffs of the changes made'}
                title="New staffs added"
                buttonTitle={'Okay, thank you'}
            />
        </>
    );
};

export default ExistingStaff;
