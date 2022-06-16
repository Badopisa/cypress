import React, { ReactNode, useState } from 'react';
import { Flex, Icon, FlexProps } from '@chakra-ui/react';

import Link from '@/components/Elements/Link/Link';

import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { logout } from '@/store/actions/authActions';

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  link: string;
}
const DashboardNavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
  const [linkSelected, setLinkSelected] = useState<boolean>(false);
  const handleNav = (e: React.FormEvent<HTMLAnchorElement>) => {
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
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align='center'
        p='8'
        role='group'
        cursor='pointer'
        bg={linkSelected ? 'primary' : 'transparent'}
        _hover={{
          bg: 'active',
          color: 'white',
        }}
        color='white'
        onClick={() => setLinkSelected(true)}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='20'
            _groupHover={{
              color: 'white',
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
