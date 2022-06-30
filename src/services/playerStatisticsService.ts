import HttpService from '@/services/httpService';

export const GetPlayersStatistics = (club_Id: any, playersIds: any) => {

    const http = new HttpService();

    const url = `analytics/multiple-players-stats?club_id=${club_Id}`;

    return http.postData({ player_ids: playersIds }, url, true);
};
export const FilterPlayersStatistics = (club_Id: any, playersIds: any, noMatch: number) => {



    const http = new HttpService();

    const url = `analytics/multiple-players-stats?filterBy=${noMatch}&club_id=${club_Id}`;

    return http.postData({ player_ids: playersIds }, url, true);
};
