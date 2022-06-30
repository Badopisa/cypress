import * as types from '@/store/actions/actionTypes'
import { TeamDataType } from '@/types/TeamDataType'

type TeamReducerData = {
    playersStatistics: any,
    filteredMatch: any,
}
const initialState: TeamReducerData = {
    playersStatistics: [],
    filteredMatch: [],
    // filter
}

type IAction = {
    type: string;
    payload?: any;
}

export const playerStatisticReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case types.GET_PLAYERS_STATISTICS:
            console.log('action pay', action.payload)
            return {
                ...state,
                playersStatistics: action.payload,
            }
        case types.FILTER_PLAYERS_STATISTICS_BY_MATCH:
            console.log('action pay', action.payload)
            return {
                ...state,
                filteredMatch: action.payload,
            }
        default:
            return state
    }
}
