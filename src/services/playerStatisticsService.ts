import HttpService from '@/services/httpService'
import { PlayerToTeamType, TeamFormType } from '@/types/TeamDataType';
import { StaffToTeamType } from "@/types/StaffDataType";



export const GetPlayersStatistics = (club_Id: any, playersIds: any) => {
    console.log('paayloaddddd', club_Id);
    // console.log('paloadd', payload.playersIDs);
    // const { playersIDs, clubId } = payload;
    console.log('welcome')
    console.log('playerss......', playersIds)
    const http = new HttpService();

    const url = `analytics/multiple-players-stats?club_id=${club_Id}`;

    return http.postData({ player_ids: playersIds }, url, true)

}
export const FilterPlayersStatistics = (club_Id: any, playersIds: any, noMatch: number) => {
    console.log('club id is', club_Id);
    console.log('players is', playersIds);
    console.log('payload is', noMatch);


    // const [clubId, noOfMarch] = payload;

    const http = new HttpService();

    const url = `analytics/multiple-players-stats?filterBy=${noMatch}&club_id=${club_Id}`;

    return http.postData({ player_ids: playersIds }, url, true)

}



