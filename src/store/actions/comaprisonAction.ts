import {
    GetPlayersStatistics,
    FilterPlayersStatistics,
    GetPlayerVideos,
    GetPlayerVideosStats
} from '@/services/playerStatisticsService';

import * as Redux from 'redux';
import * as actionTypes from './actionTypes';
import { updateIsLoading } from './msgAction';

type Dispatch = Redux.Dispatch<any>;

export const fetchPlayerStatistics = (playersIDs: string[], clubId: any) => {
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
export const filterPlayersStatisticsByMatch = (noOfMarch: number, playerIds: any, clubId: any) => {
    return async (dispatch: Dispatch) => {
        console.log(noOfMarch);
        console.log(playerIds);
        console.log(clubId);
        const club_Id = '6bc674e9-5417-4d4c-9152-f2091e78ca22';
        const playersIds = [
            'af9c5cbf-a70d-44b2-8cb0-1858ff45b352',
            '7624726d-c80b-414f-9090-13c337913015'
        ];
        const noMarch = noOfMarch;
        console.log(`'I'm here`);

        FilterPlayersStatistics(club_Id, playersIds, noMarch)
            .then(async (result) => {
                const { data } = result;
                console.log('fetchTeams filter', data);

                dispatch(updateIsLoading(false));
            })

            .catch((err) => {
                console.log('fetch teams error', err);
                dispatch(updateIsLoading(false));
            });
    };
};
export const getPlayerVideos = (playerId: string) => {
    return async (dispatch: Dispatch) => {
        GetPlayerVideos(playerId)
            .then((result) => {
                console.log('player details are', result);
                console.log('player videos are', result?.data.data.player.videos);

                dispatch(savePlayerVideos(result?.data.data.player.videos));
            })
            .catch((err) => {
                console.log('get player videos error', err);
            });
    };
};
export const getPlayerVideosStats = (videoIds: any, playerId: string, clubId: string) => {
    return async (dispatch: Dispatch) => {
        const video_Ids = videoIds;

        const player_Id = playerId;
        const club_Id = clubId;

        dispatch(updateIsLoading(true));

        GetPlayerVideosStats(video_Ids, player_Id, club_Id)
            .then(async (result) => {
                const { data } = result;
                console.log('stats result is', data);

                dispatch(savePlayerVideosStats(data));

                dispatch(updateIsLoading(false));
            })

            .catch((err) => {
                console.log('fetch stats error', err);
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
export const savePlayerVideos = (data: any) => {
    return {
        type: actionTypes.GET_PLAYER_VIDEOS,
        payload: data
    };
};
export const savePlayerVideosStats = (data: any) => {
    return {
        type: actionTypes.GET_PLAYER_VIDEOS_STATISTICS,
        payload: data
    };
};
