import {PlayerFormType} from "@/types/PlayerDataType";
import {PlayerToTeamType} from "@/types/TeamDataType";

export type PlayerReducerData = {
    newPlayer: PlayerFormType | null,
    addedPlayerToTeamInfo: PlayerToTeamType[] | []
}
