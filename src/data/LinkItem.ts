import {
    FaUserAlt,
    FaUserTie,
    FaHome,
    FaChartPie,
    FaCommentDots,
    FaSignOutAlt
} from 'react-icons/fa';
import { IconType } from 'react-icons';
import DashboardIcon from "@/assets/dashboardIcon";
import VideoAnalyticsIcon from "@/assets/videoAnalyticsIcon";
import ClubManagementIcon from "@/assets/clubManagementIcon";
import ProfileIcon from "@/assets/profileIcon";
import SettingsIcon from '@/assets/settingsIcon';
import LogoutIcon from "@/assets/logoutIcon";
import ComparisonIcon from "@/assets/comparisonIcon";
import {UserDataType} from "@/types/AuthDataType";
import {RootStateOrAny, useSelector} from "react-redux";

type LinkItemProps = {
    name: string;
    icon: IconType;
    link: string;
};
// const { user }: { user: UserDataType } = useSelector((state: RootStateOrAny) => state.auth);

export const LinkItems1: Array<LinkItemProps> = [
    { name: 'Dashboard', icon: DashboardIcon, link: '/dashboard' },
    { name: 'Club management', icon: ClubManagementIcon, link: '/dashboard/club-management' },
    { name: 'Video analytics', icon: VideoAnalyticsIcon, link: '/dashboard/analytics' },
    { name: 'Comparison', icon: ComparisonIcon, link: '/dashboard/analytics' }
    // { name: 'Messages', icon: FaCommentDots, link: '/dashboard/messaging' },
];

export const LinkItems2: Array<LinkItemProps> = [
    { name: 'Profile', icon: ProfileIcon, link: '/dashboard' },
    { name: 'Settings', icon: SettingsIcon, link: '/dashboard/settings' },
    { name: 'Logout', icon: LogoutIcon, link: '/login' }
];
