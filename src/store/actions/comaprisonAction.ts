import { GetPlayersStatistics, FilterPlayersStatistics } from '@/services/playerStatisticsService';
import { TeamDataType, TeamFormType } from '@/types/TeamDataType';
import * as Redux from 'redux';
import * as actionTypes from "./actionTypes"
import { updateAlertMsg, updateIsLoading } from './msgAction';
import { GetStaffForAClub } from "@/services/staffManagementService";
import { GetPlayersForClub } from "@/services/playerManagementService";


type Dispatch = Redux.Dispatch<any>;

export const fetchPlayerStatistics = (playersIDs: string[], clubId: string) => {

    return async (dispatch: Dispatch) => {

        // console.log('playerID arre', [playersIDs])
        // const club_Id = clubId;
        const club_Id = '6bc674e9-5417-4d4c-9152-f2091e78ca22';
        const playersIds = ["af9c5cbf-a70d-44b2-8cb0-1858ff45b352", "7624726d-c80b-414f-9090-13c337913015"];
        // const playersIds = playersIDs;
        dispatch(updateIsLoading(true))

        GetPlayersStatistics(club_Id, playersIds)


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
export const filterPlayersStatisticsByMatch = (playerIds: any, clubId: string, noOfMarch: number) => {
    return async (dispatch: Dispatch) => {

        const club_Id = '6bc674e9-5417-4d4c-9152-f2091e78ca22';
        const playersIds = ["af9c5cbf-a70d-44b2-8cb0-1858ff45b352", "7624726d-c80b-414f-9090-13c337913015"];
        const noMarch = noOfMarch;
        console.log(`'I'm here`)

        FilterPlayersStatistics(club_Id, playersIds, noMarch)
            .then(async (result) => {

                const { data } = result
                console.log('fetchTeamsReee', data)

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
