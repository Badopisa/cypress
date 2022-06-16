import {useState} from 'react'
import {Box, Flex, Spacer} from '@chakra-ui/react'
import {CloseIcon, HamburgerIcon} from '@chakra-ui/icons'
import Link from '@/components/Elements/Link/Link'
import Logo from '@/components/Elements/Logo/Logo'
import DesktopNav from './DesktopNav'

const NavBar = () => {
    const [isHamburgerOpen, setHamburger] = useState<boolean>(false)
    return (
        <Box
            boxShadow="sm"
            position="fixed"
            zIndex={1500}
            w="full"
            h={isHamburgerOpen ? '100%' : '20'}
            bgColor="ash"
            px={{base: "20"}}
            py={{base: 5}}
        >
            <Flex mx="auto" align="center">
                <Box>
                    <Link href="/">
                        <Logo />
                    </Link>
                </Box>
                <Spacer />
                <DesktopNav />
            </Flex>
        </Box>

    )
}

export default NavBar
