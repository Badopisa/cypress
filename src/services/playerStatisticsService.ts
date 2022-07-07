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
export const GetPlayerVideos = (id: string) => {
    const http = new HttpService();

    const url = `players/${id}`;

    return http.getData(url, true);
};
export const GetPlayerVideosStats = (videoIds: any, playerId: string, club_Id: string) => {
    const http = new HttpService();
    console.log('serviceVideoid', videoIds);
    console.log('serviceclubid', club_Id);

    console.log('servicePlsyerid', playerId);

    const url = `analytics/player-stats-in-multiple-matches?club_id=${club_Id}`;

    return http.postData({ video_ids: [videoIds], player_id: playerId }, url, true);
};
