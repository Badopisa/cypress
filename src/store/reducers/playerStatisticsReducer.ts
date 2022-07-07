import * as types from '@/store/actions/actionTypes';

type TeamReducerData = {
    playersStatistics: any;
    filteredMatch: any;
    playerVideos: any;
    playerVideosStatistics: any;
};
const initialState: TeamReducerData = {
    playersStatistics: [],
    filteredMatch: [],
    playerVideos: [],
    playerVideosStatistics: []
};

type IAction = {
    type: string;
    payload?: any;
};

export const playerStatisticReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case types.GET_PLAYERS_STATISTICS:
            console.log('action pay', action.payload);
            return {
                ...state,
                playersStatistics: action.payload
            };
        case types.FILTER_PLAYERS_STATISTICS_BY_MATCH:
            console.log('action pay', action.payload);
            return {
                ...state,
                filteredMatch: action.payload
            };
        case types.GET_PLAYER_VIDEOS:
            console.log('savePlayerVideAct', action.payload);
            return {
                ...state,
                playerVideos: action.payload
            };
        case types.GET_PLAYER_VIDEOS_STATISTICS:
            console.log('player videos statistics are', action.payload);
            return {
                ...state,
                playerVideosStatistics: action.payload
            };
        default:
            return state;
    }
};
