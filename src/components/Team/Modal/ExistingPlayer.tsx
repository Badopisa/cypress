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

} from '@chakra-ui/react';
import PlayerExistingCard from '../PlayerExistingCard';
import { BsSearch } from 'react-icons/bs';


type ExistingPlayerType = {
	isOpen: boolean, 
	onClose: (value: boolean)=> void,
	jersyPng: string,
	setSelected:(value: boolean)=>void,
	title?: string,
	buttonTitle?: string
}
const ExistingPlayer = ({isOpen, onClose, jersyPng, setSelected, title ="Add Existing Players", buttonTitle="ADD PLAYER"}: ExistingPlayerType) => {
	const handleSelect = ()=>{
        setSelected(true)
    }
    return (
        <Modal isOpen={isOpen} onClose={()=>onClose(false)}>
				<ModalOverlay />
				<ModalContent w="xl" px={8} h="auto" bg="grey" color="white" borderRadius="18px">
					<ModalHeader p="24px 24px 4px" textAlign="center" fontSize="18px" fontWeight="600">
						{title}
					</ModalHeader>
					<ModalBody mt={5}>
						<VStack spacing={4}>
							<Flex direction="row" w="100%">
								<Input id="search" name="search" type="text" placeholder="Search for your member" />
								<Button leftIcon={<BsSearch />} bg="#3E3E3E" ml={3} variant="solid" />
							</Flex>
						</VStack>
						
                        <VStack w="100%" mt="32px" spacing={8}>

                            <PlayerExistingCard name="John" position="left back" image={jersyPng} click={handleSelect} />
                        
                            <PlayerExistingCard name="John" position="left back" image={jersyPng} click={handleSelect}/>
                        
                            <PlayerExistingCard name="John" position="left back" image={jersyPng} click={handleSelect}/>
                        </VStack>
						
					</ModalBody>

					<ModalFooter w="full" py={{base:4, md:8}}>
						<VStack spacing={4} w="full" >
							<Button variant='action' w="full">
								{buttonTitle}
							</Button>
							<Button
								variant='outline'
								w="full"
								onClick={() =>onClose(false)}
							>
								BACK
							</Button>
						</VStack>
					</ModalFooter>
				</ModalContent>
			</Modal>
    )
}

export default ExistingPlayer
