import * as types from '@/store/actions/actionTypes';

type TeamReducerData = {
    playersStatistics: any;
    filteredMatch: any;
    playerVideos: any;
};
const initialState: TeamReducerData = {
    playersStatistics: [],
    filteredMatch: [],
    playerVideos: []
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
                playerVideos: action.payload.data
            };
        default:
            return state;
    }
};
