import {
    FaUserAlt,
    FaUserTie,
    FaHome,
    FaChartPie,
    FaCommentDots,
    FaSignOutAlt
} from 'react-icons/fa';
import { IconType } from 'react-icons';

type LinkItemProps = {
    name: string;
    icon: IconType;
    link: string;
};

export const LinkItems: Array<LinkItemProps> = [
    { name: 'Dashboard', icon: FaHome, link: '/dashboard' },
    { name: 'Analytics', icon: FaChartPie, link: '/dashboard/analytics' },
    { name: 'Messages', icon: FaCommentDots, link: '/dashboard/messaging' },
    { name: 'Profile', icon: FaUserAlt, link: '/dashboard/profile' },
    { name: 'Club Management', icon: FaUserTie, link: '/dashboard/club-management' },
    { name: 'Settings', icon: FaUserTie, link: '/dashboard/settings' },
    { name: 'Logout', icon: FaSignOutAlt, link: '/login' }
];
