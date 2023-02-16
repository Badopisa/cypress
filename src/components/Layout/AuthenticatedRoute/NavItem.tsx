import React, { useState } from 'react';
import { Flex, Icon, FlexProps, Box, Text } from '@chakra-ui/react';

import Link from '@/components/Elements/Link/Link';

import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { logout } from '@/store/actions/authActions';
import { useRouter } from 'next/router';

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
    link: string;
}
const DashboardNavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
    const [iconColor, setIconColor] = useState<string>('');
    const router = useRouter();
    const IconItem = icon;
    const handleNav = (e: React.FormEvent<HTMLAnchorElement>) => {
        // console.log('link selected link', link);
        // console.log('link selected path', router.pathname);

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
                mb={'10px'}
                onMouseEnter={() => setIconColor('white')}
                onMouseLeave={() => setIconColor('')}
                py="10px"
                px="15px"
                borderRadius="5px"
                role="group"
                cursor="pointer"
                color={'black2'}
                fontSize="12px"
                position="relative"
                borderColor={router.pathname === link ? 'slateBlue' : 'lightWhite'}
                // bg={linkSelected ? 'purlp' : 'transparent'}
                borderWidth={'1px'}
                _hover={{
                    color: 'white',
                    backgroundColor: 'black2'
                }}
                // onClick={() => setLinkSelected(true)}
                {...rest}>
                {router.pathname === link && (
                    <Box
                        position={'absolute'}
                        top={'0'}
                        opacity={0.05}
                        left={'0'}
                        h={'full'}
                        w={'full'}
                        bg={'primary'}
                    />
                )}
                {/*{icon && (*/}
                {/*    <Box*/}
                {/*        mr="4px"*/}
                {/*        size="20"*/}
                {/*        stroke={router.pathname === link ? 'purple' : ''}*/}
                {/*        _groupHover={{*/}
                {/*            color: 'purple'*/}
                {/*        }}*/}
                {/*        as={icon}*/}
                {/*    />*/}
                {/*)}*/}
                <IconItem stroke={router.pathname === link ? 'slateBlue' : iconColor} />
                {router.pathname === link ? (
                    <Text
                        fontSize={'14px'}
                        ml={'8px'}
                        fontWeight={'400'}
                        bgGradient={'linear-gradient(to right, #9741FF, #645EFD, #007DB3)'}
                        bgClip={'text'}>
                        {children}
                    </Text>
                ) : (
                    <Text ml={'8px'} fontSize={'14px'} fontWeight={'400'}>
                        {children}
                    </Text>
                )}
            </Flex>
        </Link>
    );
};

export default DashboardNavItem;
