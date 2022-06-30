import React, { useEffect, useState } from 'react';
import { Button, HStack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { NAV_ITEMS } from '@/data/NavItemData';
import Link from '@/components/Elements/Link/Link';

const DesktopNav = () => {
    return (
        <HStack spacing={10}>
            {NAV_ITEMS.map((navItem, index) => (
                <Link key={index} href={navItem.href}>
                    {navItem.isButton ? (
                        <Button variant="outline">{navItem.label}</Button>
                    ) : (
                        <Text color="white" variant="linkText">
                            {' '}
                            {navItem.label}{' '}
                        </Text>
                    )}
                </Link>
            ))}
        </HStack>
    );
};

export default DesktopNav;
