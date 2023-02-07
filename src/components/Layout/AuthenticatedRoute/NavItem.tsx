import React, { useState } from 'react';
import {Flex, Icon, FlexProps, Box} from '@chakra-ui/react';

import Link from '@/components/Elements/Link/Link';

import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { logout } from '@/store/actions/authActions';
import {useRouter} from "next/router";

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
    link: string;
}
const DashboardNavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
    const [linkSelected, setLinkSelected] = useState<boolean>(false);
    const router = useRouter();
    const handleNav = (e: React.FormEvent<HTMLAnchorElement>) => {
        setLinkSelected(router.pathname === link);
        console.log('link selected bool', linkSelected);
        console.log('link selected link', link);
        console.log('link selected path', router.pathname);

        if (children === 'Logout') {
            e.preventDefault();
            logout();
        }
    };
    return (
        <Link
            href={link}
            onClick={handleNav}
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                py="10px"
                px="15px"
                borderRadius="5px"
                role="group"
                cursor="pointer"
                fontSize="12px"
                borderColor={router.pathname === link ? 'purple' : ''}
                color={router.pathname === link ? 'purple' : 'black2'}
                // bg={linkSelected ? 'purlp' : 'transparent'}
                borderWidth={'1px'}
                _hover={{
                    color: 'purple',
                    borderWidth: '1px',
                    borderColor: 'purple'
                }}
                onClick={() => setLinkSelected(true)}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="20"
                        color={router.pathname === link ? 'purple' : ''}
                        _groupHover={{
                            color: 'purple'
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

export default DashboardNavItem;
