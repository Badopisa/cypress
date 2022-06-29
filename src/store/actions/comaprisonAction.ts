import { GetPlayersStatistics, FilterPlayersStatistics } from '@/services/playerStatisticsService';
import { TeamDataType, TeamFormType } from '@/types/TeamDataType';
import * as Redux from 'redux';
import * as actionTypes from "./actionTypes"
import { updateAlertMsg, updateIsLoading } from './msgAction';
import { GetStaffForAClub } from "@/services/staffManagementService";
import { GetPlayersForClub } from "@/services/playerManagementService";


type Dispatch = Redux.Dispatch<any>;

export const fetchPlayerStatistics = (playersIDs: string[]) => {

    return async (dispatch: Dispatch) => {
        // const payload: any = { player_ids: playersIDs }
        const payload: any = { "player_ids": ["af9c5cbf-a70d-44b2-8cb0-1858ff45b352", "7624726d-c80b-414f-9090-13c337913015"] }
        dispatch(updateIsLoading(true))
        console.log('playerID arre', playersIDs)

        GetPlayersStatistics(payload)


            .then(async (result) => {

                const { data } = result
                console.log('fetchTeams', data)


                dispatch(savePlayerStats(data.data))

                dispatch(updateIsLoading(false))

            })

            .catch((err) => {

                console.log('fetch teams error', err)
                dispatch(updateIsLoading(false))

            });

    };

}
export const filterPlayersStatisticsByMatch = (clubId: any, noOfMarch: number) => {
    return async (dispatch: Dispatch) => {
        const payload = [clubId, noOfMarch]

        FilterPlayersStatistics(payload)
            .then(async (result) => {

                const { data } = result
                console.log('fetchTeams', data)

                dispatch(updateIsLoading(false))

            })

            .catch((err) => {

                console.log('fetch teams error', err)
                dispatch(updateIsLoading(false))

            });
    }
}

const savePlayerStats = (data: any) => {

    return {

        type: actionTypes.GET_PLAYERS_STATISTICS,

        payload: data

    }
}




export const saveAllPlayers = (data: any) => {
    return {
        type: actionTypes.GET_ALL_PLAYERS,
        payload: data
    }
}



const filterTeamData = (data: string) => {
    return {
        type: actionTypes.FILTER_TEAM_DETAILS,
        payload: data
    }
}

const filterPlayersData = (data: string) => {
    return {
        type: actionTypes.FILTER_PLAYERS,
        payload: data
    }
}

const filterStaffsData = (data: string) => {
    return {
        type: actionTypes.FILTER_STAFFS,
        payload: data
    }
}

const saveNewTeamData = (data: TeamDataType) => {
    return {
        type: actionTypes.SAVE_NEW_TEAM,
        payload: data
    }
}

export function setCurrentTeam(data: any): any {
    return {
        type: actionTypes.SET_CURRENT_TEAM,
        payload: data
    }
}
