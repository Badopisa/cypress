import HttpService from '@/services/httpService';
import { AnalyticsDataType } from '@/types/analyticsDataType';

export const AllUserAnalytics = (payload: AnalyticsDataType) => {
    const http = new HttpService();

    // const url = `analytics?league=${payload.league}&season=${payload.season}`;
    const url = `analytics`;

    return http.getData(url, true);
};
