import HttpService from '@/services/httpService';
import { PlayerToTeamType, TeamFormType } from '@/types/TeamDataType';
import { StaffToTeamType } from '@/types/StaffDataType';

export const FetchTeamDetails = (clubId: string) => {
    const http = new HttpService();

    const url = `teams?club_id=${clubId}`;

    return http.getData(url, true);
};

export const CreateTeam = (payload: TeamFormType) => {
    const http = new HttpService();

    const url = `teams`;

    return http.postData(payload, url, true);
};

export const GetTeamDetails = (teamId: string) => {
    const http = new HttpService();

    const url = `teams/${teamId}`;

    return http.getData(url, true);
};

export const AddPlayersToTeam = (payload: PlayerToTeamType) => {
    const http = new HttpService();

    const url = `teams/players/add`;

    return http.postData(payload, url, true);
};

export const RemovePlayerFromTeam = (payload: PlayerToTeamType) => {
    const http = new HttpService();

    const url = `teams/players/remove`;

    return http.postData(payload, url, true);
};

export const RemoveStaffFromTeam = (payload: StaffToTeamType) => {
    const http = new HttpService();

    const url = `teams/staff/remove`;

    return http.postData(payload, url, true);
};

export const AddStaffToTeam = (payload: StaffToTeamType) => {
    const http = new HttpService();

    const url = `teams/staff/add`;

    return http.postData(payload, url, true);
};
