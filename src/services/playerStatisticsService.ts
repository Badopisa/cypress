import HttpService from '@/services/httpService'
import { PlayerToTeamType, TeamFormType } from '@/types/TeamDataType';
import { StaffToTeamType } from "@/types/StaffDataType";



export const GetPlayersStatistics = (payload: string[]) => {

    const http = new HttpService();

    const url = `analytics/multiple-players-stats`;

    return http.postData(payload, url, true)

}
export const FilterPlayersStatistics = (payload: string[]) => {

    const http = new HttpService();

    const url = `analytics/multiple-players-stats?filterBy=${payload}`;

    return http.postData(payload, url, true)

}


