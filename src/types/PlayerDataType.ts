export type PlayerFormType = {
    photo?: string;
    id?: string;
    first_name?: string;
    last_name?: string;
    position?: string;
    jersey_no?: string;
    club_id?: string;
    email?: string;
    team_name?: string;
};
// export type PlayerToTeamType = {
//     player_id: string,
//     team_id: string
// }

export type PlayerCSV = {
    club_id: string;
    user_type: string;
    url: string;
};
