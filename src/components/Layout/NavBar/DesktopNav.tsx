import React, { useEffect, useState } from 'react'
import { Button, HStack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { NAV_ITEMS } from '@/data/NavItemData'
import Link from '@/components/Elements/Link/Link'

const DesktopNav = () => {
  const router = useRouter()
  const [visibleMenu, setVisibleMenu] = useState<number | null>(null)

  return (
    <HStack spacing={10} onMouseLeave={() => setVisibleMenu(null)}>
      {NAV_ITEMS.map(navItem => (
        <Link href={navItem.href}>
          {
            navItem.isButton? 
            <Button variant="outline">
              {navItem.label}
            </Button>
            : 
            <Text color="white" variant="linkText"> {navItem.label} </Text>
          }
        </Link>
      ))}
    </HStack>
  )
}

export default DesktopNav
