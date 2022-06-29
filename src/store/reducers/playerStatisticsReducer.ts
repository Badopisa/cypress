import * as types from '@/store/actions/actionTypes'
import { TeamDataType } from '@/types/TeamDataType'

type TeamReducerData = {
    playersStatistics: any,
}
const initialState: TeamReducerData = {
    playersStatistics: [],
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
        default:
            return state
    }
}
