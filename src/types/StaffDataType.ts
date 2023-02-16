export type StaffFormType = {
    photo?: string | File | null;
    id?: string;
    first_name?: string;
    last_name?: string;
    role?: string;
    country?: string;
    club_id?: string;
    email?: string;
    password?: string;
    device_token?: string;
};

export type StaffToTeamType = {
    staff: Array<{
        staff_id: string;
        team_id: string;
        role: string;
    }>;
};
