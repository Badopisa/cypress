import {
	Button,
	Center,
	VStack,
	Avatar,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	GridItem,
	FormLabel,
	Input,
	FormErrorMessage,
	Select,
	HStack,
	FormControl,
    Text,
} from '@chakra-ui/react';
import { AiFillPicture } from 'react-icons/ai';

type NewPlayerType = {
	isOpen: boolean,
	onClose: (value: boolean)=> void,
}

const NewPlayer = ({isOpen, onClose}: NewPlayerType) => {

	return (
        <Modal isOpen={isOpen} onClose={()=>onClose(false)}>
				<ModalOverlay />
				<ModalContent px={6} w="auto" h="auto" bg="grey" color="white" borderRadius="3xl">
					<ModalHeader py={8} textAlign="center" fontSize="lg" fontWeight="bold">
						Create New Player'
						<Text fontSize="sm" fontWeight="light">
							Fill in a player’s details and send an invite
						</Text>
					</ModalHeader>
					<ModalBody>
						<Center>
							<VStack mb={6} mt={2}>
								<Avatar bg="black" boxSize="80px" icon={<AiFillPicture size="30px" color="white" />} />
								<Text fontSize="sm" fontWeight="bold" color="blue">
									Upload Image
								</Text>
							</VStack>
						</Center>
						<VStack spacing={6}>
							<HStack spacing={6}>
								<GridItem colSpan={1}>
									<FormControl>
										<FormLabel fontSize="sm" htmlFor="lastname">FIRST NAME</FormLabel>
										<Input id="lastname" name="lastname" type="text" placeholder="eg.John" />
										<FormErrorMessage>Firstname is required.</FormErrorMessage>
									</FormControl>
								</GridItem>
								<GridItem colSpan={1}>
									<FormControl>
										<FormLabel fontSize="sm" htmlFor="lastname">LAST NAME</FormLabel>
										<Input id="lastname" name="lastname" type="text" placeholder="eg.Dough" />
										<FormErrorMessage>Lastname is required.</FormErrorMessage>
									</FormControl>
								</GridItem>
							</HStack>
							<HStack spacing={6} w="full" >
								<GridItem  w="full">
									<FormControl>
										<FormLabel fontSize="sm" htmlFor="country">POSITION</FormLabel>
										<Select name="country" variant="outline" placeholder="Choose">
											<option value="option1">Option 1</option>
											<option value="option2">Option 2</option>
											<option value="option3">Option 3</option>
										</Select>
										<FormErrorMessage>Position is required.</FormErrorMessage>
									</FormControl>
								</GridItem>
								<GridItem w="full">
									<FormControl>
										<FormLabel fontSize="sm" htmlFor="lastname">JERSY NUMBER</FormLabel>
										<Input id="lastname" name="lastname" type="text" placeholder="eg.No. 9" />
										<FormErrorMessage>Jersy Number is required.</FormErrorMessage>
									</FormControl>
								</GridItem>
							</HStack>
							<GridItem colSpan={1} w="full">
								<FormControl>
									<FormLabel fontSize="sm" htmlFor="lastname">EMAIL</FormLabel>
									<Input id="lastname" name="lastname" type="text" placeholder="example@gmail.com" />
									<FormErrorMessage>Email address is required.</FormErrorMessage>
								</FormControl>
							</GridItem>
						</VStack>
					</ModalBody>

					<ModalFooter w="100%">
						<VStack spacing={4} w="100%" mb="12px">
							<Button variant='action' w="full" 
							>
								ADD PLAYER
							</Button>
							<Center>
								<Text
									w='full'
									onClick={()=>onClose(false)}
									cursor="pointer"
								>
									BACK
								</Text>
							</Center>
						</VStack>
					</ModalFooter>
				</ModalContent>
			</Modal>
    )
}

export default NewPlayer
