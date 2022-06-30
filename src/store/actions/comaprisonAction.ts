import { GetPlayersStatistics, FilterPlayersStatistics } from '@/services/playerStatisticsService';

import * as Redux from 'redux';
import * as actionTypes from './actionTypes';
import { updateIsLoading } from './msgAction';

type Dispatch = Redux.Dispatch<any>;

export const fetchPlayerStatistics = (
    playersIDs: string[] = [
        'af9c5cbf-a70d-44b2-8cb0-1858ff45b352',
        '7624726d-c80b-414f-9090-13c337913015'
    ],
    clubId = '6bc674e9-5417-4d4c-9152-f2091e78ca22'
) => {
    return async (dispatch: Dispatch) => {
        const club_Id = clubId;
        const playersIds = playersIDs;

        dispatch(updateIsLoading(true));

        GetPlayersStatistics(club_Id, playersIds)
            .then(async (result) => {
                const { data } = result;
                console.log('fetchTeams', data);

                dispatch(savePlayerStats(data.data));

                dispatch(updateIsLoading(false));
            })

            .catch((err) => {
                console.log('fetch teams error', err);
                dispatch(updateIsLoading(false));
            });
    };
};
export const filterPlayersStatisticsByMatch = (
    noOfMarch: number,
    playerIds: any = [
        'af9c5cbf-a70d-44b2-8cb0-1858ff45b352',
        '7624726d-c80b-414f-9090-13c337913015'
    ],
    clubId = '6bc674e9-5417-4d4c-9152-f2091e78ca22'
) => {
    return async (dispatch: Dispatch) => {
        const club_Id = clubId;
        const playersIds = playerIds;
        const noMarch = noOfMarch;
        console.log(`'I'm here`);

        FilterPlayersStatistics(club_Id, playersIds, noMarch)
            .then(async (result) => {
                const { data } = result;
                console.log('fetchTeams', data);

                dispatch(updateIsLoading(false));
            })

            .catch((err) => {
                console.log('fetch teams error', err);
                dispatch(updateIsLoading(false));
            });
    };
};

const savePlayerStats = (data: any) => {
    return {
        type: actionTypes.GET_PLAYERS_STATISTICS,

        payload: data
    };
};
