import { IconType } from 'react-icons';
import DashboardIcon from '@/assets/dashboardIcon';
import VideoAnalyticsIcon from '@/assets/videoAnalyticsIcon';
import ClubManagementIcon from '@/assets/clubManagementIcon';
import ProfileIcon from '@/assets/profileIcon';
import SettingsIcon from '@/assets/settingsIcon';
import LogoutIcon from '@/assets/logoutIcon';
import ComparisonIcon from '@/assets/comparisonIcon';

type LinkItemProps = {
    name: string;
    icon: IconType;
    link: string;
};

// export const LinkItems1: Array<LinkItemProps> = [
//     { name: 'Dashboard', icon: DashboardIcon, link: '/dashboard' },
//     { name: 'Club management', icon: ClubManagementIcon, link: '/dashboard/club-management' },
//     { name: 'Video analytics', icon: VideoAnalyticsIcon, link: '/dashboard/analytics' },
//     { name: 'Comparison', icon: ComparisonIcon, link: '/dashboard/analytics' }
//     // { name: 'Messages', icon: FaCommentDots, link: '/dashboard/messaging' },
// ];

export const LinkItems2: Array<LinkItemProps> = [
    // { name: 'Profile', icon: ProfileIcon, link: '/dashboard/profile' },
    // { name: 'Settings', icon: SettingsIcon, link: '/dashboard/settings' },
    { name: 'Logout', icon: LogoutIcon, link: '/login' }
];

export const LinkItems1 = (user: any) => {
    if (user.role === 'player') {
        return [
            { name: 'Dashboard', icon: DashboardIcon, link: '/dashboard' },
            { name: 'Video analytics', icon: VideoAnalyticsIcon, link: '/dashboard/analytics' }
            // { name: 'Comparison', icon: ComparisonIcon, link: '/dashboard/analytics' }
            // { name: 'Messages', icon: FaCommentDots, link: '/dashboard/messaging' },
        ];
    }

    return [
        { name: 'Dashboard', icon: DashboardIcon, link: '/dashboard' },
        { name: 'Club management', icon: ClubManagementIcon, link: '/dashboard/club-management' },
        { name: 'Video analytics', icon: VideoAnalyticsIcon, link: '/dashboard/analytics' }
        // { name: 'Comparison', icon: ComparisonIcon, link: '/dashboard/analytics' }
        // { name: 'Messages', icon: FaCommentDots, link: '/dashboard/messaging' },
    ];
};
