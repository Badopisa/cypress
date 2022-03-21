import {
    FaUserAlt,
    FaUserTie,
    FaHome,
    FaChartPie,
    FaCommentDots,
    FaSignOutAlt
  } from 'react-icons/fa';
  import { IconType } from 'react-icons';

type LinkItemProps  = {
    name: string;
    icon: IconType;
}

export const LinkItems: Array<LinkItemProps> = [
{ name: 'Dashboard', icon: FaHome },
{ name: 'Analytics', icon: FaChartPie },
{ name: 'Messages', icon: FaCommentDots },
{ name: 'Recruitment', icon: FaUserAlt },
{ name: 'Club Management', icon: FaUserTie },
{ name: 'Logout', icon: FaSignOutAlt },
];