
type NavItem = {
  id: number,
  label: string,
  href: string,
  isButton?: boolean
}
export const NAV_ITEMS: NavItem[] = [
  {
    id: 1,
    label: 'HOME',
    href: '/',
  },
  {
    id: 2,
    label: 'ABOUT',
    href: '/about-us',
  },
  {
    id: 3,
    label: 'BlOG',
    href: '/blog',
  },
  {
    id: 4,
    label: 'CONTACT US',
    href: '/contact',
  },
  {
    id: 5,
    label: 'LOGIN',
    href: '/login',
    isButton: true
  },
  {
    id: 6,
    label: 'ENG',
    href: '#',
  },
]
