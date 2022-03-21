import React, { ReactNode } from 'react';
import {
  Flex,
  Icon,
  FlexProps,
} from '@chakra-ui/react';

import Link from '@/components/Elements/Link/Link'


import { IconType } from 'react-icons';
import { ReactText } from 'react';

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
    link: string
}
const DashboardNavItem = ({ icon, children,link, ...rest }: NavItemProps) => {
    return (
      <Link href={link} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="8"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'active',
            color: 'white',
          }}
          color="white"
          {...rest}>
          {icon && (
            <Icon
              mr="4"
              fontSize="20"
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

export default DashboardNavItem
  