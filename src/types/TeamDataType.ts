export type TeamDataType = {
    photo: string;
    id: string;
    name?: string;
    team_name: string;
    category_id: string;
    location: string | null;
    country: string | null;
    club_id: string;
    players?: any;
    staff?: any;
};

export type TeamFormType = {
    photo: string;
    team_name: string;
    club_id: string;
    category_id: string;
    location: string;
};

export type PlayerToTeamType = {
    players: Array<{
        player_id: string;
        team_id: string;
    }>;
};
