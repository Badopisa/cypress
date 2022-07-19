import { PlayerFormType } from '@/types/PlayerDataType';
import { PlayerToTeamType } from '@/types/TeamDataType';
import { StaffFormType, StaffToTeamType } from '@/types/StaffDataType';

export type PlayerReducerData = {
    newPlayer: PlayerFormType | null;
    addedPlayerToTeamInfo: PlayerToTeamType[] | [];
    selectedPlayers: any;
};

export type StaffReducerData = {
    newStaff: StaffFormType | null;
    addedStaffsToTeamInfo: StaffToTeamType[] | [];
    selectedStaffs: any;
    allStaffs: any;
};
