import React, { ReactNode } from 'react';
import {
  Flex,
  Icon,
  Link,
  FlexProps,
} from '@chakra-ui/react';

import { IconType } from 'react-icons';
import { ReactText } from 'react';

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
}
const DashboardNavItem = ({ icon, children, ...rest }: NavItemProps) => {
    return (
      <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
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
  