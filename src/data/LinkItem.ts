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
  link: string
}

export const LinkItems: Array<LinkItemProps> = [
{ name: 'Dashboard', icon: FaHome, link: "/dashboard" },
{ name: 'Analytics', icon: FaChartPie, link: "/dashboard"  },
{ name: 'Messages', icon: FaCommentDots, link: "/dashboard"  },
{ name: 'Recruitment', icon: FaUserAlt, link: "/dashboard"  },
{ name: 'Club Management', icon: FaUserTie, link: "/dashboard/club-management"  },
{ name: 'Logout', icon: FaSignOutAlt, link: "/login"  },
];