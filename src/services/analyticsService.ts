import HttpService from '@/services/httpService';
import { AnalyticsDataType } from '@/types/analyticsDataType';

export const AllUserAnalytics = (payload: string) => {
    const http = new HttpService();

    // const url = `analytics?league=${payload.league}&season=${payload.season}`;
    const url = `analytics?user_id=${payload}`;

    return http.getData(url, true);
};

export const VideoAnalyticsDetails = (payload: string) => {
    const http = new HttpService();

    // const url = `analytics?league=${payload.league}&season=${payload.season}`;
    const url = `analytics/${payload}`;

    return http.getData(url, true);
};
